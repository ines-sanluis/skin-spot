
setx -m FLASK_APP "./src/main.py"
pipenv shell
flask run -h 0.0.0.0
