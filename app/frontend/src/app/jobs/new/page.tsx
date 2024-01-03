import React from "react";

// import NavigationBar from "@/components/NavigationBar";
import FileDropzone from "@/components/FileDropzone";
import MainLayout from "@/app/layouts/mainLayout";

export default function NewJob() {
	return (
		<MainLayout>
			<div className="container p-4">
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-2">Start New Job</h2>
					<p>Upload a CT Scan to get started with a new Processing Job.</p>
				</div>
				<FileDropzone/>
			</div>
		</MainLayout>

	);
}

