import React, { useReducer, useEffect, useState } from "react";
import './list.css'

const initialState = {
	list: JSON.parse(localStorage.getItem("item")) || [],
};

function reducer(state, action) {
	switch (action.type) {
		case "ADD_ITEM":
			return {
				...state,
				list: [...state.list, action.payload],
			};
		case "REMOVE_ITEM":
			return {
				...state,
				list: state.list.filter((item) => item.id !== action.payload),
			};
		default:
			return state;
	}
}

function List() {

	const [name, setName] = useState("")
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		localStorage.setItem("item", JSON.stringify(state.list));
	}, [state.list]);

	const onChangeName = (e) => {setName(e.target.value)}

	function handleAddItem() {

		let itemName;
		name != "" && (itemName = name);

		const newItem = {
			id: state.list.length + 1,
			name: itemName
		};

		itemName && dispatch({ type: "ADD_ITEM", payload: newItem });
	}


	function handleRemoveItem(id) {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	}

	

	return (
		<div>
			<h1>Products List</h1>
			<form onSubmit={handleAddItem}>
				<input onChange={onChangeName} type="text" placeholder='Item name' />
				<button type="submit" value={name}>Add Item</button>
			</form>
			<ul >
				{state.list.map((item) => (
                    <div className="divLi" key={item.id}>
                        <li>
                            {item.name}
                        </li>
						<button onClick={() => handleRemoveItem(item.id)}> &times;</button>
                    </div>
				))}
			</ul>
		</div>
	);
}

export default List;
