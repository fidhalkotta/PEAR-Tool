import React from "react";
import Link from "next/link";

export default function Default() {
	return (
		<Link className="text-teal-500 font-bold" href="/home">Click Me to Return Home</Link>
	);
}
