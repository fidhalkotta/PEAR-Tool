"use client";

import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileDropzone() {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<>
			<div className="flex flex-col justify-center items-center pb-4">
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-lg text-center">
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
						<p>Drag or drop some files here, or click to select files</p>
					</div>
				</div>
			</div>
			<div>
				<h4 className={"font-bold"}>Files</h4>
				<ul>{files}</ul>
			</div>
		</>

	);
}

// <section className="">
//         <p className="text-gray-500">UPLOAD FILE HERE</p>
//         <input type="file" className="mt-4"/>
//     </div>
// </section>
