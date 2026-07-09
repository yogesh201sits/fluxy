import { useCounterStore } from "./counterStore";

export default function Counter() {
  const { count, increment } = useCounterStore();

  return (
    <div>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}