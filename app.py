from psiturk.experiment import app

app.config['DEBUG'] = True
app.config['ENV'] = 'development'

if __name__ == "__main__":
    app.run()
