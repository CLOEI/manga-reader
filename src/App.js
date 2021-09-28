import React from "react";
import Home from "./pages/Home";
import Manga from "./pages/Manga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/manga">
					<Manga />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
