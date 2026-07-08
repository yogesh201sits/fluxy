<div align="center">

<img src="./public/logoFluxy.png" alt="Fluxy Logo" width="180" />

# Fluxy

### A lightweight state management library built from scratch to understand how Zustand works internally.

</div>

---

# Goal

The purpose of **Fluxy** is not to clone Zustand line by line.

Instead, the goal is to understand **why Zustand works**, how it is designed internally, and then implement every feature ourselves—from the core store to React integration and middleware.

By the end of this project, Fluxy will include:

* A framework-independent state management engine
* React bindings using `useSyncExternalStore`
* Selectors
* Middleware support
* Persistence
* Logger middleware
* DevTools support
* Type-safe APIs

---


# High-Level Architecture

```text
                 React Components
                        │
                        ▼
                 useStore()
                        │
                        ▼
          useSyncExternalStore()
                        │
                        ▼
                 Store API
        ┌────────────────────────┐
        │ getState()             │
        │ setState()             │
        │ subscribe()            │
        └────────────────────────┘
                        │
                        ▼
                 createStore()
                        │
                        ▼
                  Internal State
```

The architecture is divided into two major layers:

## 1. Core Layer

The core is completely independent of React.

Responsibilities:

* Store state
* Update state
* Return current state
* Manage subscribers
* Notify subscribers

Because it has no React dependency, it can be used anywhere:

* React
* Node.js
* Vanilla JavaScript
* Other frameworks

---

## 2. React Layer

The React layer connects the core store with React.

Responsibilities:

* Subscribe React components
* Trigger re-renders
* Read selected state
* Integrate with `useSyncExternalStore`

This separation keeps the core reusable while allowing React to update efficiently.

---

# Core Concepts

## State

The store owns a single source of truth.

Example:

```ts
{
  count: 0
}
```

Every update modifies this state.

---

## Store API

Every Fluxy store exposes three fundamental methods.

### getState()

Returns the latest state.

```ts
store.getState()
```

---

### setState()

Updates the store.

Supports both object updates and functional updates.

```ts
store.setState({
    count: 1
})
```

or

```ts
store.setState(state => ({
    count: state.count + 1
}))
```

---

### subscribe()

Registers listeners.

Whenever the state changes, every listener is notified.

```ts
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})
```

---

# Publish / Subscribe (Pub/Sub)

Fluxy is built on the **Publish–Subscribe (Pub/Sub)** design pattern.

## Publisher

The store acts as the publisher.

Whenever state changes, it publishes an update.

```text
setState(...)
```

↓

Notify everyone.

---

## Subscribers

Subscribers are interested in state updates.

They register themselves using:

```ts
subscribe(listener)
```

---

## Event Flow

```text
Subscriber A
Subscriber B
Subscriber C

        │
        ▼
   subscribe()
        │
        ▼
      Store
        │
        ▼
 setState(...)
        │
        ▼
 Notify A
 Notify B
 Notify C
```

Subscribers never update themselves.

The store pushes notifications whenever something changes.

---

# Why Use Pub/Sub?

Without Pub/Sub:

Every component would need to repeatedly ask:

```text
Did the state change?
Did the state change?
Did the state change?
```

This is called polling and is inefficient.

With Pub/Sub:

```text
State changes

↓

Store automatically notifies everyone.
```

No unnecessary checking is required.

---

# Internal Flow

```text
createStore()

↓

Create state

↓

Create listener collection

↓

Expose getState()

↓

Expose setState()

↓

Expose subscribe()

↓

Store is ready
```

---

# React Integration (Upcoming)

The core store does not know anything about React.

Later, we will build:

```text
Store

↓

useSyncExternalStore()

↓

useStore()

↓

React Components
```

This is the same idea used by Zustand to safely synchronize external stores with React.

---

# Development Roadmap

## Phase 1 — Core

* [x] Project setup
* [x] Define core types
* [ ] Implement `createStore`
* [ ] Test vanilla store

---

## Phase 2 — React

* [ ] Implement `useStore`
* [ ] Implement `create`
* [ ] Build counter example

---

## Phase 3 — Features

* [ ] Selectors
* [ ] Equality functions
* [ ] Replace state
* [ ] Destroy store
* [ ] Middleware support

---

## Phase 4 — Middleware

* [ ] Logger
* [ ] Persist
* [ ] DevTools

---

## Phase 5 — Advanced

* [ ] Performance optimizations
* [ ] Compare with Zustand internals
* [ ] Publish Fluxy

---

# Learning Objectives

By completing Fluxy, we will understand:

* State management fundamentals
* Publish–Subscribe architecture
* Closures in JavaScript
* TypeScript generics
* Framework-independent library design
* React external stores
* `useSyncExternalStore`
* Selector-based subscriptions
* Middleware architecture
* How Zustand works internally

---

# Current Status

✅ Project initialized

✅ Architecture designed

✅ Core API planned

✅ Implementing `createStore()`

⬜ Implementing react integration

