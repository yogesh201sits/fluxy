import { createStore } from "../core/createStore";
import { describe, test, expect, mock } from "bun:test";

describe("createStore", () => {
  test("should initialize with the given state", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    expect(store.getState()).toEqual({
      count: 0,
      name: "Yogesh",
    });
  });

  test("should update state with an object", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    store.setState({
      count: 1,
    });

    expect(store.getState()).toEqual({
      count: 1,
      name: "Yogesh",
    });
  });

  test("should update state with a function", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    store.setState((state) => ({
      count: state.count + 1,
    }));

    expect(store.getState()).toEqual({
      count: 1,
      name: "Yogesh",
    });
  });

  test("should notify subscribers when state changes", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    const listener = mock();

    store.subscribe(listener);

    store.setState({
      count: 5,
    });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      count: 5,
      name: "Yogesh",
    });
  });

  test("should stop notifying after unsubscribe", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    const listener = mock();

    const unsubscribe = store.subscribe(listener);

    store.setState({
      count: 1,
    });

    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    store.setState({
      count: 100,
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("should merge partial updates", () => {
    const store = createStore(() => ({
      count: 0,
      name: "Yogesh",
    }));

    store.setState({
      name: "Mini Zustand",
    });

    expect(store.getState()).toEqual({
      count: 0,
      name: "Mini Zustand",
    });
  });
});