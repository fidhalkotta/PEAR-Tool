"use client";

import React, { useRef, useState } from "react";
import MainLayout from "@/app/layouts/mainLayout";
import ResultsCarousel from "@/components/ResultsCarousel";

export default function JobInsights() {
	const [images, setImages] = useState([
		"./72211/1.png",
		"./72211/2.png",
		"./72211/3.png",
		"./72211/4.png",
		"./72211/5.png",
		"./72211/6.png",
		"./72211/7.png"
	]);

	const [patientId, setPatientId] = useState("P-6235");
	const [patientName, setPatientName] = useState("Steven Courtney");
	const [uploadedCTScan, setUploadedCTScan] = useState("CT_Scan_2021_09_01.zip");
	const [sgBifurcation, setSgBifurcation] = useState("ETBF 28 13 C 124 E");
	const [iliacLimbSizing, setIliacLimbSizing] = useState("ETLW 16 16 C 124 E");
	const [proximalNeckDimension, setProximalNeckDimension] = useState(20);

	const [jobId, setJobId] = useState("#72211");

	const positionInputRef = useRef(null);

	const [fileUploaded, setFileUploaded] = useState(false);
	const [viewerLabel, setViewerLabel] = useState("Positioning 3D Viewer");
	const [loading, setLoading] = useState(false);

	return (
		<MainLayout>
			<div>

				<div className="container mx-auto p-4">
					<div className="flex flex-col md:flex-row h-screen">
						<div className="w-full md:w-1/2 mx-0 md:mx-0 mb-4 md:mb-0">

							<div>
								<h2 className="font-bold text-lg mb-4">Job ID: {jobId}</h2>

								{/* Patient Name */}
								<div className="mb-3">
									<label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient
										Name</label>
									<p className="block w-full font-sm">{patientName}</p>
								</div>

								{/* Patient and Procedure Information */}
								<div className="mb-3">
									<label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient
										ID</label>
									<p className="block w-full text-sm">{patientId}</p>
								</div>

								{/* CT Scan Upload */}
								<div className="mb-3 relative">
									<label htmlFor="ctScan"
										   className="block text-sm font-medium text-gray-700 flex items-center">
										Uploaded CT Scan File Name
									</label>
									<p className="block w-full text-sm">{uploadedCTScan}</p>
								</div>

								{/* Stent Graft Bifurcation Specifications */}
								<div className="mb-3">
									<label htmlFor="sgBifurcation" className="block text-sm font-medium text-gray-700">Stent
										Bifurcation</label>
									<p className="block w-full text-sm">{sgBifurcation}</p>
								</div>

								{/* Iliac Limb Sizing Specifications */}
								<div className="mb-3">
									<label htmlFor="iliacLimbSizing"
										   className="block text-sm font-medium text-gray-700">Iliac
										Limb Sizing</label>
									<p className="block w-full text-sm">{iliacLimbSizing}</p>
								</div>

								<div className="mb-3">
									<label htmlFor="positioning" className="block text-sm font-medium text-gray-700">Proximal
										Neck Dimension</label>
									<p className="block w-full text-sm">{proximalNeckDimension}mm</p>
								</div>
							</div>

							<hr></hr>

							<div className="mb-4 pb-4">
								<h2 className="font-bold text-lg mb-4">Insights</h2>

								<h3 className="mb-1">Within Green Landing Zones</h3>

								<div className="mb-4">
									<label htmlFor="aorticDilation" className="block text-sm font-medium text-gray-700">Maximum Aortic Neck Dilatation</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">🟠 7%</p>
								</div>

								<div className="mb-4">
									<label htmlFor="ifuViolations" className="block text-sm font-medium text-gray-700">IFU Violations</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">🟢 0 Violations</p>
								</div>

								<div className="mb-4">
									<label htmlFor="endoleakRisk" className="block text-sm font-medium text-gray-700">Endoleak Risk</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">🟢 Low Risk of Endoleaks within 6 months</p>
								</div>

								<h3 className="mb-1">Parameters of Interest</h3>

								<div className="mb-4">
									<label htmlFor="maxDisplacementForceAtNeck" className="block text-sm font-medium text-gray-700">Max Displacement Force at Neck</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">🟢 Does not exceed Safety Factor of 10</p>
								</div>

								<div className="mb-4">
									<label htmlFor="maxResistanceLocations" className="block text-sm font-medium text-gray-700">Max Resistance Locations</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">[0, -400], [25, -425], [-80, -330]</p>
								</div>

								<div className="mb-4">
									<label htmlFor="maxAortaDisplacement" className="block text-sm font-medium text-gray-700">Max Aorta Displacement</label>
									<p className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none">6.7mm at [-25, -440]</p>
								</div>
							</div>

						</div>
						<div className="w-full md:w-1/2 mx-4">
							<h2 className="font-bold text-lg mb-4">Imaging Results</h2>
							<ResultsCarousel images={images} />

							<hr/>

							<h2 className="font-bold text-lg my-4">Landing Zone Legend</h2>

							<div className="mb-4">
								<label htmlFor="landingZoneLegendGreen" className="block text-sm font-medium text-gray-700">Green</label>
								<p className="mt-1 p-2 block w-full border border-green-500 rounded-md shadow-sm focus:outline-none">Minimal angulation, resistance and displacement for this SG configuration.</p>
							</div>

							<div className="mb-4">
								<label htmlFor="landingZoneLegendOrange" className="block text-sm font-medium text-gray-700">Orange</label>
								<p className="mt-1 p-2 block w-full border border-orange-400 rounded-md shadow-sm focus:outline-none">Acceptable angulation, resistance and displacement for this SG configuration.</p>
							</div>

							<div className="mb-4">
								<label htmlFor="landingZoneLegendRed" className="block text-sm font-medium text-gray-700">Red</label>
								<p className="mt-1 p-2 block w-full border border-red-700 rounded-md shadow-sm focus:outline-none">Not acceptable angulation, resistance and displacement for this SG configuration. Incompatible geometry.</p>
							</div>
						</div>
					</div>
				</div>

			</div>

		</MainLayout>

	);
}
