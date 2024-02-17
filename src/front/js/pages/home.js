import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import SignUp from "../component/SignUp";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div >
		<SignUp/>
		</div>
	);
};
