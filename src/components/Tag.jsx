import React from "react";
import { container } from "../styles/tag.module.css";
function Tag({ name }) {
	return (
		<div className={container}>
			<p>{name}</p>
		</div>
	);
}

export default Tag;
