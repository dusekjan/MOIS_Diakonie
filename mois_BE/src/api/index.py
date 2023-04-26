from flask import Blueprint, render_template, current_app, request
from src.api.auth import admin_login_required
import requests
from src.http_response import json_response

bp = Blueprint('index', __name__)


@bp.route('/', defaults={"path": ""})
@bp.route('/<path:path>')
def serve_index_page(path):
    return render_template("index.html")


@bp.route('/projects/', methods=["GET"])
@admin_login_required
def get_projects():
    headers = {"Content-type": "application/json"}
    response = requests.get("https://postav-skolu.herokuapp.com/api/projects", headers=headers)
    print("Projekty: ", response.json(), flush=True)

    if response.status_code == 200:
        return json_response("ok", data=response.json())
    else:
        return json_response("bad_request")


@bp.route('/project/<string:project_id>/', methods=["GET"])
@admin_login_required
def get_project(project_id):
    result = {}


    headers = {"Content-type": "application/json"}
    project = requests.get(f"https://postav-skolu.herokuapp.com/api/projects/{project_id}", headers=headers)

    if project.status_code == 200:
        result["project"] = project.json()
    else:
        return json_response("bad_request")

    donatables = requests.get(f"https://postav-skolu.herokuapp.com/api/donatables-by-project-id/{project_id}", headers=headers)

    if donatables.status_code == 200:
        result["donatables"] = donatables.json()
    else:
        return json_response("bad_request")

    donations = requests.get(f"https://postav-skolu.herokuapp.com/api/donations", headers=headers)
    if donations.status_code == 200:
        donations_json = donations.json()
        project_donations = list()
        for donation in donations_json:
            if donation["donatableId"] and donation["donatableId"].get("projectId") == project_id:
                donation["createdAt"] = donation["createdAt"].split("T")[0]
                project_donations.append(donation)

        result["biggest_donations"] = sorted(project_donations, key=lambda d: d['price'], reverse=True)[:3]
    else:
        return json_response("bad_request")

    print(result, flush=True)
    return json_response("ok", data=result)


@bp.route('/donations-api/', methods=["GET"])
@admin_login_required
def get_donations():
    result = {}

    headers = {"Content-type": "application/json"}
    donations = requests.get(f"https://postav-skolu.herokuapp.com/api/donations", headers=headers)
    if donations.status_code == 200:
        all_project_donations = list()
        for donation in donations.json():
            if donation["donatableId"]:
                donation["createdAt"] = donation["createdAt"].split("T")[0]
                all_project_donations.append(donation)

        result["biggest_donations"] = sorted(all_project_donations, key=lambda d: d['price'], reverse=True)[:5]
        result["donations"] = all_project_donations
    else:
        return json_response("bad_request")

    print(result, flush=True)
    return json_response("ok", data=result)

"""
Simple requests, meanwhile, like a POST request from a browser-based form submission, 
don't trigger a preflight request, so the CORS policy doesn't matter.

So, if you do have a JSON API, limiting the allowed origins or eliminating CORS altogether 
is a great way to prevent unwanted requests. You don't need to use CSRF tokens in that situation. 
If you have a more open CORS policy with regard to origins, it's a good idea to use CSRF tokens.
"""
@bp.after_app_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
