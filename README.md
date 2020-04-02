# sobs

> React observables

## Install

**IMPORTANT: You must be using TypeScript**

`npx create-react-app {app_name} --template typescript`

```bash
npm i sobs
```

## Documentation

### **IMPORTANT: Before you start...**

In your `tsconfig.json`, set `experimentalDecorators` to `true`:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### 1. Create an `@ObservableObject`

```tsx
import { ObservableObject } from 'sobs'

@ObservableObject
class User {
    // Go to the next step
}
```

### 2. Create fields

Normal fields don't cause component updates when they change.

You must mark a field with `@Published` for components to respond to its changes.

```tsx
import { ObservableObject, Published } from 'sobs'

@ObservableObject
class User {
    id: string // If this changes, components won't respond
    
    @Published name: string // If this changes, components will update
    
    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
    
    // If you are modifying an @Published variable, you must use a regular function expression.
    // Arrow functions are not allowed.
    resetToDefaultName() {
        this.name = '...'
    }
}
```

### 3. Create a store

```tsx
import { ObservableObject, Published } from 'sobs'

@ObservableObject
class User {
    id: string
    
    @Published name: string
    
    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
    
    resetToDefaultName() {
        this.name = '...'
    }
}

@ObservableObject
class Store {
    @Published users: User[] = []
    
    addUser(user: User) {
        // Using .push(...) on an array doesn't trigger component updates.
        // You must reassign the array in order to trigger an update.
        this.users = [...this.users, user]
    }
    
    deleteUser(id: string) {
        this.users = this.users.filter(user => user.id !== id)
    }
}
```

### 4. Create components

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ObservableObject, Published, observe, newId } from 'sobs'

@ObservableObject
class User {
    id: string
    
    @Published name: string
    
    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
    
    resetToDefaultName() {
        this.name = '...'
    }
}

@ObservableObject
class Store {
    @Published users: User[] = []
    
    addUser(name: string) {
        this.users = [
            ...this.users,
            new User(newId(), name)
        ]
    }
    
    deleteUser(id: string) {
        this.users = this.users.filter(user => user.id !== id)
    }
}

const store = new Store()

const App = () => {
    // Respond to updates in the store.
    // This will only respond to field reassignments; it's shallow.
    // Updating a User object in the users array won't cause an update in this component.
    observe(store)
    
    return (
        <>
            <button onClick={() => store.addUser(prompt('Name')!)}>
                Add user
            </button>
            <div>
                {store.users.map(user => (
                    <UserRow key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}

const UserRow = ({ user }: { user: User }) => {
    // This will respond to updates on the user object.
    observe(user)
    
    return (
        <div>
            <p>{user.name}</p>
            <button onClick={user.resetToDefaultName.bind(user)}> {/* This component will respond */}
                Reset to default name
            </button>
            <button onClick={() => store.deleteUser(user.id)}> {/* The App component is observing the store object, so this will cause an update */}
                Delete
            </button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
