// library code

function createStore(reducer) {
	// The store has 4 parts:
	// 1. State
	// 2. Get the state
	// 3. Listen to the state changes
	// 4. Update the state

	let state;
	let listeners = [];

	const getState = () => state;

	const subscribe = (listener) => {
		listeners.push(listener);

		// return the funtion to unsubscribe the passed listener/ function
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	const dispatch = (action) => {
		state = reducer(state, action);

		listeners.forEach((l) => l());
	};

	return {
		getState,
		subscribe,
		dispatch,
	};
}

// app code
// reducer
function todos(state = [], action) {
	switch (action.type) {
		case "ADD_TODO":
			return state.concat([action.todo]);
		case "REMOVE_TODO":
			return state.filter((item) => item.id !== action.id);
		case "TOGGLE_TODO":
			return action.map((item) =>
				item.id === action.id
					? { ...item, complete: !item.complete }
					: item
			);
		default:
			return state;
	}
}

function goals(state = [], action) {
	switch (action.type) {
		case "ADD_GOAL":
			return state.concat([action.goal]);
		case "REMOVE_GOAL":
			return state.filter((item) => item.id !== action.id);
		default:
			return state;
	}
}

function app(state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action),
	};
}

const store = createStore(app);

store.subscribe(() => {
	console.log("New state is ", store.getState());
});
store.dispatch({
	type: "ADD_TODO",
	todo: {
		id: 0,
		name: "Learn redux",
		complete: false,
	},
});
// const unsubscribe = store.subscribe(() => {
// 	console.log("The new state is: " + store.getState());
// });
// unsubscribe();
