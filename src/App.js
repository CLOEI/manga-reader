import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Manga from './pages/manga';
import Discover from './pages/discover';
import About from './pages/about';

function App() {
  useEffect(() => {
    const data = localStorage.getItem('favMangas');
    if (data == null) {
      localStorage.setItem('favMangas', '[]');
      localStorage.setItem('quality', 'data');
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discover" component={Discover} />
        <Route path="/about" component={About} />
        <Route path="/manga" component={Manga} />
      </Switch>
    </Router>
  );
}

export default App;
