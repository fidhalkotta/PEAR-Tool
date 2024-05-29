// src/components/PosterHeader.tsx
import React from "react";

export default function PosterHeader() {
	return (
		<div className="bg-ucl_green text-white w-full fixed top-0 left-0 flex items-end justify-between px-4">
			<div className="text-white py-4">
				<h1 className="text-white text-xl font-bold">In-Silico Modelling of Endovascular Aneurysm Repair</h1>
				{/*<p className="text-white">Supervisor: Dr. Thomas Peach</p>*/}
				{/*<p className="text-white">Toby Bunn, Stephane Courtines, Mete Karabiyik, Fidhal Kotta, Ioanna Pierou, Marton Pohl, Onur*/}
				{/*	Zaifoglu</p>*/}
			</div>
			<img src="/images/ucl_logo.png" alt="UCL Logo" className="h-16 md:h-20"/>
		</div>
	);
}
