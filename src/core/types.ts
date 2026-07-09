export type Listener<T> = (state: T) => void;

export type StateCreator<T> = (
  set: StoreApi<T>["setState"],
  get: StoreApi<T>["getState"]
) => T;

export interface StoreApi<T> {
  getState(): T;

  setState(partial: Partial<T> | ((state: T) => Partial<T>)): void;

  subscribe(listener: Listener<T>): () => void;
  
}