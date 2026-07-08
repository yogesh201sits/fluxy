import { useCounterStore } from "./counterStore";

export default function Counter() {
  const state = useCounterStore();

  function increment() {
    useCounterStore.setState({
      count: state.count + 1,
    });
  }

  return (
    <div>
      <h2>{state.count}</h2>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}