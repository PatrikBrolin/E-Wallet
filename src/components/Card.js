import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "../styles/Card.module.scss";
import RemoveOrActivate from "./RemoveOrActivate";
import { FcSimCardChip } from "react-icons/fc";
import { RiMastercardFill } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";
import { GrAmex } from "react-icons/gr";


export default function Card({ type, code, valid, user, id }) {
	const [clickedCard, setClickedCard] = useState(false);
	const { activeId } = useSelector((state) => state.cardsSlice);

	return (
		<div>
			<li
				className={styles.card}
				style={{
					background:
						type === "Mastercard"
							? "linear-gradient(-120deg, #cc0000, #ff9900, #000066)"
							: type === "Amex"
							? "linear-gradient(120deg, #85CCF2, #006CCE)"
							: type === "Visa"
							? "linear-gradient(120deg, #1a1f71, #f7b600)"
							: null,
				}}
				onClick={() => {
					if (
						activeId !== id &&
						window.location.href !==
							"http://localhost:3000/add-card"
					) {
						setClickedCard(!clickedCard);
					}
				}}
			>
				<FcSimCardChip className={styles.chip} />
				<h2>
					{type === "Mastercard" ? (
						<RiMastercardFill />
					) : type === "Visa" ? (
						<RiVisaLine />
					) : type === "Amex" ? (
						<GrAmex />
					) : null}
				</h2>
				<h3>{code}</h3>
				<div>
					<div>
						<p>CARDSHOLDERS NAME</p>
						<p>VALID THRU</p>
					</div>
					<div>
						<h4>{user}</h4>
						<h4>{valid}</h4>
					</div>
				</div>
			</li>
			{clickedCard && (
				<RemoveOrActivate setClickedCard={setClickedCard} id={id} />
			)}
		</div>
	);
}
