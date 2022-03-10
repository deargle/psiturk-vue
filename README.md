# psiturk-vue

A Vue.js single-page application (SPA) as a psiturk task, with psiturk.js
reimplemented as a vuex store. Demo'ed using the psiturk-example stroop task.


## How it was made; key components

The psiturk experiment was generated using psiturk v3.3.0, `psiturk-setup-example` command.

Then, vue-cli was used to create a vue app called `task`:

```bash
vue create task
```

Then, file `task/__init__.py` was created with the following contents:

```python
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
```

And file `vue.config.js` was created also:

```javascript
const path = require("path");

module.exports = {
  outputDir: 'dist',
  // outputDir: path.resolve(__dirname, "templates"),
  publicPath: process.env.NODE_ENV === 'production'
    ? "/task"
    : "/",
  assetsDir: "static",
  devServer: {
    proxy: 'http://localhost:5000'
  }
}
```

File `custom.py` in the psiturk root dir was modified to import the task blueprint.
(`psiturk/experiment.py` checks for a function called `init_app` in `custom.py`, and if found,
it runs it, passing it `app`.)

```python
from task import task_bp

def init_app(app):
    app.register_blueprint(task_bp)
```


To develop the vue task:

```bash
cd task
yarn run serve
```

To develop using the whole psiturk flow:

```bash
cd task
yarn run build
popd
python app.py
```
