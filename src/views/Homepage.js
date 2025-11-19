import React from "react";
import icon from "./assets/pngegg.png";
import wedIcon from "./assets/wedding.svg";
import bday from "./assets/birthday-cake.png";
import meeting from "./assets/conversation.png";
import house from "./assets/christmas-music.png";
import more from "./assets/button.png";

function Homepage() {
	return (
		<div className="App bg-white overflow-hidden">
			<div className="bg-blue-700 w-full min-h-[70px] flex justify-between items-center px-4">
				<h1 className="font-semibold text-2xl sm:text-3xl text-left">
					Event Planner
				</h1>
				<img alt="User Icon" src={icon} className="w-[30px] h-[30px]" />
			</div>
			<div className="mt-0 w-full bg-[#466377] min-h-screen p-4">
				<h1 className="text-2xl sm:text-3xl text-white font-semibold text-center pt-4 pb-8">
					What are you planning for?
				</h1>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
					<div className="flex-col border-2 border-white rounded-2xl p-4 shadow-2xl bg-white">
						<a href="http://localhost:5000/wedding">
						<img
							src={wedIcon}
							alt="wedding icon"
							className="w-full h-auto max-w-[160px] mx-auto"
						/>
						<h1 className="font-semibold text-center bg-gray-100 mt-2 p-2 rounded-2xl">
							Wedding
						</h1>
						</a>
					</div>
					<div className="flex-col border-2 border-white rounded-2xl p-4 shadow-2xl bg-white">
						<img
							src={bday}
							alt="birthday icon"
							className="w-full h-auto max-w-[160px] mx-auto"
						/>
						<h1 className="font-semibold text-center bg-gray-100 mt-2 p-2 rounded-2xl">
							Birthday
						</h1>
					</div>
					<div className="flex-col border-2 border-white rounded-2xl p-4 shadow-2xl bg-white">
						<img
							src={meeting}
							alt="meeting icon"
							className="w-full h-auto max-w-[160px] mx-auto"
						/>
						<h1 className="font-semibold text-center bg-gray-100 mt-2 p-2 rounded-2xl">
							Meeting
						</h1>
					</div>
					<div className="flex-col border-2 border-white rounded-2xl p-4 shadow-2xl bg-white">
						<img
							src={house}
							alt="house party icon"
							className="w-full h-auto max-w-[160px] mx-auto"
						/>
						<h1 className="font-semibold text-center bg-gray-100 mt-2 p-2 rounded-2xl">
							House Party
						</h1>
					</div>
				</div>
				<div className="bg-white flex items-center justify-center h-[60px] rounded-2xl shadow-2xl mx-auto max-w-md">
					<h1 className="font-bold text-lg mr-4">Custom Event</h1>
					<img src={more} alt="More" className="w-[50px] h-[50px]" />
				</div>
			</div>
		</div>
	);
}

export default Homepage;
