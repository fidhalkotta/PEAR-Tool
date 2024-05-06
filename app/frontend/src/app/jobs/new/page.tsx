"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/app/layouts/mainLayout";
// Import your layout or other necessary components
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import File3DViewer from "@/components/File3DViewer";

export default function NewJob() {
	// Using the new useSearchParams hook for handling URL search parameters
	const searchParams = useSearchParams();

	const [patientId, setPatientId] = useState("");
	const [patientName, setPatientName] = useState("");
	const [sgBifurcation, setSgBifurcation] = useState("");
	const [iliacLimbSizing, setIliacLimbSizing] = useState("");
	const [proximalNeckDimension, setProximalNeckDimension] = useState(20);
	const positionInputRef = useRef(null);

	const [fileUploaded, setFileUploaded] = useState(false);
	const [viewerLabel, setViewerLabel] = useState("Positioning 3D Viewer");
	const [loading, setLoading] = useState(false);

	const [showTooltip, setShowTooltip] = useState(false);

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const handleTooltipVisibility = () => {
		setShowTooltip(!showTooltip);
	};

	const handleFileUpload = (event) => {
		if (event.target.files.length > 0) {
			setFileUploaded(false);
			setLoading(true);
			setViewerLabel("Processing CT Scans...");

			setTimeout(() => {
				setLoading(false);
				setFileUploaded(true);
				setViewerLabel("Positioning 3D Viewer");

				setShowSuggestions(true);
				setSuggestions([
					{ size: "ETBF 28 13 C 145 E", description: "Optimal fit for patient anatomy and cost-effective", cost: "£300", stock: 15 },
					{ size: "ETBF 28 13 C 124 E", description: "Good alternative, slightly more expensive", cost: "£350", stock: 10 },
					{ size: "ETBF 32 16 C 124 E", description: "Larger size, used only if necessary due to cost", cost: "£400", stock: 5 }
				]);
			}, 5000); // Delay for 5 seconds
		}
	};

	useEffect(() => {
		if (!searchParams) return;
		// Set state from search parameters
		const patientIdParam = searchParams.get("patientId");
		const patientNameParam = searchParams.get("patientName");
		const sgBifurcationParam = searchParams.get("sgBifurcation");
		const iliacLimbSizingParam = searchParams.get("iliacLimbSizing");

		if (patientIdParam) setPatientId(patientIdParam);
		if (patientNameParam) setPatientName(patientNameParam);
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

							{/* Patient Name */}
							<div className="mb-4">
								<label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
								<input
									type="text"
									id="patientName"
									name="patientName"
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"
									placeholder="Enter Patient Name"
								/>
							</div>

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
									directory="" webkitdirectory=""
									onChange={handleFileUpload}
								/>
							</div>

							{/* Virtual Assistant Output */}
							{showSuggestions && (
								<div>
									<h3 className="">Suggested Stent Graft Sizes</h3>
									<p className="text-sm font-medium text-gray-700">Based on the uploaded CT scan, and <Link href="/inventory"><span className="underline">available inventory</span></Link>, these are the suggestions:</p>
									<table className="min-w-full divide-y divide-gray-200 mt-4">
										<thead className="bg-gray-50">
											<tr>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{suggestions.map((suggestion, index) => (
												<tr key={index}>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{suggestion.size}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.cost}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.stock}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suggestion.description}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}

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
									<option value="ETBF_28_13_C_124_E">ETBF 28 13 C 124 E ⭐</option>
									<option value="ETBF_28_13_C_145_E">ETBF 28 13 C 145 E ⭐</option>
									<option value="ETBF_32_16_C_124_E">ETBF 32 16 C 124 E ⭐</option>
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
								<label htmlFor="positioning" className="block text-sm font-medium text-gray-700">Proximal Neck Dimension</label>
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
								<div className="flex justify-center items-center mt-2">
									<input
										ref={positionInputRef}
										type="text"
										value={proximalNeckDimension}
										onChange={(e) => setProximalNeckDimension(e.target.value)}
										className="w-16 text-center text-sm font-medium text-gray-700 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
										onFocus={(e) => e.target.select()}
									/>
									<span className="text-sm text-gray-500 ml-2">mm</span>
								</div>
							</div>

							<button
								type="submit"
								onClick={() => alert("Submitted to Job Queue with Job ID:   #72211")}
								className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
							>
								Submit to Job Queue
							</button>
						</div>
						<div className="w-1/2 mx-4">
							<h2 className="font-bold text-lg mb-4">{viewerLabel} {loading && <span className="animate-spin">🔄</span>}</h2>
							<div className="bg-gray-200 h-full flex justify-center items-center">
								{fileUploaded ? <File3DViewer/> : (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
									</svg>
								)}
							</div>
						</div>
					</div>
				</div>

			</div>

		</MainLayout>

	);
}
