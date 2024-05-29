"use client";

import React, { useEffect, useRef, useState } from "react";
import MinimalLayout from "@/app/layouts/minimalLayout";
import { useRouter } from "next/navigation";

export default function TwoFactorAuth() {
	const [inputs, setInputs] = useState(new Array(6).fill(""));
	const [status, setStatus] = useState({ error: false, success: false });
	const inputRefs = useRef(new Array(6).fill(null));
	const router = useRouter();

	useEffect(() => {
		inputRefs.current[0].focus();
	}, []);

	const handleInputChange = (index, event) => {
		const newInputs = [...inputs];
		newInputs[index] = event.target.value.slice(0, 1);
		setInputs(newInputs);

		if (index < 5 && event.target.value)
			inputRefs.current[index + 1].focus();
		 else if (index === 5) {
			if (newInputs.join("") === "202020") {
				setStatus({ error: false, success: true });
				setTimeout(() => {
					router.push("/demo/home");
				}, 600);
			} else {
				console.log("Incorrect 2FA code");
				setStatus({ error: true, success: false });
				setTimeout(() => setStatus({ error: false, success: false }), 750);
			}
		}
	};

	return (
		<MinimalLayout>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-2xl font-bold mb-4">Check your phone and enter the 2FA code</h1>
				<div className="flex space-x-2">
					{inputs.map((_, index) => (
						<input
							key={index}
							type="text"
							className={`w-20 h-20 text-center text-lg border-2 rounded ${
								status.error ? "border-red-500 animate-shake" :
									status.success ? "border-green-500" : "border-gray-300"
							}`}
							maxLength="1"
							ref={(el) => inputRefs.current[index] = el}
							value={inputs[index]}
							onChange={(e) => handleInputChange(index, e)}
							onKeyUp={(e) => {
								if (e.key === "Backspace" && !inputs[index] && index > 0)
									inputRefs.current[index - 1].focus();
							}}
						/>
					))}
				</div>
			</div>
		</MinimalLayout>
	);
}
