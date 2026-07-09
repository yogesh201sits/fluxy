import { create } from "../react/create";

interface CounterStore {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));