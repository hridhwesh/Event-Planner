import "./App.css";
import "./index.css";
import React, { useState } from "react";
import Login from "./Login";
import Homepage from "./Homepage";

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
