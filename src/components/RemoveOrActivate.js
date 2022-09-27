import styles from "../styles/RemoveOrActivate.module.scss";
import { activate, remove } from "../redux/cardsSlice";
import { useDispatch } from "react-redux";


export default function RemoveOrActivate(props) {
	const dispatch = useDispatch();


	return (
		<div className={styles.container}>
			<div
				className={styles.backdrop}
				onClick={() => {
					props.setClickedCard(!props.setClickedCard);
				}}
			></div>
			<div className={styles.div}>
				<button className={styles.activate}
					onClick={() => {
						dispatch(
							activate({
								id: props.id,
							})
						);
						props.setClickedCard(!props.setClickedCard);
					}}
				>
					Activate Card
				</button>
				<button
				className={styles.remove}
					onClick={() => {
						dispatch(
							remove({
								id: props.id,
							})
						);
						props.setClickedCard(!props.setClickedCard);
					}}
				>
					Remove Card
				</button>
			</div>
		</div>
	);
}
