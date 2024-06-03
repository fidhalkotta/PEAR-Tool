"use client";

import React, { useState } from "react";
import MinimalLayout from "@/app/layouts/minimalLayout";
import { useRouter } from "next/navigation";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = () => {
		router.push("/demo/login/2fa");
		// if (username === "fidhal@peartool.com" && password === "password123")
		// 	router.push("/demo/login/2fa");
		// else
		// 	alert("Incorrect username or password");
	};

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
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
						   className="border-2 border-gray-300 rounded-md p-2 mb-4"
						   placeholder="Enter Anything for Demo"
					/>
					<p className="mb-2">Password</p>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
						   className="border-2 border-gray-300 rounded-md p-2 mb-4"
						   placeholder="Enter Anything for Demo"
					/>
					<button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded text-center">Login
					</button>
					<div className="flex items-center my-2">
						<div className="border-t-2 border-gray-300 flex-grow"></div>
						<div className="mx-4">or</div>
						<div className="border-t-2 border-gray-300 flex-grow"></div>
					</div>
					<a href="/demo/home" className="bg-nhs-blue text-white px-4 py-2 rounded text-center">Login with
						NHS</a>
				</div>
			</div>
		</MinimalLayout>
	);
}

