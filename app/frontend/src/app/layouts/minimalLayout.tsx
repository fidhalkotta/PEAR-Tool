import React from "react";
import BaseLayout from "./baseLayout";

export default function MinimalLayout({ children }) {
	return (
		<BaseLayout>
			{children}
		</BaseLayout>
	);
}
