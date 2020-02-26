import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import cross_origin
from alphaproject.db import get_db
import json

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=(['POST']))
@cross_origin(supports_credentials=True)
def register():

    user_register = request.get_json()

    error = None
    get_db()
    db = g.db
    cursor = db.cursor()

    cursor.execute(
        "SELECT user_id FROM alphaproject_prod.users WHERE username = '{}'".format(user_register['userName'])
    )

    response = cursor.fetchone()

    if response is not None:
        error = {'sucess':False,"description":"User already exists"}
        return json.dumps(error), 409
    else:
        registerUser(user_register)
        return json.dumps({'sucess':True}), 200
    return 'OK'


@bp.route('/login', methods=(['POST']))
def login():

    
    user_login = request.get_json()

    error = None

    get_db()

    db = g.db
    cursor = db.cursor()

    cursor.execute("select * from alphaproject_prod.users u where (username = '{}');".format(user_login['userName'])
    )

    user = json.dumps(cursor.fetchone())
    user = json.loads(user)

    if user is None:
        error = {'sucess':False,"description":"User doesn't exists"}
        return json.dumps(error), 409
    elif not check_password_hash(user['password'], user_login['password']):
        error = {'success':False,"description":"Wrong password"}
        return json.dumps(error), 409
    
    if error is None:
        session.clear()
        session['user_id'] = user['user_id']
        return json.dumps({'success':True}), 200

def registerUser(user_to_register):

    print("INSERTING USER")
    get_db()
    db = g.db

    cursor = db.cursor()

    cursor.execute(
        """insert into alphaproject_prod.users (username, first_name, last_name, email, password)
           values ('{}', '{}', '{}', '{}', '{}');""".format(user_to_register['userName'],
                                                            user_to_register['firstName'],
                                                            user_to_register['lastName'],
                                                            user_to_register['email'],
                                                            generate_password_hash(user_to_register['password'])
                                                            )
    )

    db.commit()

