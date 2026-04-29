import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Vendors() {
	const location = useLocation();
	const estimate = location.state?.estimate || 0;
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [showChat, setShowChat] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const [showCheckout, setShowCheckout] = useState(false);
	const [cateringVendors, setCateringVendors] = useState([]);
	const [decorationVendors, setDecorationVendors] = useState([]);
	const [venueVendors, setVenueVendors] = useState([]);
	const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

	useEffect(() => {
		fetchVendors();
	}, []);

	const fetchVendors = async () => {
		try {
			const [cateringRes, decorationRes, venueRes] = await Promise.all([
				fetch("http://localhost:5000/api/vendors/catering"),
				fetch("http://localhost:5000/api/vendors/decoration"),
				fetch("http://localhost:5000/api/vendors/venue"),
			]);

			if (cateringRes.ok) setCateringVendors(await cateringRes.json());
			if (decorationRes.ok) setDecorationVendors(await decorationRes.json());
			if (venueRes.ok) setVenueVendors(await venueRes.json());
		} catch (error) {
			console.error("Error fetching vendors:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleContactVendor = (vendor) => {
		setSelectedVendor(vendor);
		setShowChat(true);
	};

	const handleAddToCart = (vendor) => {
		setCartItems([...cartItems, vendor]);
	};

	const ChatBox = () => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Chat with {selectedVendor?.name}</h3>
					<button
						onClick={() => setShowChat(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>
				<div className="h-64 bg-gray-100 rounded p-4 mb-4 overflow-y-auto">
					<p className="text-gray-600">Welcome to our chat! How can we help you with your event planning?</p>
				</div>
				<div className="flex">
					<input
						type="text"
						placeholder="Type your message..."
						className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r">
						Send
					</button>
				</div>
			</div>
		</div>
	);

	const CartIcon = () => (
		cartItems.length > 0 && (
			<div
				className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-700 transition-colors"
				onClick={() => setShowCart(true)}
			>
				🛒
				<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
					{cartItems.length}
				</span>
			</div>
		)
	);

	const handleRemoveFromCart = (index) => {
		setCartItems(cartItems.filter((_, i) => i !== index));
	};

	const CartSidebar = () => {
		const cateringItems = cartItems.filter(item => cateringVendors.some(v => v.name === item.name));
		const decorationItems = cartItems.filter(item => decorationVendors.some(v => v.name === item.name));
		const venueItems = cartItems.filter(item => venueVendors.some(v => v.name === item.name));

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
				<div className="bg-white w-full max-w-md h-full overflow-y-auto">
					<div className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
							<button
								onClick={() => setShowCart(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								✕
							</button>
						</div>

						{/* Catering Items */}
						{cateringItems.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-green-700 mb-3">Catering Services</h3>
								<div className="space-y-3">
									{cateringItems.map((item, index) => (
										<div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
											<div>
												<h4 className="font-medium text-gray-800">{item.name}</h4>
												<p className="text-sm text-gray-600">{item.priceRange}</p>
											</div>
											<button
												onClick={() => handleRemoveFromCart(cartItems.indexOf(item))}
												className="text-red-500 hover:text-red-700"
											>
												🗑️
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Decoration Items */}
						{decorationItems.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-purple-700 mb-3">Decoration Services</h3>
								<div className="space-y-3">
									{decorationItems.map((item, index) => (
										<div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
											<div>
												<h4 className="font-medium text-gray-800">{item.name}</h4>
												<p className="text-sm text-gray-600">{item.priceRange}</p>
											</div>
											<button
												onClick={() => handleRemoveFromCart(cartItems.indexOf(item))}
												className="text-red-500 hover:text-red-700"
											>
												🗑️
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Venue Items */}
						{venueItems.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-indigo-700 mb-3">Venue Services</h3>
								<div className="space-y-3">
									{venueItems.map((item, index) => (
										<div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
											<div>
												<h4 className="font-medium text-gray-800">{item.name}</h4>
												<p className="text-sm text-gray-600">{item.priceRange}</p>
											</div>
											<button
												onClick={() => handleRemoveFromCart(cartItems.indexOf(item))}
												className="text-red-500 hover:text-red-700"
											>
												🗑️
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{cartItems.length === 0 && (
							<div className="text-center py-12">
								<p className="text-gray-500">Your cart is empty</p>
							</div>
						)}

						{cartItems.length > 0 && (
							<div className="mt-8">
								<button
									onClick={() => {
										setShowCart(false);
										setShowCheckout(true);
									}}
									className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
								>
									Proceed to Checkout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	const CheckoutModal = () => {
		const [selectedPayment, setSelectedPayment] = useState("");

		const calculateTotal = () => {
			// For simplicity, let's assume an average price from the range
			return cartItems.length * 100000; // ₹1,00,000 per service as average
		};

		const handlePayment = () => {
			alert(`Payment of ₹${calculateTotal().toLocaleString()} processed successfully via ${selectedPayment}!`);
			setShowCheckout(false);
			setCartItems([]);
		};

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-gray-800">Invoice & Payment</h2>
						<button
							onClick={() => setShowCheckout(false)}
							className="text-gray-500 hover:text-gray-700 text-2xl"
						>
							✕
						</button>
					</div>

					{/* Invoice Header */}
					<div className="bg-gray-50 p-4 rounded-lg mb-6">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">Event Planner Invoice</h3>
							<p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
						</div>
						<div className="border-t pt-4">
							<h4 className="font-medium mb-3">Services Selected:</h4>
							<div className="space-y-2">
								{cartItems.map((item, index) => (
									<div key={index} className="flex justify-between text-sm">
										<span>{item.name}</span>
										<span>₹1,00,000</span>
									</div>
								))}
							</div>
							<div className="border-t mt-4 pt-2 flex justify-between font-semibold">
								<span>Total Amount:</span>
								<span>₹{calculateTotal().toLocaleString()}</span>
							</div>
						</div>
					</div>

					{/* Payment Options */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div
								className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
									selectedPayment === "card"
										? "border-blue-500 bg-blue-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedPayment("card")}
							>
								<div className="flex items-center">
									<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
										💳
									</div>
									<div>
										<h4 className="font-medium">Credit/Debit Card</h4>
										<p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
									</div>
								</div>
							</div>

							<div
								className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
									selectedPayment === "upi"
										? "border-green-500 bg-green-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedPayment("upi")}
							>
								<div className="flex items-center">
									<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
										📱
									</div>
									<div>
										<h4 className="font-medium">UPI</h4>
										<p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
									</div>
								</div>
							</div>

							<div
								className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
									selectedPayment === "netbanking"
										? "border-purple-500 bg-purple-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedPayment("netbanking")}
							>
								<div className="flex items-center">
									<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
										🏦
									</div>
									<div>
										<h4 className="font-medium">Net Banking</h4>
										<p className="text-sm text-gray-600">All major banks</p>
									</div>
								</div>
							</div>

							<div
								className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
									selectedPayment === "wallet"
										? "border-orange-500 bg-orange-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedPayment("wallet")}
							>
								<div className="flex items-center">
									<div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
										👛
									</div>
									<div>
										<h4 className="font-medium">Digital Wallet</h4>
										<p className="text-sm text-gray-600">Paytm, Mobikwik, Ola Money</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Payment Form */}
					{selectedPayment && (
						<div className="mb-6">
							<h4 className="font-medium mb-3">Payment Details</h4>
							{selectedPayment === "card" && (
								<div className="space-y-3">
									<input
										type="text"
										placeholder="Card Number"
										className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<div className="grid grid-cols-2 gap-3">
										<input
											type="text"
											placeholder="MM/YY"
											className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
										<input
											type="text"
											placeholder="CVV"
											className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<input
										type="text"
										placeholder="Cardholder Name"
										className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							)}

							{selectedPayment === "upi" && (
								<div className="space-y-3">
									<input
										type="text"
										placeholder="Enter UPI ID (e.g., user@paytm)"
										className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
									/>
									<p className="text-sm text-gray-600">Or scan QR code with your UPI app</p>
								</div>
							)}

							{selectedPayment === "netbanking" && (
								<div className="space-y-3">
									<select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
										<option>Select Bank</option>
										<option>SBI</option>
										<option>HDFC</option>
										<option>ICICI</option>
										<option>Axis Bank</option>
										<option>Other Banks</option>
									</select>
								</div>
							)}

							{selectedPayment === "wallet" && (
								<div className="space-y-3">
									<select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
										<option>Select Wallet</option>
										<option>Paytm</option>
										<option>Mobikwik</option>
										<option>Ola Money</option>
										<option>Amazon Pay</option>
									</select>
								</div>
							)}
						</div>
					)}

					{/* Pay Button */}
					<div className="flex space-x-4">
						<button
							onClick={() => setShowCheckout(false)}
							className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={handlePayment}
							disabled={!selectedPayment}
							className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
								selectedPayment
									? "bg-green-600 hover:bg-green-700 text-white"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}`}
						>
							Pay ₹{calculateTotal().toLocaleString()}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const VendorCard = ({ vendor, type }) => (
		<div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
			<h3 className="text-xl font-semibold mb-2 text-gray-800">
				{vendor.name}
			</h3>
			<p className="text-gray-600 mb-4">{vendor.description}</p>
			<div className="space-y-2">
				<p className="text-sm text-gray-500">
					<span className="font-medium">Contact:</span> {vendor.contact}
				</p>
				<p className="text-sm text-gray-500">
					<span className="font-medium">Rating:</span> ⭐ {vendor.rating}/5
				</p>
				<p className="text-sm text-gray-500">
					<span className="font-medium">Price Range:</span> {vendor.priceRange}
				</p>
			</div>
			<div className="mt-4 flex space-x-2">
				<button
					onClick={() => handleContactVendor(vendor)}
					className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
				>
					Contact Vendor
				</button>
				<button
					onClick={() => handleAddToCart(vendor)}
					className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 p-5">
			<div className="max-w-7xl mx-auto py-10">
				<h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-blue-900">
					Recommended Vendors
				</h1>

				{/* Budget Bar */}
				{estimate > 0 && (
					<div className="mb-8 bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
						<h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
							Event Budget Tracker
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-lg font-medium">Original Estimate:</span>
								<span className="text-lg font-bold text-blue-600">₹{estimate.toLocaleString("en-IN")}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-lg font-medium">Cart Total:</span>
								<span className="text-lg font-bold text-green-600">₹{(cartItems.length * 100000).toLocaleString("en-IN")}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-lg font-medium">Remaining Budget:</span>
								<span className={`text-lg font-bold ${estimate - (cartItems.length * 100000) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
									₹{(estimate - (cartItems.length * 100000)).toLocaleString("en-IN")}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-lg font-medium">Total Saved from Estimate:</span>
								<span className="text-lg font-bold text-purple-600">
									₹{Math.max(0, estimate - (cartItems.length * 100000)).toLocaleString("en-IN")}
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Catering Vendors */}
				<div className="mb-12">
					<h2 className="text-3xl font-semibold mb-8 text-center text-green-700">
						Catering Vendors
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{cateringVendors.map((vendor, index) => (
							<VendorCard key={index} vendor={vendor} type="catering" />
						))}
					</div>
				</div>

				{/* Decoration Vendors */}
				<div className="mb-12">
					<h2 className="text-3xl font-semibold mb-8 text-center text-purple-700">
						Decoration Vendors
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{decorationVendors.map((vendor, index) => (
							<VendorCard key={index} vendor={vendor} type="decoration" />
						))}
					</div>
				</div>

				{/* Venue Vendors */}
				<div className="mb-12">
					<h2 className="text-3xl font-semibold mb-8 text-center text-indigo-700">
						Venue Vendors
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{venueVendors.map((vendor, index) => (
							<VendorCard key={index} vendor={vendor} type="venue" />
						))}
					</div>
				</div>
			</div>

			{/* Chat Box */}
			{showChat && <ChatBox />}

			{/* Cart Sidebar */}
			{showCart && <CartSidebar />}

			{/* Checkout Modal */}
			{showCheckout && <CheckoutModal />}

			{/* Cart Icon */}
			<CartIcon />
		</div>
	);
}

export default Vendors;