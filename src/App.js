import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Discover from './pages/Discover';
import About from './pages/About';
import Manga from './pages/Manga';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/discover" component={Discover} />
        <Route path="/about" component={About} />
        <Route path="/manga" component={Manga} />
      </Switch>
    </Router>
  );
};

export default App;
