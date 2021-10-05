import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/home'));
const Manga = React.lazy(() => import('./pages/manga'));
const Discover = React.lazy(() => import('./pages/discover'));
const About = React.lazy(() => import('./pages/about'));

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
				<React.Suspense fallback={<p>Loading...</p>}>
					<Route exact path="/" component={Home} />
					<Route path="/discover" component={Discover} />
					<Route path="/about" component={About} />
					<Route path="/manga" component={Manga} />
				</React.Suspense>
			</Switch>
		</Router>
	);
}

export default App;
