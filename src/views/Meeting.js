import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Meeting() {
	const navigate = useNavigate();
	const [selectedVenue, setSelectedVenue] = useState("");
	const [selectedCatering, setSelectedCatering] = useState("");
	const [selectedEquipment, setSelectedEquipment] = useState("");
	const [estimate, setEstimate] = useState(null);

	const venuePrices = {
		conference: 100000,
		hotel: 80000,
		office: 50000,
		virtual: 30000,
	};

	const cateringPrices = {
		breakfast: 20000,
		lunch: 40000,
		snacks: 15000,
		full: 60000,
	};

	const equipmentPrices = {
		basic: 25000,
		premium: 50000,
		advanced: 100000,
		streaming: 30000,
	};

	const calculateEstimate = () => {
		const venuePrice = selectedVenue ? venuePrices[selectedVenue] : 0;
		const cateringPrice = selectedCatering
			? cateringPrices[selectedCatering]
			: 0;
		const equipmentPrice = selectedEquipment
			? equipmentPrices[selectedEquipment]
			: 0;
		setEstimate(venuePrice + cateringPrice + equipmentPrice);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 p-5">
			<div className="max-w-6xl mx-auto py-10">
				<h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-blue-900">
					Plan Your Corporate Meeting
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-blue-700">
							Venues
						</h2>
						<p className="text-gray-600 mb-6">
							Select a professional venue for your meeting
						</p>
						<select
							className="w-full bg-blue-50 border border-blue-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
							onChange={(e) => setSelectedVenue(e.target.value)}
							value={selectedVenue}>
							<option value="">Choose a venue...</option>
							<option value="conference">
								Conference Center - Professional setup
							</option>
							<option value="hotel">Hotel Ballroom - Elegant atmosphere</option>
							<option value="office">Office Space - Convenient location</option>
							<option value="virtual">Virtual Meeting - Remote access</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-green-700">
							Refreshments
						</h2>
						<p className="text-gray-600 mb-6">
							Choose food and beverage options
						</p>
						<select
							className="w-full bg-green-50 border border-green-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent"
							onChange={(e) => setSelectedCatering(e.target.value)}
							value={selectedCatering}>
							<option value="">Choose refreshments...</option>
							<option value="breakfast">
								Breakfast Meeting - Morning refreshers
							</option>
							<option value="lunch">Working Lunch - Full meal</option>
							<option value="snacks">Snacks & Coffee - Light bites</option>
							<option value="full">Full Day Catering - Complete service</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-purple-700">
							Equipment
						</h2>
						<p className="text-gray-600 mb-6">
							Select AV equipment and presentation tools
						</p>
						<select
							className="w-full bg-purple-50 border border-purple-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
							onChange={(e) => setSelectedEquipment(e.target.value)}
							value={selectedEquipment}>
							<option value="">Choose equipment...</option>
							<option value="basic">Basic AV - Projector and sound</option>
							<option value="premium">Premium Setup - Full presentation</option>
							<option value="advanced">
								Advanced Tech - Interactive displays
							</option>
							<option value="streaming">
								Live Streaming - Virtual participants
							</option>
						</select>
					</div>
				</div>

				<div className="text-center mt-12">
					<button
						onClick={calculateEstimate}
						className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
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

export default Meeting;
