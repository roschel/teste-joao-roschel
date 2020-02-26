import requests

class StockQuote:

    def __init__(self, symbol, apiKey):
        self.apiKey = apiKey
        self.symbol = symbol
        self.currentQuote = ""
        self.highestQuote = ""
        self.lowestQuote = ""
        self.getQuote()

    def updateQuotes(self, current,high,low):
        self.currentQuote = current
        self.highestQuote = high
        self.lowestQuote = low

    def getQuote(self):

        url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={}&apikey={}".format(self.symbol, self.apiKey)
        r = requests.get(url)
        current, high, low = self.parseQuotes(r)
        self.updateQuotes(current, high, low)
        
    def parseQuotes(self,r):
        res = dict(r.json())

        current = res['Global Quote']['05. price']
        high = res['Global Quote']['03. high']
        low = res['Global Quote']['04. low']

        return current, high, low

    def getQuotesDict(self):
        return {
            "stockSymbol":self.symbol,
            "current":self.currentQuote,
            "high":self.highestQuote,
            "low":self.lowestQuote
        }