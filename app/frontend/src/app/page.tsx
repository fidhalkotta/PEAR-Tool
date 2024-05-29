// src/app/page.tsx
import React from "react";
import MinimalLayout from "@/app/layouts/minimalLayout";
import PosterHeader from "@/components/PosterHeader";
import PosterFooter from "@/components/PosterFooter";
import HeroVideo from "@/components/HeroVideo";
import CardSection from "@/components/CardSection";

export default function Default() {
	return (
		<MinimalLayout>
			<PosterHeader/>
			<div className="flex mt-[116px] sm:mt-[98px] md:mt-[80px]">
				<div className="hidden md:block">
					<HeroVideo/>
				</div>
				<CardSection/>
			</div>
			{/*<div className="mt-8">*/}
			{/*	<Link href="/demo"*/}
			{/*		  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">*/}
			{/*		Go to Demo*/}
			{/*	</Link>*/}
			{/*</div>*/}
			<PosterFooter/>
		</MinimalLayout>
	);
}
