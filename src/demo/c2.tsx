import { useCounterStore } from "./counterStore";

export default function Counter() {
  const { count, increment } = useCounterStore();

  return (
    <div>
      <h2>{count}</h2>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}