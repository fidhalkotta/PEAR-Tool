// src/components/ScrollIndicator.tsx
import React from "react";

export default function ScrollIndicator() {
	return (
		<div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-50">
			<div className="flex items-center justify-center w-12 h-12 bg-nhs-blue bg-opacity-75 rounded-full animate-bounce">
				<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			</div>
		</div>
	);
}
