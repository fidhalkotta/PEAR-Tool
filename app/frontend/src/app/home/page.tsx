"use client";

import React, { useState } from "react";
import MainLayout from "@/app/layouts/mainLayout";
import { Progress } from "flowbite-react";

export default function Home() {
	const [selectedJob, setSelectedJob] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [jobs] = useState([
		{ id: "#47681", name: "<Redacted>", progress: 63 },
		{ id: "#19025", name: "<Redacted>", progress: 13 },
		{ id: "#72211", name: "<Redacted>", progress: 41 },
		{ id: "#67102", name: "<Redacted>", progress: 89 },
		{ id: "#90157", name: "<Redacted>", progress: 27 }
		// { id: "#47681", name: "John Stevenson", progress: 63 },
		// { id: "#19025", name: "Mark Brian", progress: 13 },
		// { id: "#72211", name: "Olivia Carey", progress: 41 },
		// { id: "#67102", name: "Hamza Den", progress: 89 }q
		// ... other jobs
	]);

	const [finishedJobs] = useState([
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
		},
		{
			id: "job-003",
			name: "EVAR Procedure 3",
			dateCompleted: "2023-03-05",
			outcome: "Complications encountered, additional intervention needed",
			followUp: "Immediate follow-up required, schedule additional procedure"
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
							{/* Patient and Procedure Information */}
							<div className="mb-4">
								<label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID</label>
								<input type="text" id="patientId" name="patientId" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Enter Patient ID" />
							</div>

							{/* CT Scan Upload */}
							<div className="mb-4">
								<label htmlFor="ctScan" className="block text-sm font-medium text-gray-700">CT Scan Upload</label>
								<input type="file" id="ctScan" name="ctScan" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" />
							</div>

							{/* Stent Graft Specifications */}
							<div className="mb-4">
								<label htmlFor="sgSize" className="block text-sm font-medium text-gray-700">Stent Graft Size</label>
								<input type="text" id="sgSize" name="sgSize" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Enter SG Size" />
							</div>

							{/* Suggested Deployment Locations */}
							<div className="mb-4">
								<label htmlFor="deploymentLocation" className="block text-sm font-medium text-gray-700">Suggested Deployment Location</label>
								<input type="text" id="deploymentLocation" name="deploymentLocation" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" placeholder="Enter Deployment Location" />
							</div>

							{/* Simulation Settings */}
							<div className="mb-4">
								<label htmlFor="simulationSettings" className="block text-sm font-medium text-gray-700">Simulation Settings</label>
								{/* Additional inputs or dropdowns for FEA settings */}
							</div>

							<button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Start Simulation</button>
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
										<span className="text-sm font-medium">{job.id}</span>
										<div className="w-8/12">
											<Progress progress={job.progress} size="lg" color={getColor(job.progress)} />
										</div>
										<span>{job.progress}%</span>
									</div>
								))}
							</div>

							<button id="viewMore" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-[35px]">View More</button>
						</div>

						{isModalOpen && (
							<div id="myModal" className="modal">
								<div className="modal-content">
									<span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
									<h3 id="modalTitle" className="text-lg font-bold">{selectedJob?.id} {selectedJob?.name}</h3>
									<p id="modalDescription" className="mt-4">Description about this job, medical notes and things to remember</p>
									<h4 className="mt-4 font-bold">Uploaded Files</h4>
									<ul id="modalFiles">
										<li>File1.jpg</li>
										<li>AortaCloseup.png</li>
									</ul>
								</div>
							</div>
						)}
					</div>

					{/* Card 3: Finished Jobs */}
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Finished Jobs</h2>
						<div className="overflow-auto px-4">
							{finishedJobs.slice(0, 2).map(job => (
								<div key={job.id} className="mb-4 p-2 border border-gray-300 rounded-md  cursor-pointer hover:border-nhs-light-blue">
									<h3 className="text-md font-medium">{job.name}</h3>
									<p className="text-sm mb-1"><strong>Date Completed:</strong> {job.dateCompleted}</p>
									<p className="text-sm mb-1"><strong>Outcome:</strong> {job.outcome}</p>
									<p className="text-sm"><strong>Follow-up Notes:</strong> {job.followUp}</p>
								</div>
							))}
							<button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2">View More</button>
						</div>
					</div>

					{/* Card 4: Insights */}
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Latest Insights</h2>
						<div className="px-4">
							<div className="flex flex-col md:flex-row">
								<div className="flex-1 text-sm mb-4 md:mb-0">
									<h3 className="text-md font-semibold mb-2">EVAR Procedure Analysis - Job #17820</h3>

									{/* Job and Patient Information */}
									<div className="mb-4">
										<h4 className="font-semibold mb-1">Job Details:</h4>
										<p><strong>Stent Size:</strong> 28mm x 120mm</p>
										<p><strong>Patient Aortic Diameter:</strong> 32mm</p>
									</div>

									{/* Stress and Strain Insights */}
									<div className="mb-4">
										<h4 className="font-semibold mb-1">Mechanical Insights:</h4>
										<p><strong>Max Stress Location:</strong> Anterior aortic wall</p>
										<p><strong>Max Stress Value:</strong> 450 Pa</p>
										<p><strong>Max Strain Location:</strong> Proximal neck of aneurysm</p>
										<p><strong>Max Strain Value:</strong> 6.5%</p>
										{/* Additional mechanical insights */}
									</div>

									{/* Other insights, if necessary */}
								</div>
								<img src="images/AAA-ct-scan.png" alt="Aorta" className="md:w-1/3 w-full h-auto self-center" />
							</div>

							<button className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 mt-[31px]">More Detail</button>
						</div>
					</div>

				</div>
			</div>
		</MainLayout>
	);
}
