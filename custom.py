# this file imports custom routes into the experiment server
from __future__ import generator_stop
from flask import Blueprint, render_template, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from functools import wraps
from sqlalchemy import or_

from psiturk.psiturk_config import PsiturkConfig
from psiturk.experiment_errors import ExperimentError, InvalidUsageError
from psiturk.user_utils import PsiTurkAuthorization, nocache

# # Database setup
from psiturk.db import db_session, init_db
from psiturk.models import Participant
from json import dumps, loads

# load the configuration options
config = PsiturkConfig()
config.load_config()
# if you want to add a password protect route, uncomment and use this
#myauth = PsiTurkAuthorization(config)

# explore the Blueprint
custom_code = Blueprint('custom_code', __name__,
                        template_folder='templates', static_folder='static')

from task import task_bp

def init_app(app):
    app.register_blueprint(task_bp)
