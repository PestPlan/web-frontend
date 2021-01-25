import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/organisms/header';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import DisplayNoticePage from './pages/display/notice';
import DisplayDevicePage from './pages/display/device';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>
					<Route path="/login" component={LoginPage} />
					<Route path="/home" component={HomePage} />
					<Route path="/display/notice" component={DisplayNoticePage} />
					<Route path="/display/device" component={DisplayDevicePage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
