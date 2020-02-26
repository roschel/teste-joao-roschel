import psycopg2
import psycopg2.extras
from flask import g, current_app

def init_db():
    get_db()

def get_db():
    if 'db' not in g:

        print("CONNETING TO DATABASE")
        conn_string = "host='localhost' dbname='alphaproject' user='postgres' password='db1234@'"
        g.db = psycopg2.connect(conn_string, cursor_factory=psycopg2.extras.RealDictCursor)

        return g.db

def close_db(e=None):


    db = g.pop('db', None)

    if db is not None:
        print("CLOSING DATABASE")
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
