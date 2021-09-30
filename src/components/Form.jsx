import React from "react";
import { ReactComponent as Mangadex } from "../assets/mangadex.svg";
import { container, square } from "../styles/form.module.css";

function Form() {
	async function loginHandler(e) {
		e.preventDefault();

		const data = {
			username: e.target.username.value,
			email: e.target.username.value,
			password: e.target.password.value,
		};

		const login = await fetch(`/api/auth/login`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const authData = await login.json();
		console.log(authData);
	}

	return (
		<div className={container}>
			<div className={square}>
				<Mangadex />
				<form onSubmit={loginHandler}>
					<label htmlFor="username">Username : </label>
					<input type="text" name="username" id="username" />
					<label htmlFor="password">Password : </label>
					<input type="password" name="password" id="password" />
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}

export default Form;
