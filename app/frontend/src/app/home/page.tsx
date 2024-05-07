"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/app/layouts/mainLayout";
import { Progress } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const router = useRouter();

	const [selectedJob, setSelectedJob] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	// State for managing tooltip visibility
	const [showTooltip, setShowTooltip] = useState(false);
	const [showFinishedJobsTooltip, setShowFinishedJobsTooltip] = useState(false);

	const [patientId, setPatientId] = useState("");
	const [patientName, setPatientName] = useState("");
	const [sgBifurcation, setSgBifurcation] = useState("");
	const [iliacLimbSizing, setIliacLimbSizing] = useState("");

	// Function to handle the navigation with form values
	const handleContinueJobSetup = (event) => {
		event.preventDefault();

		router.push("/jobs/new?patientId=" + patientId +
			"&sgBifurcation=" + sgBifurcation +
			"&iliacLimbSizing=" + iliacLimbSizing +
			"&patientName=" + patientName
		);
	};

	const [jobs] = useState([
		// { id: "#47681", name: "<Redacted>", progress: 63 },
		// { id: "#19025", name: "<Redacted>", progress: 13 },
		// { id: "#72211", name: "<Redacted>", progress: 41 },
		// { id: "#67102", name: "<Redacted>", progress: 89 },
		// { id: "#90157", name: "<Redacted>", progress: 27 }
		{ id: "#47681", name: "John Stevenson", progress: 63 },
		{ id: "#19025", name: "Mark Brian", progress: 13 },
		{ id: "#72211", name: "Steve Courtney", progress: 41 },
		{ id: "#67102", name: "Hamza Den", progress: 89 },
		{ id: "#90157", name: "Marko Polo", progress: 27 }
		// ... other jobs
	]);

	const [finishedJobs] = useState([
		{
			id: "job-000",
			name: "EVAR Procedure #72211",
			dateCompleted: "2024-05-07",
			outcome: "Successful, minor post-op observation required",
			followUp: "Follow-up in 1 month for observation"
		},
		{
			id: "job-001",
			name: "EVAR Procedure #17820",
			dateCompleted: "2023-01-15",
			outcome: "Successful, no complications",
			followUp: "Routine follow-up in 6 months"
		},
		{
			id: "job-002",
			name: "EVAR Procedure #62813",
			dateCompleted: "2023-02-20",
			outcome: "Successful, minor post-op observation required",
			followUp: "Follow-up in 1 month for observation"
		}
		// ... more jobs
	]);

	const openModal = (job) => {
		console.log("openModal", job);
		setSelectedJob(job);
		setIsModalOpen(true);
	};

	const getColor = (progress) => {
		if (progress >= 75) return "blue";
		if (progress >= 50) return "green";
		if (progress >= 25) return "yellow";
		return "red";
	};

	return (
		<MainLayout>
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Create Job</h2>
						<div className="container mx-auto p-4">

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

							{/*/!* CT Scan Upload *!/*/}
							{/*<div className="mb-4 relative">*/}
							{/*	<label htmlFor="ctScan"*/}
							{/*		   className="block text-sm font-medium text-gray-700 flex items-center">*/}
							{/*		CT Scan Upload*/}
							{/*		<span*/}
							{/*			className="ml-1 inline-block text-gray-500 cursor-help"*/}
							{/*			onMouseEnter={() => setShowTooltip(true)}*/}
							{/*			onMouseLeave={() => setShowTooltip(false)}*/}
							{/*			onTouchStart={handleTooltipVisibility}*/}
							{/*		>*/}
							{/*			<InformationCircleIcon className="h-5 w-5"/>*/}
							{/*		</span>*/}
							{/*	</label>*/}
							{/*	{showTooltip && (*/}
							{/*		<div*/}
							{/*			className="absolute z-10 w-64 p-2 bg-white rounded-md shadow-lg text-sm text-gray-700 -mt-8 ml-6">*/}
							{/*			Only select folders containing .dicom files*/}
							{/*		</div>*/}
							{/*	)}*/}
							{/*	<input*/}
							{/*		type="file"*/}
							{/*		id="ctScan"*/}
							{/*		name="ctScan"*/}
							{/*		className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"*/}
							{/*		directory="" webkitdirectory="" // Attributes to allow directory selection*/}
							{/*	/>*/}
							{/*</div>*/}

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

							{/*/!* Suggested Deployment Locations *!/*/}
							{/*<div className="mb-4">*/}
							{/*	<label htmlFor="deploymentLocation" className="block text-sm font-medium text-gray-700">Suggested*/}
							{/*		Deployment Location</label>*/}
							{/*	<input type="text" id="deploymentLocation" name="deploymentLocation"*/}
							{/*		   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"*/}
							{/*		   placeholder="Enter Deployment Location"/>*/}
							{/*</div>*/}

							{/*/!* Simulation Settings *!/*/}
							{/*<div className="mb-4">*/}
							{/*	<label htmlFor="simulationSettings" className="block text-sm font-medium text-gray-700">Simulation*/}
							{/*		Settings</label>*/}
							{/*	/!* Additional inputs or dropdowns for FEA settings *!/*/}
							{/*</div>*/}

							<button
								type="submit"
								onClick={handleContinueJobSetup}
								className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
							>
								Continue Job Setup
							</button>
						</div>
					</div>

					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Current Job Progress</h2>

						<div className="container mx-auto p-4 content-between">
							<div id="jobList">
								{jobs.map(job => (
									<div key={job.id} className="flex justify-between items-center mb-4 py-3 px-2
									 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-nhs-light-blue"
										 onClick={() => openModal(job)}>
										<span className="text-sm font-medium">{job.id} {job.name}</span>
										<div className="w-8/12">
											<Progress progress={job.progress} size="lg" color={getColor(job.progress)}/>
										</div>
										<span>{job.progress}%</span>
									</div>
								))}
							</div>

							<button id="viewMore"
								className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-[35px]">View
								More
							</button>
						</div>

						{isModalOpen && (
							<div id="myModal" className="modal">
								<div className="modal-content">
									<span className="close text-lg" onClick={() => setIsModalOpen(false)}>&times;</span>
									<h3 id="modalTitle"
										className="text-lg font-semibold">{selectedJob?.id} {selectedJob?.name}</h3>
									<p id="modalDescription" className="mt-4">
										Patient ID: P-1234567 <br/>
										Stent Bifurcation: ETBF 25 13 C 124 E <br/>
										Iliac Limb Sizing: ETLW 16 16 C 124 E
									</p>
									<p id="modalJobDetails" className="mt-4">
										Latest update: <br/>
										<span className="text-gray-600 italic">2024-05-07 15:12:06 : Completed meshing of aortic tissue and stent-graft</span>
									</p>
									<p id="modelETA" className="mt-4">
										ETA: 13 hours
									</p>
								</div>
							</div>
						)}
					</div>

					{/*/!* Card 3: Finished Jobs *!/*/}
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md relative">
						<h2 className="font-bold text-lg mb-2 flex items-center justify-between">
							Finished Jobs
							<span
								className="inline-block text-gray-500 cursor-help"
								onMouseEnter={() => setShowFinishedJobsTooltip(true)}
								onMouseLeave={() => setShowFinishedJobsTooltip(false)}
								onTouchStart={() => setShowFinishedJobsTooltip(!showFinishedJobsTooltip)}
							>
								<InformationCircleIcon className="h-5 w-5"/>
							</span>
						</h2>
						{showFinishedJobsTooltip && (
							<div
								className="absolute z-10 w-96 p-4 bg-gray-200 rounded-lg shadow-lg text-sm text-gray-700 right-0 mr-4">
								<ul className="list-disc space-y-2 ml-4">
									<li><b>Unsuccessful</b></li>
									<li><b>Successful, regular post-op observation required</b></li>
									<li><b>Successful, no complications</b> means that at no point in the aortic tissue
										or
										stent-graft did the stresses/displacements exceed a conservative safety factor,
									</li>
									<li><b>Successful, minor post-op observation required</b> means that
										stresses/displacements are within x% of the safety factor resulting in this
										recommendation.
									</li>
								</ul>
							</div>
						)}
						<div className="overflow-auto px-4">
							{finishedJobs.slice(0, 2).map(job => (
								<div key={job.id}
									 className="mb-4 p-2 border border-gray-300 rounded-md  cursor-pointer hover:border-nhs-light-blue"
									onClick={() => {
										// router.push(`/jobs/${job.id}`);
										router.push("/jobs/72211");
									}}>
									<h3 className="text-md font-medium">{job.name}</h3>
									<p className="text-sm mb-1"><strong>Date Completed:</strong> {job.dateCompleted}</p>
									<p className="text-sm mb-1"><strong>Outcome:</strong> {job.outcome}</p>
									<p className="text-sm"><strong>Follow-up Notes:</strong> {job.followUp}</p>
								</div>
							))}
							<button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2">View
								More
							</button>
						</div>
					</div>

					{/* Card 4: Insights */}
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Latest Insights</h2>
						<div className="px-4">
							<div className="flex flex-col md:flex-row">
								<div className="flex-1 text-sm mr-4 mb-2 md:mb-0">
									<h3 className="text-md font-semibold mb-2">EVAR Procedure Analysis - Job #72211</h3>

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

								<img src="jobs/72211/1.png"
									 className="md:w-2/5 w-full h-auto self-center"/>
							</div>

							<button
								className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 mt-[31px]"
								onClick={() => router.push("/jobs/72211")}
							>
								More Detail
							</button>
						</div>
					</div>

				</div>
			</div>
		</MainLayout>
	);
}
