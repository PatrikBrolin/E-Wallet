import Card from "../components/Card";
import styles from "../styles/AddCard.module.scss";
import { useState } from "react";
import { add } from "../redux/cardsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddCard() {
	const [type, setType] = useState("Visa");
	const [code, setCode] = useState("XXXX XXXX XXXX XXXX");
	const [valid, setValid] = useState("12/22");
	const [ccv, setCcv] = useState("123");

	const navigate = useNavigate();
	const { lastId, user } = useSelector((state) => state.cardsSlice);
	const dispatch = useDispatch();

	const sendCardHandler = (e) => {
		e.preventDefault();
		if (code.length !== 16) {
			return false;
		}
		dispatch(
			add({
				type: type,
				code: code,
				valid: valid,
				ccv: ccv,
				id: lastId + 1,
			})
		);
		navigate("/");
	};
	return (
		<div className={styles.container}>
			<header>ADD A NEW BANK CARD</header>
			<Card type={type} code={code} valid={valid} user={user} />

			<form onSubmit={sendCardHandler}>
				<label htmlFor="number">CARD NUMBER</label>
				<input
					type="number"
					id="number"
					onChange={(e) => {
						setCode(
							(e.target.value = e.target.value.slice(
								0,
								e.target.maxLength
							))
						);
					}}
					maxLength="16"
					required
				></input>
				<label htmlFor="name">CARDHOLDER NAME</label>
				<input
					type="text"
					id="name"
					value={user}
					readOnly
					required
				></input>
				<div>
					<label htmlFor="valid">
						VALID THRU
						<input
							type="text"
							id="valid"
							onChange={(e) => {
								setValid(e.target.value);
							}}
							required
						></input>
					</label>
					<label htmlFor="ccv">
						CCV
						<input
							type="text"
							id="ccv"
							onChange={(e) => {
								setCcv(e.target.value);
							}}
							required
						/>
					</label>
				</div>
				<label htmlFor="vendor">Vendor</label>
				<select
					id="vendor"
					onChange={(e) => {
						setType(e.target.value);
					}}
					required
				>
					<option>Visa</option>
					<option>Mastercard</option>
					<option>Amex</option>
				</select>
				<button>ADD CARD</button>
			</form>
		</div>
	);
}
