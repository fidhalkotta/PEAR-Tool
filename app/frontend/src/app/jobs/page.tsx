"use client";

import React, { useState } from "react";
import { Progress } from "flowbite-react";

const CurrentJobsDashboard = () => {
	const [jobs] = useState([
		{ id: "#47681", name: "John Stevenson", progress: 63 },
		{ id: "#19025", name: "Mark Brian", progress: 13 },
		{ id: "#72211", name: "Olivia Carey", progress: 41 },
		{ id: "#67102", name: "Hamza Den", progress: 89 }
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
		<div className="">
			<div className="container mx-auto p-4">
				<div className="bg-white shadow-md rounded p-6">
					<h2 className="text-xl font-bold mb-4">Current Jobs</h2>
					<div id="jobList">
						{jobs.map(job => (
							<div key={job.id} className="flex justify-between items-center
								mb-4 py-3 px-2 border-2 border-gray-300 rounded-md
								hover:bg-gray-200 cursor-pointer"
								 onClick={() => openModal(job)}>
								<span className="font-bold">{job.id} - {job.name}</span>
								<div className="w-1/2 justify-stretch">
									<Progress
										progress={job.progress}
										size="lg"
										color={getColor(job.progress)}
									/>
								</div>

								<span>{job.progress}%</span>
							</div>
						))}

					</div>

					<button id="viewMore" className="bg-black text-white px-4 py-2 rounded mt-4">View More</button>
				</div>
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
	);
};

export default CurrentJobsDashboard;
