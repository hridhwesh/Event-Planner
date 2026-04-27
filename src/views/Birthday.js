import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Birthday() {
	const navigate = useNavigate();
	const [selectedVenue, setSelectedVenue] = useState("");
	const [selectedCatering, setSelectedCatering] = useState("");
	const [selectedDecorations, setSelectedDecorations] = useState("");
	const [estimate, setEstimate] = useState(null);

	const venuePrices = {
		garden: 200000,
		restaurant: 150000,
		home: 50000,
		hall: 100000,
	};

	const cateringPrices = {
		buffet: 80000,
		cake: 30000,
		snacks: 50000,
		full: 120000,
	};

	const decorationPrices = {
		themed: 50000,
		balloons: 20000,
		flowers: 30000,
		lighting: 40000,
	};

	const calculateEstimate = () => {
		const venuePrice = selectedVenue ? venuePrices[selectedVenue] : 0;
		const cateringPrice = selectedCatering
			? cateringPrices[selectedCatering]
			: 0;
		const decorationPrice = selectedDecorations
			? decorationPrices[selectedDecorations]
			: 0;
		setEstimate(venuePrice + cateringPrice + decorationPrice);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 text-gray-800 p-5">
			<div className="max-w-6xl mx-auto py-10">
				<h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-orange-900">
					Plan Your Birthday Party
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-orange-700">
							Venues
						</h2>
						<p className="text-gray-600 mb-6">
							Choose a venue for your birthday celebration
						</p>
						<select
							className="w-full bg-orange-50 border border-orange-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
							onChange={(e) => setSelectedVenue(e.target.value)}
							value={selectedVenue}>
							<option value="">Choose a venue...</option>
							<option value="garden">Garden - Fresh air setting</option>
							<option value="restaurant">Restaurant - Convenient dining</option>
							<option value="home">Home - Cozy atmosphere</option>
							<option value="hall">Party Hall - Spacious area</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-yellow-700">
							Food & Cake
						</h2>
						<p className="text-gray-600 mb-6">
							Select food options and birthday cake
						</p>
						<select
							className="w-full bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
							onChange={(e) => setSelectedCatering(e.target.value)}
							value={selectedCatering}>
							<option value="">Choose catering...</option>
							<option value="buffet">Buffet - Variety selection</option>
							<option value="cake">Cake Only - With simple snacks</option>
							<option value="snacks">
								Snacks & Drinks - Light refreshment
							</option>
							<option value="full">Full Meal - Complete dining</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-blue-700">
							Decorations
						</h2>
						<p className="text-gray-600 mb-6">
							Choose decorations and party supplies
						</p>
						<select
							className="w-full bg-blue-50 border border-blue-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
							onChange={(e) => setSelectedDecorations(e.target.value)}
							value={selectedDecorations}>
							<option value="">Choose decorations...</option>
							<option value="themed">Themed Decor - Personalized theme</option>
							<option value="balloons">Balloons - Colorful and festive</option>
							<option value="flowers">Flowers - Natural beauty</option>
							<option value="lighting">Lighting - Magical ambiance</option>
						</select>
					</div>
				</div>

				<div className="text-center mt-12">
					<button
						onClick={calculateEstimate}
						className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
						Get Estimate
					</button>

					{estimate !== null && (
						<div className="mt-8 space-y-6">
							<div className="p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
								<h2 className="text-3xl font-bold text-green-700 mb-4">
									Estimated Cost
								</h2>
								<p className="text-2xl text-gray-800">
									₹{estimate.toLocaleString("en-IN")}
								</p>
							</div>
							<button
								onClick={() => navigate("/vendors")}
								className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
								View Recommended Vendors
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Birthday;
