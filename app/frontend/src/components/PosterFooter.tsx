// src/components/PosterFooter.tsx
import React from "react";

export default function PosterFooter() {
	return (
		<div
			className="bg-ucl_green text-white w-full py-2 fixed bottom-0 left-0 flex items-center justify-between px-4">
			<p className="text-white">UCL Mechanical Engineering</p>
			<div className="flex space-x-4">
				<img src="/images/nhs_logo.png" alt="NHS Logo" className="h-10"/>
			</div>
		</div>
	);
}
