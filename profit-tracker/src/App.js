import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [state, setState] = useState({
    killCount: parseInt(localStorage.getItem('killCount')) || 0,
    deathCount: parseInt(localStorage.getItem('deathCount')) || 0,
    killAmount: parseFloat(localStorage.getItem('killAmount')) || 0,
    deathAmount: parseFloat(localStorage.getItem('deathAmount')) || 0,
    profit: localStorage.getItem('profit') || 0.00,
  })
  const updateProfit = (isDeath, amount) => {
    let denom = 1;
    let profitAmount = 0;
    let finalChar = '';
    let hasDenom = false;
    let finalDenom = 1;
    switch(state.profit[state.profit.length - 1]) {
      case 'm':
        denom = 1000000;
        hasDenom = true;
        break;
      case 'k':
        denom = 1000;
        hasDenom = true;
        break;
      default:
        break;
    }
    profitAmount = hasDenom ? parseFloat(state.profit.substr(0, state.profit.length - 1)) * denom : parseFloat(state.profit);
    if(Math.abs(parseFloat(profitAmount+amount)) >= 1000000) {
      finalChar = 'm';
      finalDenom = 1000000;
    } else if (Math.abs(parseFloat(profitAmount+amount)) >= 1000) {
      finalChar = 'k';
      finalDenom = 1000;
    }
    setState({
      ...state, 
      killCount: isDeath ? state.killCount : state.killCount + 1,
      deathCount: isDeath ? state.deathCount + 1 : state.deathCount,
      profit: isDeath ? parseFloat((profitAmount-amount)/finalDenom).toFixed(2) + finalChar : parseFloat((profitAmount+amount)/finalDenom).toFixed(2) + finalChar
    });
    localStorage.setItem('killCount', isDeath ? state.killCount : state.killCount + 1);
    localStorage.setItem('deathCount', isDeath ? state.deathCount + 1 : state.deathCount)
    localStorage.setItem('profit', isDeath ? parseFloat((profitAmount-amount)/finalDenom).toFixed(2) + finalChar : parseFloat((profitAmount+amount)/finalDenom).toFixed(2) + finalChar)
    localStorage.setItem('killAmount', state.killAmount);
    localStorage.setItem('deathAmount', state.deathAmount);
  }


  const updateKill = () => {
    let denom = 1;
    let amount = state.killAmount
    if(state.killAmount.length > 0) {
      switch(state.killAmount[state.killAmount.length - 1].toLowerCase()) {
        case 'm':
          denom = 1000000;
          break;
        case 'k':
          denom = 1000;
          break;
        default:
          break;
      }
      if(isNaN(state.killAmount)) {
        amount = state.killAmount.substr(0, state.killAmount.length - 1);
      }
    }
    updateProfit(false, parseFloat(amount*denom))
  }
  const updateDeath = () => {
    let denom = 1;
    let amount = state.deathAmount
    if(state.deathAmount.length > 0) {
      switch(state.deathAmount[state.deathAmount.length - 1].toLowerCase()) {
        case 'm':
          denom = 1000000;
          break;
        case 'k':
          denom = 1000;
          break;
        default:
          break;
      }
      if(isNaN(state.deathAmount)) {
        amount = state.deathAmount.substr(0, state.deathAmount.length - 1);
      }
    }
    updateProfit(true, parseFloat(amount*denom))
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className='kill-death-container'>
            <div className="kill-container">
              <label className="kill-label">{`Kill count: ${state.killCount}`}</label>
              <div id="input-container">
                <input type="text" placeholder="Loot amount:" className="kill-amount" onChange={(e) => setState({...state, killAmount: e.target.value})} />
                <button type="submit" id="submit" onClick={updateKill}>Killed</button>
              </div>
            </div>
            <div className="death-container">
              <label className="death-label">{`Death count: ${state.deathCount}`}</label>
              <div id="input-container">
                <input type="text" placeholder="Risk amount:" className="death-amount" onChange={(e) => setState({...state, deathAmount: e.target.value})}></input>
                <button type="submit" id="submit" onClick={updateDeath}>Died</button>
              </div>
            </div>      
          </div>
          <div className="profit-container">
            <label>{`Total Profit: ${state.profit}`}</label>
          </div>
          <button onClick={() => {
              localStorage.setItem('killCount', 0);
              localStorage.setItem('deathCount',0)
              localStorage.setItem('profit', 0)
              localStorage.setItem('killAmount', 0);
              localStorage.setItem('deathAmount', 0);
              setState({
                ...state, 
                killCount: 0,
                deathCount: 0,
                killAmount: 0,
                deathAmount: 0,
                profit: 0.00,  
              })
          }} style={{ width: '50px', alignSelf: 'center', marginBottom: '5%'}}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
