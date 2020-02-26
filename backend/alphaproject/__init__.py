from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    from . import db
    db.init_app(app)

    from . import stocks
    app.register_blueprint(stocks.bp)
    
    from . import auth
    app.register_blueprint(auth.bp)

    return app