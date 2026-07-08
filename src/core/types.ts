export type SetState<T> = (
  update: Partial<T> | ((state: T) => Partial<T>)
) => void;

export type GetState<T> = () => T;

export type Listener<T> = (state: T) => void;

export type Unsubscribe = () => void;

export type StateCreator<T> = (
  set: SetState<T>,
  get: GetState<T>
) => T;

export interface StoreApi<T> {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe(listener: Listener<T>): Unsubscribe;
}