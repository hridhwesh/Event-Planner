import React, { useState } from "react";
import eventLogo from "./assets/event_logo.png";

function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Mock login - in real app, validate credentials
		if (email && password) {
			onLogin();
		}
	};

	return (
		<div className="min-h-screen bg-zinc-900 flex text-white items-center justify-center px-4">
			<div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<div class="w-full h-52 rounded-lg bg-zinc-700 overflow-hidden">
                    <img class="w-full h-full object-cover" src={eventLogo} alt="Event Logo" ></img>
                </div>
				<form onSubmit={handleSubmit}>
					<div className="mt-4 mb-4">
						<label htmlFor="email" className="block text-zinc-400">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-zinc-400">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200">
						Login
					</button>
				</form>
				<p className="text-center text-zinc-500 mt-4">
					Don't have an account?{" "}
					<a href="#" className="text-blue-600">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
