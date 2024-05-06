import React from "react";
import Link from "next/link";

export default function Inventory() {
	return (
		<div>
			<h1 className="text-3xl font-bold">Inventory</h1>
			<p>Inventory page content would go here. You would select and easily see what your clinic has available.</p>
			<Link className="text-teal-500 font-bold" href="/home">Click Me to Return Home</Link>
		</div>

	);
}
