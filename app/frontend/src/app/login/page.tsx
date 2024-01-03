import React from "react";
import MinimalLayout from "@/app/layouts/minimalLayout";

export default function Login() {
	return (
		<MinimalLayout>
			<div className="flex flex-col lg:mx-64 md:m-32 sm:m-24 m-16">
				<div className="mb-6">
					<h1 className="text-xl font-bold hover:text-teal-500 duration-150">PEAR-Tool</h1>
					<h2 className="text-lg font-semibold mb-2">Login</h2>
					<p>Enter your credentials to login.</p>
				</div>
				<div className="flex flex-col">
					<p className="mb-2">Username</p>
					<input type="text" id="username" name="username" className="border-2 border-gray-300 rounded-md p-2 mb-4" />
					<p className="mb-2">Password</p>
					<input type="password" id="password" name="password" className="border-2 border-gray-300 rounded-md p-2 mb-4" />
					<a href="/home" className="bg-black text-white px-4 py-2 rounded text-center">Login</a>

					<div className="flex items-center my-2">
						<div className="border-t-2 border-gray-300 flex-grow"></div>
						<div className="mx-4">or</div>
						<div className="border-t-2 border-gray-300 flex-grow"></div>
					</div>
					<a href="/home" className="bg-nhs-blue text-white px-4 py-2 rounded text-center">Login with NHS</a>
				</div>

			</div>
		</MinimalLayout>

	);
}

