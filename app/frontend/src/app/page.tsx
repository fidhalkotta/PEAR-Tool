// src/app/page.tsx
import React from "react";
import MinimalLayout from "@/app/layouts/minimalLayout";
import PosterHeader from "@/components/PosterHeader";
import PosterFooter from "@/components/PosterFooter";
import HeroVideo from "@/components/HeroVideo";
import CardSection from "@/components/CardSection";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Default() {
	return (
		<MinimalLayout>
			<PosterHeader/>
			<div className="flex flex-col md:flex-row mt-[116px] sm:mt-[98px] md:mt-[80px]">
				<HeroVideo/>
				<CardSection/>
			</div>
			<PosterFooter/>
			<div className="md:hidden">
				<ScrollIndicator/>
			</div>
		</MinimalLayout>
	);
}
