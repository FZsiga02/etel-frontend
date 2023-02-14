import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  etelek: Etel[];
  etelNev: string;
  etelKaloria: number;
}

interface Etel {
  id: number;
  nev: string;
  kaloria: number;
}

interface etelListResponse {
  etelek: Etel[];
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      etelNev: '',
      etelKaloria: 0,
      etelek: []
    }
  }

  async loadEtelek() {
    let response = await fetch('http://localhost:3000/etel');
    let data = await response.json() as Etel[];
    this.setState({
      etelek: data,
    })
  }

  componentDidMount() {
    this.loadEtelek();
  }

  handleRegister = async () => {
    const { etelNev, etelKaloria } = this.state;
    if (etelNev.trim() == '' || etelKaloria < 0) {
      return;
    }

    const adat = {
      nev: etelNev,
      kaloria: etelKaloria
    };

    let response = await fetch('http://localhost:3000/etel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      etelNev: '',
      etelKaloria: 0,
    })

    await this.loadEtelek();
  }

  render() {
    const { etelNev, etelKaloria } = this.state;

    return <div>
      <h2>Új étel</h2><br />
      Név: <input type="text" value={ etelNev } onChange={e => this.setState({ etelNev: e.currentTarget.value })} /><br />
      Kalória: <input type="number" value={ etelKaloria } onChange={e => this.setState({ etelKaloria: parseInt(e.currentTarget.value) })} /><br />
      <button onClick={ this.handleRegister }>Felvétel</button><br />
      <h2>Ételek listája</h2><br />
      <ul>
        {
          this.state.etelek.map(etel => <li>{etel.nev}</li>)
        }
      </ul>
    </div>
  }
}


export default App;
