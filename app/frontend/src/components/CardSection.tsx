"use client";

// src/components/CardSection.tsx
import React, { useState } from "react";
import Modal from "./Modal";

const cards = [
	{
		id: 1,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 2,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "CT Scan Analysis",
		description: "Discover how we analyze CT scans to provide detailed insights.",
		image: "/images/post_op_ct.png",
		images: ["/images/post_op_ct.png", "/images/aorta_slice.png", "/images/aorta_slice.png"] // Add more images for the carousel
	}
	// Add more cards as needed
];

export default function CardSection() {
	const [selectedCard, setSelectedCard] = useState(null);

	const openModal = (card) => {
		setSelectedCard(card);
	};

	const closeModal = () => {
		setSelectedCard(null);
	};

	return (
		<div className="overflow-y-scroll  h-[calc(100vh-8rem)]">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{cards.map((card) => (
					<div key={card.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
						 onClick={() => openModal(card)}>
						<img src={card.image} alt={card.title} className="w-full h-48 object-cover mb-4 rounded"/>
						<h2 className="text-xl font-bold mb-2">{card.title}</h2>
						<p className="text-gray-700">{card.description}</p>
					</div>
				))}
			</div>
			{selectedCard && <Modal card={selectedCard} closeModal={closeModal}/>}
		</div>
	);
}
