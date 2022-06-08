import React from "react";

import '../../Styles/Table.scss'

const Table = (props) => {

  return (
    <div className="Table">
      <div className="TableRow TableHeader" style={{borderBottom: '1px solid #1677df', gridTemplateColumns: `repeat(${props.columns}, 1fr)`}}>
        <div className="left" onClick={() => props.sortCol( "name")}>Name</div>
        <div className="left" onClick={() => props.sortCol( "exchange")}>Exchange</div>
        <div className="right" onClick={() => props.sortCol("price")}>Price</div>
        <div className="right" onClick={() => props.sortCol("vol")}>24HVolume</div>
        <div className="right" onClick={() => props.sortCol("trades")}>24HTrades</div>
        <div className="right" onClick={() => props.sortCol("rank")}>Rank</div>
      </div>
      {props.data.length > 0 &&
        props.data.map((entry, index) => (
          <div key={index} className="TableRow" style={{gridTemplateColumns: `repeat(${props.columns}, 1fr)`}} >            
            {<div className="left">{`${entry.baseSymbol} - ${entry.baseId.charAt(0).toUpperCase() + entry.baseId.slice(1)}`}</div>}
            {<div className="left">{entry.exchangeId}</div>}
            {<div className="right">{`$${parseFloat(entry.priceUsd).toFixed(2)}`}</div>}
            {<div className="right">{`$${parseFloat(entry.volumeUsd24Hr).toFixed(2)}`}</div>}
            {<div className="right">{entry.tradesCount24Hr == null ? 0 : parseFloat(entry.tradesCount24Hr) }</div>}
            {<div className="right">{entry.rank}</div>}
          </div>
        ))}

        <div className="TableControls">
          <button onClick={props.decrementPage}>Prev</button> 
          <button onClick={() => props.setLimit(25)}>25</button>
          <button onClick={() => props.setLimit(50)}>50</button>
          <button onClick={props.incrementPage}>Next</button>
        </div>
    </div>
  )
}

export default Table;