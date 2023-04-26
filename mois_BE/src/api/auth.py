import functools
from src.http_response import json_response
import requests
import re
from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for

bp = Blueprint('auth', __name__, url_prefix='/auth')

pattern = r"\S+@\S+\.\S+"

@bp.before_app_request
def load_logged_in_user():
    if request.method == "POST" and request.content_type != "application/json":
        return json_response("forbidden")

    session.permanent = True

    user_role = session.get("role")
    print("BEFORE_REQUEST ROLE FOUND: ", user_role, flush=True)

    g.role = user_role


def admin_login_required(endpoint):
    @functools.wraps(endpoint)
    def wrapped_view(**kwargs):
        print("ADMIN_LOGIN_REQUIRED_CHECK", g.role)
        if g.role is None or g.role != "admin":
            return json_response("unauthorized", message="Přístupné pouze adminům")
        return endpoint(**kwargs)

    return wrapped_view


@bp.route('/login', methods=['POST'])
def login_user():
    email = str(request.json['email']).strip()
    password = str(request.json['password']).strip()

    if not re.match(pattern, email):
        return json_response("forbidden")

    response = requests.post("https://postav-skolu.herokuapp.com/api/auth/login",
                  json={
                      "email": email,
                      "password": password
                      # "email": "gortozcze@gmail.com",
                      # "password": "123456"
                  })
    print(response.status_code, flush=True)
    print(response.json(), flush=True)

    # pridat do session roli "admin"
    if response.status_code == 200 and response.json().get("role") == "admin":
        session.clear()
        session["role"] = "admin"
        return json_response("ok")
    else:
        return json_response("bad_request")


@bp.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return json_response("ok")


