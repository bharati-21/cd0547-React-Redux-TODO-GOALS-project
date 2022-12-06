function createStore() {
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

		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};
	return {
		getState,
		subscribe,
	};
}

const store = createStore();
const unsubscribe = store.subscribe(() => {
	console.log("The new state is: " + store.getState());
});
unsubscribe();