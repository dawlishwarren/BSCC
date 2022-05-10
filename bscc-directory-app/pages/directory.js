import { useReducer } from 'react';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Business from '../models/Business';
import Card from '../components/card/Card';

export default function Directory({ businesses }) {
	// State
	const initialState = { data: businesses };
	const [state, dispatch] = useReducer(reducer, initialState);
	function reducer(state, action) {
		switch (action.type) {
			case 'filter': {
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
					data: businesses.sort((a, b) => {
						return a.name > b.name ? 1 : -1;
					}),
				};
			}
			case 'sortByTown': {
				return {
					...state,
					data: businesses.sort((a, b) => {
						return a.address.town > b.address.town ? 1 : -1;
					}),
				};
			}
			case 'sortBy': {
				return {
					...state,
					data: action.payload,
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

	// FILTERING
	function filterByCategory(e) {
		dispatch({
			type: 'filter',
			payload: e.target.value,
		});
	}

	return (
		<div>
			<h1>Business Directory</h1>
			{/* Sorting Options */}
			<button onClick={sortByName} id='sort-name-a-z'>
				Sort By Name
			</button>
			<button onClick={sortByTown} id='sort-town-a-z'>
				Sort By Town
			</button>

			<select name='category' onChange={filterByCategory}>
				<option value='restaurant'>Restaurant</option>
				<option value='shop'>Shop</option>
				<option value='service'>Service</option>
			</select>

			{/* Map */}
			{state.data.map((business) => (
				<Card business={business} key={business._id} />
			))}
			<h2>Add a new Business:</h2>
			<Link href='/new'>
				<button>Go</button>
			</Link>
		</div>
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
