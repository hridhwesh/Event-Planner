import "./stylesheets/App.css";
import "./stylesheets/index.css";
import "./index.js";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Homepage from "./views/Homepage";
import Wedding from "./views/Wedding";
import Birthday from "./views/Birthday";
import Meeting from "./views/Meeting";
import HouseParty from "./views/HouseParty";
import Vendors from "./views/Vendors";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if user is already logged in
		const token = localStorage.getItem("token");
		const savedUser = localStorage.getItem("user");

		if (token && savedUser) {
			setUser(JSON.parse(savedUser));
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = (userData) => {
		setUser(userData);
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setIsLoggedIn(false);
	};

	return (
		<div className="App">
			{isLoggedIn ? (
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Homepage user={user} onLogout={handleLogout} />} />
						<Route path="/wedding" element={<Wedding />} />
						<Route path="/birthday" element={<Birthday />} />
						<Route path="/meeting" element={<Meeting />} />
						<Route path="/houseparty" element={<HouseParty />} />
						<Route path="/vendors" element={<Vendors />} />
					</Routes>
				</BrowserRouter>
			) : (
				<Login onLogin={handleLogin} />
			)}
		</div>
	);
}

export default App;
