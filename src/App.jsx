import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios"

import './Styles/App.scss'
import './Styles/Variables.scss'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Crypto from './Components/Crypto'
import Watchlist from './Components/Watchlist'

export default class App extends React.Component {
  state = {
    data: [],
    selected: [],
    limit: 25,
    offset: 0,
    sortType: ""
  }

  fetchData = () => {
    axios.get(`https://api.coincap.io/v2/markets`, { params:{
      limit: this.state.limit,
      offset: this.state.offset
    }})
    .then((res) => {
      this.setState({data: res.data.data.sort((a, b) => {
        return b.priceUsd - a.priceUsd 
      })})
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log(this.state.data);
    })
  }

  componentDidMount = () => {
    this.fetchData()
  }

  incrementPage = () => {
    this.setState({offset: this.state.offset + 1 * this.state.limit}, () => this.fetchData())
  }

  decrementPage = () => {
    if (this.state.offset > 0)
      this.setState({offset: this.state.offset - 1 * this.state.limit}, () => this.fetchData())
  }

  setLimit = (size) => {
    this.setState({limit: size}, () => this.fetchData())
  }

  sortCol = (col) => {
    this.setState({sortType: col})
    if (this.state.sortType === col) {
      this.setState({data: this.state.data.reverse()})
    } else 
    // Performance is worse when wrapping the sort in setState, but has more clarity.
      this.setState({data: this.state.data.sort((a, b) => {
        switch (col) {
          case "name":
            return a.baseSymbol.localeCompare(b.baseSymbol)
            break

          case "exchange":
            return a.exchangeId.localeCompare(b.exchangeId)
            break

          case "price":
            return b.priceUsd - a.priceUsd 
            break

          case "vol":
            return b.volumeUsd24Hr - a.volumeUsd24Hr 
          
          case "trades":
            return b.tradesCount24Hr - a.tradesCount24Hr 
            break

          case "rank":
            return b.rank - a.rank 
            break

          default:
            return b.priceUsd - a.priceUsd 
            break;
        }})})
    console.log(col);
  }

  render() {
    return (
      <div className='App'>
      <BrowserRouter>
        <Header />
  
        <Routes>
          <Route path="/home" element = {<Home />} />
          <Route path="/crypto" element = {<Crypto data={this.state.data} setLimit={this.setLimit} incrementPage={this.incrementPage} decrementPage={this.decrementPage} sortCol={this.sortCol} /> } />
          <Route path="/Watchlist" element = {<Watchlist />} />
          <Route path="*" element = {<Navigate to='/home' replace />} />
        </Routes>
  
        <Footer />
      </BrowserRouter>
    </div>
    )
  }
}