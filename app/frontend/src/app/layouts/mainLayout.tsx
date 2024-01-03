import React from "react";
import BaseLayout from "./baseLayout";
import NavigationBar from "@/components/NavigationBar";

export default function MainLayout({ children }) {
	return (
		<BaseLayout>
			<NavigationBar/>
			{children}
		</BaseLayout>
	);
}
