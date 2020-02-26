python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
export FLASK_APP=alphaproject
export FLASK_ENV=development
flask run