import React from "react";
import { StlViewer } from "react-stl-viewer";

const style = {
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh"
};

export default function File3DViewer() {
	return (
		<StlViewer
			style={style}
			orbitControls
			shadows
			url="./aorta.stl"
		/>
	);
}
