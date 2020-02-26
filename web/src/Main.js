import React, { useState, useEffect } from 'react';
import api from './services/api'
import './Main.css'


const Main = () => {

    const [bovespa, setBovespa] = useState({});
  const [stockTableRows, setStockTableRows] = useState([{
    stockSymbol: "",
    current: "",
    highest: "",
    lowest: ""
  }]);

  useEffect(() => {
    async function loadBovespa() {
      const response = await api.get("/stocks/mainStock")
      setBovespa(response.data)
    }

    loadBovespa();
  }, [])

  
  async function handleGetStock(e,idx) {
    e.preventDefault();
    
    const stocks = [...stockTableRows];

    const response = await api.get(`/stocks/stock?symbol=${stocks[idx].stockSymbol}`)
    console.log(response.data)
    stocks[idx] = response.data;
    setStockTableRows(stocks)

  }

  const handleAddRow = () => {
    const item = {
      stockSymbol: "",
      current: "",
      high: "",
      low: ""
    };
    setStockTableRows([...stockTableRows, item]);
  }

  const handleChange = (e,idx) =>{

    const {value} = e.target;
    const rows = [...stockTableRows];

    rows[idx].stockSymbol = value
    setStockTableRows(rows)
  }

  return (
    <div className="App">
      <div className="mainStock">
        <div className="mainStockTitle">
          <h1>IBOVESPA</h1>
        </div>
          <div className="mainStockContent">
            <div className="card-wrapper">
              <p>CURRENT</p>
              <div className="card">
                <div className="type current">
                  <p>C</p>
                </div>
                <div className="content">
                {bovespa.current}
                </div>
              </div>
            </div>
            <div className="card-wrapper">
              <p>HIGH</p>
              <div className="card">
                <div className="type high">
                  <p>H</p>
                </div>
                <div className="content">
                  {bovespa.high}
                </div>
              </div>
            </div>
            <div className="card-wrapper">
              <p>LOW</p>
              <div className="card">
                <div className="type low">
                  <p>L</p>
                </div>
                <div className="content">
                  {bovespa.low}
                </div>
              </div>
            </div>
        </div>
      </div>

      <div className="stocksTable">
        <h1>STOCK SEARCH</h1>
        <table>
          <thead>
            <tr>
              <th id="stockColumn">Stock Name</th>
              <th>Current Quote</th>
              <th>Highest Quote</th>
              <th>Lowest Quote</th>
            </tr>
          </thead>
          <tbody>
              {stockTableRows.map((item, idx) => (
              <tr key={idx}>
                <td id="stockColumn"> 
                  <form id="stockColumn" onSubmit={e => handleGetStock(e,idx)}>
                    <input 
                      id="stockColumn"
                      type="text" 
                      className="stockSymbolInput"
                      name="stockSymbol"
                      value={item.stockSymbol}
                      onChange={(e) => handleChange(e,idx)}
                      autoComplete="off"
                      required
                    /> 
                    <button className="stockButton" type="submit">></button>
                  </form>  
                </td>
                <td>{item.current}</td>
                <td>{item.high}</td>
                <td>{item.low}</td>
              </tr>
              ))}
            </tbody>
        </table>
        <button className="addRow" onClick={handleAddRow}>Add Row</button>
        <p className="tip">* For Brazilian stocks, append <b>".SA"</b> at the end of the stock's symbol name (e.g VALE3.SA)</p>
      </div>

    </div>
    
  );
}

export default Main;