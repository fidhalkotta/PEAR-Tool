"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/app/layouts/mainLayout";
// Import your layout or other necessary components
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function NewJob() {
	// Using the new useSearchParams hook for handling URL search parameters
	const searchParams = useSearchParams();

	const [patientId, setPatientId] = useState("");
	const [sgBifurcation, setSgBifurcation] = useState("");
	const [iliacLimbSizing, setIliacLimbSizing] = useState("");
	const [proximalNeckDimension, setProximalNeckDimension] = useState(20);

	const [showTooltip, setShowTooltip] = useState(false);

	const handleTooltipVisibility = () => {
		setShowTooltip(!showTooltip);
	};

	useEffect(() => {
		if (!searchParams) return;
		// Set state from search parameters
		const patientIdParam = searchParams.get("patientId");
		const sgBifurcationParam = searchParams.get("sgBifurcation");
		const iliacLimbSizingParam = searchParams.get("iliacLimbSizing");

		if (patientIdParam) setPatientId(patientIdParam);
		if (sgBifurcationParam) setSgBifurcation(sgBifurcationParam);
		if (iliacLimbSizingParam) setIliacLimbSizing(iliacLimbSizingParam);
	}, [searchParams]);

	return (
		// Replace with your actual layout component if needed
		<MainLayout>
			<div>

				<div className="container mx-auto p-4">
					<div className="flex h-screen">
						<div className="w-1/2 mx-4">

							<h2 className="font-bold text-lg mb-4">Create Job</h2>
							{/* Patient and Procedure Information */}
							<div className="mb-4">
								<label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient
									ID</label>
								<input
									type="text"
									id="patientId"
									name="patientId"
									value={patientId}
									onChange={(e) => setPatientId(e.target.value)}
									className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"
									placeholder="Enter Patient ID"
								/>
							</div>

							{/* CT Scan Upload */}
							<div className="mb-4 relative">
								<label htmlFor="ctScan"
									   className="block text-sm font-medium text-gray-700 flex items-center">
									CT Scan Upload
									<span
										className="ml-1 inline-block text-gray-500 cursor-help"
										onMouseEnter={() => setShowTooltip(true)}
										onMouseLeave={() => setShowTooltip(false)}
										onTouchStart={handleTooltipVisibility}
									>
										<InformationCircleIcon className="h-5 w-5"/>
									</span>
								</label>
								{showTooltip && (
									<div
										className="absolute z-10 w-64 p-2 bg-white rounded-md shadow-lg text-sm text-gray-700 -mt-8 ml-6">
										Only select folders containing .dicom files
									</div>
								)}
								<input
									type="file"
									id="ctScan"
									name="ctScan"
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"
									directory="" webkitdirectory="" // Attributes to allow directory selection
								/>
							</div>

							<h3>Stent Graft Sizing</h3>

							{/* Stent Graft Bifurcation Specifications */}
							<div className="mb-4">
								<label htmlFor="sgBifurcation" className="block text-sm font-medium text-gray-700">Stent
									Bifurcation</label>
								<select
									id="sgBifurcation"
									name="sgBifurcation"
									value={sgBifurcation}
									onChange={(e) => setSgBifurcation(e.target.value)}
									className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
								>
									<option value="" disabled hidden>Choose SG Bifurcation</option>
									<option value="ETBF_25_13_C_124_E">ETBF 25 13 C 124 E</option>
									<option value="ETBF_25_13_C_145_E">ETBF 25 13 C 145 E</option>
									<option value="ETBF_28_13_C_124_E">ETBF 28 13 C 124 E</option>
									<option value="ETBF_28_13_C_145_E">ETBF 28 13 C 145 E</option>
									<option value="ETBF_32_16_C_124_E">ETBF 32 16 C 124 E</option>
									<option value="ETBF_32_16_C_145_E">ETBF 32 16 C 145 E</option>
									<option value="Other">Other</option>
								</select>
							</div>

							{/* Iliac Limb Sizing Specifications */}
							<div className="mb-4">
								<label htmlFor="iliacLimbSizing" className="block text-sm font-medium text-gray-700">Iliac
									Limb Sizing</label>
								<select
									id="iliacLimbSizing"
									name="iliacLimbSizing"
									value={iliacLimbSizing}
									onChange={(e) => setIliacLimbSizing(e.target.value)}
									className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
								>
									<option value="" disabled hidden>Select Iliac Limb Size</option>
									<option value="ETLW_16_13_C_124_E">ETLW 16 13 C 124 E</option>
									<option value="ETLW_16_13_C_156_E">ETLW 16 13 C 156 E</option>
									<option value="ETLW_16_16_C_124_E">ETLW 16 16 C 124 E</option>
									<option value="ETLW_16_16_C_156_E">ETLW 16 16 C 156 E</option>
									<option value="ETLW_16_20_C_124_E">ETLW 16 20 C 124 E</option>
									<option value="ETLW_16_20_C_156_E">ETLW 16 20 C 156 E</option>
									<option value="Other">Other</option>
								</select>
							</div>

							<h3>Positioning</h3>

							<div className="mb-4">
								<label htmlFor="positioning"
									   className="block text-sm font-medium text-gray-700">Proximal Neck
									Dimension</label>
								<input
									type="range"
									id="positioning"
									name="positioning"
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
									min="10"
									max="50"
									value={proximalNeckDimension}
									onChange={(e) => setProximalNeckDimension(e.target.value)}
								/>
								<div className="text-center text-sm font-medium text-gray-700 mt-2">
									{proximalNeckDimension} mm
								</div>
							</div>

							{/* Suggested Deployment Locations */}
							<div className="mb-4">
								<label htmlFor="deploymentLocation" className="block text-sm font-medium text-gray-700">Suggested
									Deployment Location</label>
								<input type="text" id="deploymentLocation" name="deploymentLocation"
									   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"
									   placeholder="Enter Deployment Location"/>
							</div>

							{/*/!* Simulation Settings *!/*/}
							{/*<div className="mb-4">*/}
							{/*	<label htmlFor="simulationSettings" className="block text-sm font-medium text-gray-700">Simulation*/}
							{/*		Settings</label>*/}
							{/*	/!* Additional inputs or dropdowns for FEA settings *!/*/}
							{/*</div>*/}

							<button
								type="submit"
								onClick={() => alert("Submitted to Job Queue")}
								className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
							>
								Submit to Job Queue
							</button>
						</div>
						<div className="w-1/2 mx-4">
							<h2 className="font-bold text-lg mb-4">Positioning 3D Viewer</h2>
							{/* Placeholder for 3D Viewer */}
							<div className="bg-gray-200 h-full flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-24 w-24 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

			</div>

		</MainLayout>

	);
}
