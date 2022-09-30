import Card from "../components/Card";
import styles from "../styles/AddCard.module.scss";
import { useState, useRef } from "react";
import { add } from "../redux/cardsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddCard() {
	const [type, setType] = useState("Visa");
	const [code, setCode] = useState("XXXX XXXX XXXX XXXX");
	const [valid, setValid] = useState("12/22");
	const [ccv, setCcv] = useState("123");

	const codeInput = useRef();
	const ccvInput = useRef();
	const navigate = useNavigate();
	const { lastId, user } = useSelector((state) => state.cardsSlice);
	const dispatch = useDispatch();

	const setCodeHandler = (e) => {
		var numbers = /^[0-9]+$/;
		if (e.target.value.match(numbers)) {
			codeInput.current.style.border = " 1px solid black";
			codeInput.current.style.background = "none";
			let res = [...e.target.value].map((d, i) => (i) % 4 == 0 ? ' ' + d : d).join('').trim()
			setCode(res);
			// setCode(e.target.value)
		} else {
			codeInput.current.style.border = " 2px solid red";
			codeInput.current.style.background = " pink";
		}
	};
	const setCcvHandler = (e) => {
		var numbers = /^[0-9]+$/;
		if (e.target.value.match(numbers)) {
			ccvInput.current.style.border = " 1px solid black";
			ccvInput.current.style.background = "none";
			setCcv(e.target.value);
		} else {
			ccvInput.current.style.border = " 2px solid red";
			ccvInput.current.style.background = " pink";
		}
	};

	const sendCardHandler = (e) => {
		e.preventDefault();
		console.log(code.length)
		if (code.length !== 19) {
			return;
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
					type="text"
					id="number"
					onChange={setCodeHandler}
					minLength="16"
					maxLength="16"
					ref={codeInput}
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
							onChange={setCcvHandler}
							ref={ccvInput}
							minLength={3}
							maxLength={3}
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
