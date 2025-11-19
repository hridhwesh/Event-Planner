import "./stylesheets/App.css";
import "./stylesheets/index.css";
import "./index.js";
import React, { useState } from "react";
import Login from "./views/Login";
import Homepage from "./views/Homepage";


function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<div className="App">
			{isLoggedIn ? <Homepage /> : <Login onLogin={handleLogin} />}
		</div>
	);
}


export default App;
