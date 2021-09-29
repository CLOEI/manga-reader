import React from "react";
import Home from "./pages/Home";
import Manga from "./pages/Manga";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/manga" component={Manga} />
			</Switch>
		</Router>
	);
}

export default App;
