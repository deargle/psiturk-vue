from flask import Blueprint, render_template

task_bp = Blueprint('task', __name__,
    template_folder='dist',
    static_folder='dist/static',
    # static_url_path='/task/static', # Flask will be confused if you don't do this,
    url_prefix='/task/'
)

@task_bp.route('/', defaults={'path': ''})
@task_bp.route("/<string:path>")
@task_bp.route("/<path:path>")
def index(path):
    return render_template('index.html')
