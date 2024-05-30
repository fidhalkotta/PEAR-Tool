"use client";

// src/components/CardSection.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

const cards = [
	{
		id: 1,
		title: "PEAR-Tool Demo",
		// eslint-disable-next-line max-len
		description: "Have a go at using the demo version of PEAR-Tool and interact with various aspects of the tool as a clinician would. You can click through to create and submit new example job, as well as viewing insights on a completed job.",
		image: "/images/website/homepage.png",
		images: [] // Add more images for the carousel
	},
	{
		id: 2,
		title: "Replica Stent Grafts",
		// eslint-disable-next-line max-len
		description: "Replica stent grafts manufactured at MechSpace. The crowns were made from Nitinol wire which was heated in a 500 degree kiln to preserve its shape. They are then sewn on a fabric graft using nylon thread.",
		image: "/images/replica_stents/all_stents.png",
		images: ["/images/replica_stents/all_stents.png", "/images/replica_stents/sewing_v2.mp4"] // Add more images for the carousel
	},
	{
		id: 3,
		title: "FEA Model",
		description: "Various images showing outputs of different aspects of our validated FEA model, which simulated the deployment of a the stent",
		image: "/images/fea/crown_displacement.jpeg",
		images: ["/images/fea/crown_displacement.jpeg", "/images/fea/crown_stress.jpeg"] // Add more images for the carousel
	},
	{
		id: 4,
		title: "Preprocessing",
		description: "A series of preprocessing steps were done to transform the dataset of CT scans into usable 3D models for our FEA simulations.",
		image: "/images/preprocessing/3d_messy_aorta_split_mask.png",
		images: ["/images/preprocessing/3d_messy_aorta_split_mask.png", "/images/preprocessing/ct_split_mask.png", "/images/preprocessing/yellow_messy_aorta.png"] // Add more images for the carousel
	},
	{
		id: 5,
		title: "Clinical Procedure Example",
		description: "Animation to show how the EVAR procedure is done, and where the stent graft is deployed relative to the aorta and aneurysm",
		image: "/images/clinical_background/evar_example_frame.png",
		images: ["/images/clinical_background/evar_example.mp4"] // Add more images for the carousel
	},
	{
		id: 6,
		title: "Crush Tests",
		description: "Crush tests were performed on singular crowns and whole stents that we manufactured. This was compared to our FEA model and to an industry made stent.",
		image: "/images/crush_test/real_single_crown.png",
		images: ["/images/crush_test/real_single_crown.png", "/images/crush_test/real_stent_v2.mp4", "/images/crush_test/fea_single_crown.png"] // Add more images for the carousel
	},
	{
		id: 7,
		title: "Deployment Example",
		description: "In-vitro deployment of a manufactured device into simplified aorta phantom.",
		image: "/images/deployment/deployment_frame.png",
		images: ["/images/deployment/deployment_v2.mp4", "/images/deployment/partially_deployed_catheter.jpeg"] // Add more images for the carousel
	},
	{
		id: 8,
		title: "Resin Printed Aortas",
		description: "Cleaning resin printed aorta phantom before curing.",
		image: "/images/resin_printed_aortas/cleaning_frame.png",
		images: ["/images/resin_printed_aortas/cleaning_v2.mp4"] // Add more images for the carousel
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
					card.id === 1 ? (
						<Link key={card.id} href="/demo/home">
							<div className="bg-ucl_green rounded-lg shadow-md p-4 cursor-pointer">
								<img src={card.image} alt={card.title}
									 className="w-full h-48 object-cover mb-4 rounded"/>
								<h2 className="text-xl font-bold mb-2 text-white">{card.title}</h2>
								<p className="text-gray-200 text-justify"><span className="text-white underline">Click Me!</span> {card.description}</p>
							</div>
						</Link>
					) : (
						<div key={card.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
							 onClick={() => openModal(card)}>
							<img src={card.image} alt={card.title} className="w-full h-48 object-cover mb-4 rounded"/>
							<h2 className="text-xl font-bold mb-2">{card.title}</h2>
							<p className="text-gray-700 text-justify">{card.description}</p>
						</div>
					)
				))}
			</div>
			{selectedCard && <Modal card={selectedCard} closeModal={closeModal}/>}
		</div>
	);
}
