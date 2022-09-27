import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useSelector } from "react-redux";

import styles from "../styles/Cards.module.scss";

export default function Cards() {
	const { user, cards, activeId } = useSelector((state) => state.cardsSlice);

	return (
		<div className={styles.container}>
			<header>E-WALLET</header>
			<ul className={styles.active}>
				<h1>Active Card</h1>
				{cards.map(
					(item, index) =>
						item.id === activeId && (
							<Card key={index} {...item} user={user} />
						)
				)}
			</ul>
			<ul className={styles.notActive}>
				{cards.map(
					(item, index) =>
						item.id !== activeId && (
							<Card key={index} {...item} user={user} />
						)
				)}
			</ul>
			{cards.length < 4 ? (
				<Link to={"/add-card"}>
					<button>ADD A NEW CARD</button>
				</Link>
			) : (
				<>
					<button className={styles.disable}>
						ADD A NEW CARD
						<span className={styles.tooltip}>
							DELETE A CURRENT CARD FIRST
						</span>
					</button>
				</>
			)}
		</div>
	);
}
