import { useReducer } from 'react';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Business from '../models/Business';
import Card from '../components/card/Card';
import styles from '../styles/Directory.module.css';
import Layout from '../components/layout/layout';
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from 'react-icons/ai';

export default function Directory({ businesses }) {
	// State
	const initialState = { data: businesses };
	const [state, dispatch] = useReducer(reducer, initialState);
	function reducer(state, action) {
		switch (action.type) {
			case 'filter': {
				if (action.payload === 'none')
					return {
						...state,
						data: businesses,
					};
				else
					return {
						...state,
						data: businesses.filter(
							(business) => business.category === action.payload
						),
					};
			}
			case 'sortByName': {
				return {
					...state,
					data: state.data.sort((a, b) => {
						return a.name > b.name ? 1 : -1;
					}),
				};
			}
			case 'sortByNameReverse': {
				return {
					...state,
					data: state.data.sort((a, b) => {
						return b.name > a.name ? 1 : -1;
					}),
				};
			}
			case 'sortByTown': {
				return {
					...state,
					data: state.data.sort((a, b) => {
						return a.address.town > b.address.town ? 1 : -1;
					}),
				};
			}
			case 'sortByTownReverse': {
				return {
					...state,
					data: state.data.sort((a, b) => {
						return b.address.town > a.address.town ? 1 : -1;
					}),
				};
			}
			default:
				return state;
		}
	}

	// SORTING
	// By name
	function sortByName() {
		dispatch({
			type: 'sortByName',
		});
	}
	// By town
	function sortByTown() {
		dispatch({
			type: 'sortByTown',
		});
	}
	function sortByNameReverse() {
		dispatch({
			type: 'sortByNameReverse',
		});
	}

	function sortByTownReverse() {
		dispatch({
			type: 'sortByTownReverse',
		});
	}
	// FILTERING
	function filterByCategory(e) {
		dispatch({
			type: 'filter',
			payload: e.target.value,
		});
	}

	return (
		<Layout pageName='Directory'>
			<h1>Business Directory</h1>
			<div className={styles.options_container}>
				<div className={styles.buttons_container}>
					{/* Sorting Options */}
					<div className={styles.sort_container}>
						<h2>Sort by:</h2>
						<div className={styles.sort_button}>
							<div className={styles.button_name}>
								<p>Name:</p>
							</div>
							<AiOutlineSortAscending
								className={styles.icon}
								onClick={sortByName}
							/>
							<AiOutlineSortDescending
								className={styles.icon}
								onClick={sortByNameReverse}
							/>
						</div>
						<div className={styles.sort_button}>
							<div className={styles.button_name}>
								<p>Town:</p>
							</div>
							<AiOutlineSortAscending
								className={styles.icon}
								onClick={sortByTown}
							/>
							<AiOutlineSortDescending
								className={styles.icon}
								onClick={sortByTownReverse}
							/>
						</div>
					</div>
					{/* Filtering options */}
					<div className={styles.filter_container}>
						<h2>Filter by:</h2>
						<select
							name='category'
							onChange={filterByCategory}
							className={styles.filter_button}
							defaultValue='none'>
							<option value='restaurant'>Restaurant</option>
							<option value='shop'>Shop</option>
							<option value='service'>Service</option>
							<option value='none'>No Filter</option>
						</select>
					</div>
				</div>
			</div>

			{/* Map */}
			{state.data.map((business) => (
				<Card business={business} key={business._id} />
			))}

			{/* New Business POST route */}
			<h2>Add a new Business:</h2>
			<Link href='/new'>
				<button className={styles.add_button}>+</button>
			</Link>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	await dbConnect();

	const result = await Business.find({});
	const businesses = result.map((document) => {
		const business = document.toObject();
		business._id = business._id.toString();
		return business;
	});

	return { props: { businesses: businesses } };
}
