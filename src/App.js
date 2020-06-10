import React, { Component } from 'react';
import CountrySelection from './pages/CountrySelection'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.setAppState('')
  }


  render() {
    console.log(`render in App`)
    return (
      <div className="App">
        <CountrySelection updateInput={this.handleCountrySelected} />
 
      </div>
    );
  }

  handleCountrySelected(countryId){
   // alert(`Country ID of ${countryId} is selected`)
  }

  setAppState(name) {
    switch (name) {
      case 'league':
        this.setState({ showLeague: true })
        break
      case 'team':
        this.setState({ showTeam: true })
        break
      default:
        this.setState({ showLeague: false, showTeam: false })
        break
    }
  }
}
export default App;
