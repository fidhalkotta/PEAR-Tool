import React, { useState } from "react";
import Link from "next/link";

export default function NavigationBar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<div className="bg-gray-100 p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/home" className="text-xl font-bold hover:text-teal-500 duration-150">
					PEAR-Tool
				</Link>
				<nav>
					<ul className="flex space-x-4">
						<li><Link href="/jobs" className="text-gray-700 hover:text-gray-900">Current Jobs</Link></li>
						<li><a href="#" className="text-gray-700 hover:text-gray-900">Insights</a></li>
						<li><a href="#" className="text-gray-700 hover:text-gray-900">Getting Started</a></li>
					</ul>
				</nav>
				<div onClick={toggleDropdown} className="relative">
					<img src="images/fidhal_pfp.png" alt="Profile" className="rounded-full w-10 cursor-pointer"/>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
							<Link href="/settings"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
							<Link href="/inventory"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Inventory</Link>
							<Link href="/login"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
