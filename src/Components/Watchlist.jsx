import React from "react"

import Table from "./Reusable/Table"

const Watchlist = (props) => {
    return ( 
      <main className="Crypto">
        <Table data={props.data}  columns={6} headers={["Name", "Exchange", "Price", "24HVolume", "24HTrades", "Rank" ]} setLimit={props.setLimit} incrementPage={props.incrementPage} decrementPage={props.decrementPage} sortCol={props.sortCol} watch={props.watch} />
      </main>
    )
  }
export default Watchlist