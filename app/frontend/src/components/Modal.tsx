// src/components/Modal.tsx
import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Modal({ card, closeModal }) {
	// Close modal on outside click
	const handleOutsideClick = (e) => {
		if (e.target.id === "modal-overlay")
			closeModal();
	};

	// Close modal on Escape key press
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape")
				closeModal();
		};
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [closeModal]);

	return (
		<div
			id="modal-overlay"
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={handleOutsideClick}
		>
			<div className="bg-white p-4 rounded-lg w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto">
				<button className="mb-4 text-red-500" onClick={closeModal}>
          Close
				</button>
				<div className="mb-4 overflow-y-auto">
					<h2 className="text-xl font-bold mb-2">{card.title}</h2>
					<p className="text-gray-700 mb-4">{card.description}</p>
				</div>
				<Carousel showThumbs={false} className="h-full">
					{card.images.map((image, index) => (
						<div key={index}>
							<img src={image} alt={`Slide ${index + 1}`} className="object-contain h-full w-full" />
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
}
