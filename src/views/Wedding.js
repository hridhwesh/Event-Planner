import React, { useState } from "react";

function Wedding() {
	const [selectedVenue, setSelectedVenue] = useState("");
	const [selectedCatering, setSelectedCatering] = useState("");
	const [selectedDecorations, setSelectedDecorations] = useState("");
	const [estimate, setEstimate] = useState(null);

	const venuePrices = {
		garden: 500000,
		beach: 1000000,
		ballroom: 1500000,
		hotel: 800000,
		barn: 400000,
	};

	const cateringPrices = {
		italian: 250000,
		indian: 200000,
		seafood: 400000,
		vegetarian: 180000,
		buffet: 150000,
		plated: 300000,
	};

	const decorationPrices = {
		floral: 100000,
		lightning: 150000,
		balloon: 50000,
		drapery: 75000,
		stage: 250000,
		themed: 200000,
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
		<div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800 p-5">
			<div className="max-w-6xl mx-auto py-10">
				<h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-pink-900">
					Plan Your Dream Wedding
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-indigo-700">
							Venues
						</h2>
						<p className="text-gray-600 mb-6">
							Browse and select from available wedding venues
						</p>
						<select
							className="w-full bg-indigo-50 border border-indigo-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
							onChange={(e) => setSelectedVenue(e.target.value)}
							value={selectedVenue}>
							<option value="">Choose a venue...</option>
							<option value="garden">Garden Venue - Elegant outdoors</option>
							<option value="beach">Beach Venue - Romantic seaside</option>
							<option value="ballroom">Ballroom - Grand and luxurious</option>
							<option value="hotel">Hotel Venue - Convenient all-in-one</option>
							<option value="barn">Barn Venue - Rustic charm</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-green-700">
							Catering
						</h2>
						<p className="text-gray-600 mb-6">
							Explore catering options and menu packages
						</p>
						<select
							className="w-full bg-green-50 border border-green-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent"
							onChange={(e) => setSelectedCatering(e.target.value)}
							value={selectedCatering}>
							<option value="">Choose catering...</option>
							<option value="italian">Italian Cuisine - Pasta and pizza</option>
							<option value="indian">
								Indian Cuisine - Traditional flavors
							</option>
							<option value="seafood">
								Seafood Specialties - Fresh from the ocean
							</option>
							<option value="vegetarian">
								Vegetarian/Vegan - Plant-based delights
							</option>
							<option value="buffet">Buffet Style - Variety for all</option>
							<option value="plated">
								Plated Dinner - Gourmet presentation
							</option>
						</select>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
						<h2 className="text-2xl font-semibold mb-4 text-purple-700">
							Decorations
						</h2>
						<p className="text-gray-600 mb-6">
							Choose from professional decoration services
						</p>
						<select
							className="w-full bg-purple-50 border border-purple-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
							onChange={(e) => setSelectedDecorations(e.target.value)}
							value={selectedDecorations}>
							<option value="">Choose decorations...</option>
							<option value="floral">
								Floral Arrangements - Blooming beauty
							</option>
							<option value="lightning">
								Lighting Setup - Magical ambiance
							</option>
							<option value="balloon">
								Balloon Arrivals - Fun and festive
							</option>
							<option value="drapery">
								Drapery and Linens - Elegant touch
							</option>
							<option value="stage">Stage Design - Custom focal point</option>
							<option value="themed">Themed Decor - Personalized theme</option>
						</select>
					</div>
				</div>

				<div className="text-center mt-12">
					<button
						onClick={calculateEstimate}
						className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
						Get Estimate
					</button>

					{estimate !== null && (
						<div className="mt-8 p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
							<h2 className="text-3xl font-bold text-green-700 mb-4">
								Estimated Cost
							</h2>
							<p className="text-2xl text-gray-800">
								₹{estimate.toLocaleString("en-IN")}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Wedding;
