import React from "react";
import classes from "../styles/Tag.module.css";

function Tag({ name }) {
	return (
		<div className={classes.container}>
			<p>{name}</p>
		</div>
	);
}

export default Tag;
