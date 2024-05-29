"use client";

import React, { useState } from "react";

export default function ResultsCarousel({ images }) {
	const [current, setCurrent] = useState(0);

	const handleNext = () => {
		setCurrent((prev) => (prev + 1) % images.length);
	};

	const handlePrev = () => {
		setCurrent((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-4 mb-4">
			{images.length > 0 && (
				<img src={images[current]} alt="Carousel" className="max-w-full h-auto"/>
			)}
			<div className="flex space-x-2">
				<button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Left</button>
				<button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Right</button>
			</div>
		</div>
	);
}
