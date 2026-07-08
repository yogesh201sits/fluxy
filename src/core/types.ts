export type Listener<T> = (state: T) => void;

export interface StoreApi<T> {
  getState(): T;

  setState(
    partial: Partial<T> | ((state: T) => Partial<T>)
  ): void;

  subscribe(listener: Listener<T>): () => void;
}