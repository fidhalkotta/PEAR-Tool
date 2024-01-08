"use client";

import React, { useState } from "react";
import MainLayout from "@/app/layouts/mainLayout";
import { Progress } from "flowbite-react";

export default function Home() {
	const [jobs] = useState([
		{ id: "#47681", name: "<Redacted>", progress: 63 },
		{ id: "#19025", name: "<Redacted>", progress: 13 },
		{ id: "#72211", name: "<Redacted>", progress: 41 },
		{ id: "#67102", name: "<Redacted>", progress: 89 }
		// { id: "#47681", name: "John Stevenson", progress: 63 },
		// { id: "#19025", name: "Mark Brian", progress: 13 },
		// { id: "#72211", name: "Olivia Carey", progress: 41 },
		// { id: "#67102", name: "Hamza Den", progress: 89 }q
		// ... other jobs
	]);
	const [selectedJob, setSelectedJob] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

							<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Start Simulation</button>
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

							<button id="viewMore" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4">View More</button>
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
						{/* More content here */}
					</div>

					{/* Card 4: Insights */}
					<div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
						<h2 className="font-bold text-lg mb-2">Latest Insights</h2>
						{/* More content here */}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
