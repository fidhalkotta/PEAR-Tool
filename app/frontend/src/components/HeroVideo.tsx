// src/components/HeroVideo.tsx
import React from "react";

export default function HeroVideo() {
	return (
		<div className="sticky h-[calc(100vh-10rem)] bg-black">
			<video className="h-full w-full object-cover rounded" autoPlay loop muted>
				<source src="/videos/spinning_aorta.mp4" type="video/mp4"/>
				Your browser does not support the video tag.
			</video>
		</div>
	);
}
