import React from "react";

export default function Login() {
	return (
		<div className="container py-48 px-48">
			<div className="mb-8">

				<h1 className="text-xl font-bold hover:text-teal-500 duration-150">PEAR-Tool</h1>
				<h2 className="text-lg font-semibold mb-2">Login</h2>
				<p>Enter your credentials to login.</p>
			</div>
			<form className="flex flex-col">
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" className="border-2 border-gray-300 rounded-md p-2 mb-4" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" className="border-2 border-gray-300 rounded-md p-2 mb-4" />
				<button type="submit" className="bg-black text-white px-4 py-2 rounded">Login</button>
			</form>
		</div>

	);
}

