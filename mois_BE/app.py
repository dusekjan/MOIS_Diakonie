import os
from flask import Flask, request
from secrets import token_hex


def create_app():
    app = Flask(__name__, static_folder="build", template_folder="build", instance_relative_config=True)

    app.config.from_mapping(
        #SECRET_KEY=token_hex(),
        SECRET_KEY="some_secret_for_dev"
    )

    app.config["SESSION_COOKIE_SECURE"] = True

    from src.api import auth, index
    app.register_blueprint(index.bp)
    app.register_blueprint(auth.bp)

    return app
