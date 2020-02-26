from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import cross_origin
from .StockQuote import StockQuote
from alphaproject.db import get_db


bp = Blueprint('stocks', __name__, url_prefix='/stocks')


apikey = "YZ9KEK5TLUXK0KL6"

@bp.route('/mainStock')
@cross_origin(supports_credentials=True)
def mainStock():

    bvsp = StockQuote("^BVSP", apikey)
    data = bvsp.getQuotesDict()
    return data

@bp.route('/stock')
@cross_origin(supports_credentials=True)
def getStockSymbol():

    stockSymbol = request.args.get('symbol')
    stock = StockQuote(stockSymbol, apikey)
    data = stock.getQuotesDict()
    
    error = None
    get_db()
    
    db = g.db
    cursor = db.cursor()

    cursor.execute(
        """insert into alphaproject_prod.users_stocks(user_id, stocksymbol, "current", high, low)
            values ({}, '{}', '{}', '{}', '{}');""".format(session['user_id'],
                                                                    data['stockSymbol'],
                                                                    data['current'],
                                                                    data['high'],
                                                                    data['low']
                                                                    )
    )
    
    db.commit()


    return data