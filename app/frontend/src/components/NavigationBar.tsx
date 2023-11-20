import React from "react";

export default function NavigationBar() {
	return (
		<div className="bg-gray-100 p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">PEAR-Tool</h1>
				<nav>
					<ul className="flex space-x-4">
						<li><a href="#" className="text-gray-700 hover:text-gray-900">Current Jobs</a></li>
						<li><a href="#" className="text-gray-700 hover:text-gray-900">Insights</a></li>
						<li><a href="#" className="text-gray-700 hover:text-gray-900">Getting Started</a></li>
					</ul>
				</nav>
				<div>
					<img src="images/fidhal_pfp.jpg" alt="Profile" className="rounded-full w-10"/>
				</div>
			</div>
		</div>
	);
}
