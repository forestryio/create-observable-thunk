
Provides a H.O.F. that wraps any function returning an 
[Rx.Observable](http://github.com/ReactiveX/RxJS) 
in a [thunk](http://github.com/gaearon/redux-thunk)

## Install

This has peer dependencies of `rxjs@5.x.x`, `redux`, and `redux-thunk`, which will have to be installed as well.

```bash
npm install --save create-observable-thunk
```

or

```bash
yarn add create-observable-thunk
```

## Example

**users-thunks.js**

```js
import { createObservableThunk } from "create-observable-thunk"
import { loadUser } "./users-api"
import { loadUsersRequest, loadUsersSuccess, loadUsersFailure } from "./users-actions"

export const loadUsers = createObservableThunk({
  method: api.loadUsers,
  before: loadUsersRequest,
  success: loadUsersSuccess,
  failure: loadUsersFailure,
})
```

**components/UserContainer.jsx**
```jsx
import { connect } from "react-redux"
import { loadUsers } from "../users-thunks"
import { Users } from "./Users"

export const UsersContainer = connect(null, { loadUsers })(Users)
```