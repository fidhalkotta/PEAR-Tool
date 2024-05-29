// import React from "react";
// import Link from "next/link";

// export default function Default() {
// 	return (
// 		<Link className="text-teal-500 font-bold" href="/demo/home">Click Me to Return Home</Link>
// 	);
// }

// src/app/page.tsx
import React from "react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Welcome to PEAR-Tool</h1>
			<p className="mb-8">
				Explore the different aspects of our project that led to the creation of PEAR-Tool. Click the demo
				button below to experience the tool live.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-white rounded-lg shadow-md p-4">
					<img src="/images/AAA-ct-scan.png" alt="CT Scan" className="w-full h-48 object-cover mb-4 rounded"/>
					<h2 className="text-xl font-bold mb-2">CT Scan Analysis</h2>
					<p className="text-gray-700">Discover how we analyze CT scans to provide detailed insights.</p>
				</div>
				{/* Add more cards as needed */}
			</div>
			<div className="mt-8">
				<Link href="/demo">
					<a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Demo</a>
				</Link>
			</div>
		</main>
	);
}
