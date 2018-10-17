import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">BLOC JAMS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Landing <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='/library'>Library</Link>
              </li>
            </ul>
            <span className="navbar-text">
              <img className="App-logo" src="/assets/images/bloc_jams_logo.png"/>
            </span>
          </div>
        </nav>
        </header>
        <div className="bodycontent"><h1>Bloc Jams</h1>
        <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
        </main>
          </div>
      </div>
    );
  }
}

export default App;
