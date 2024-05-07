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

	const [patientId, setPatientId] = useState("P-1234567");
	const [patientName, setPatientName] = useState("Steven Luke Courtney");
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
					<div className="flex h-screen">
						<div className="w-1/2 mx-4">

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

							<div>
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
							</div>

						</div>
						<div className="w-1/2 mx-4">
							<h2 className="font-bold text-lg mb-4">Imaging Results</h2>
							<ResultsCarousel images={images} />
						</div>
					</div>
				</div>

			</div>

		</MainLayout>

	);
}
