import React from "react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center">
			<h2 className="text-lg font-semibold py-4">Not Found</h2>
			<p>Could not find requested resource</p>
			<Link className="text-teal-500 font-bold" href="/demo/home">Click Me to Return Home</Link>
		</div>
	);
}
