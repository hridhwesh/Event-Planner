import React, { useState } from "react";

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
		<div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
					Event Planner
				</h2>
				<h3 className="text-xl text-center mb-6">Welcome Back</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200">
						Login
					</button>
				</form>
				<p className="text-center mt-4">
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
