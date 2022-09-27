import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards";

import { getUser } from "./redux/cardsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./styles/App.module.scss";
import AddCard from "./pages/AddCard";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
		
	}, []);

	return (
		<Fragment>
			<div className={styles.container}>
				<Routes>
					<Route path="/" element={<Cards />} />
					<Route path="/add-card" element={<AddCard />} />
				</Routes>
			</div>
		</Fragment>
	);
}

export default App;
