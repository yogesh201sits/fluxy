import { createStore } from "../core/createStore";

const store = createStore({
  count: 0,
  name: "Yogesh",
});

console.log("Initial State:");
console.log(store.getState());

const unsubscribe = store.subscribe((state) => {
  console.log("State Updated:", state);
});

console.log("\nIncrement count...");
store.setState({
  count: 1,
});

console.log("\nUpdate name...");
store.setState({
  name: "Mini Zustand",
});

console.log("\nFunctional update...");
store.setState((state) => ({
  count: state.count + 1,
}));

console.log("\nCurrent State:");
console.log(store.getState());

console.log("\nUnsubscribing...");
unsubscribe();

console.log("\nThis should NOT trigger listener");
store.setState({
  count: 100,
});

console.log("\nFinal State:");
console.log(store.getState());