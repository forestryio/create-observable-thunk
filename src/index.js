import { Observable } from "rxjs/Observable"

export function createObservableThunk(options) {
  const { method, before, success, failure } = options

  const beforeActions = ensureArray(before)
  const successActions = ensureArray(success)
  const failureActions = ensureArray(failure)

  return function thunkCreator(input) {
    return function thunk(dispatch, getState) {
      dispatchMany(beforeActions, input)

      let o = method(input)
        .do(response => dispatchMany(successActions, response))
        .catch(
          error =>
            dispatchMany(failureActions, error) || Observable.of({ error })
        )
        .share()

      o.subscribe()

      return o

      function dispatchMany(actionCreators, input) {
        let date = new Date()
        actionCreators.forEach(callback => {
          let action = callback(input, date)
          if (action) {
            dispatch(action)
          } else {
            console.error(
              `Invalid Action Creator ${callback.name} returned undefined`
            )
          }
        })
      }
    }
  }
}

function ensureArray(callbacks) {
  if (Array.isArray(callbacks)) {
    return callbacks
  }

  if (callbacks) {
    return [callbacks]
  }

  return []
}
