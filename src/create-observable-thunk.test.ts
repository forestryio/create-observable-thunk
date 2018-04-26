import { createObservableThunk } from "./create-observable-thunk"
import { Observable } from "rxjs"

describe("create-observable-thunk", () => {
  let dispatch, getState
  beforeEach(() => {
    getState = jest.fn(() => ({}))
    dispatch = jest.fn(action => {
      if (typeof action === "function") {
        return action(dispatch, getState)
      }
      return action
    })
  })

  describe("dispatching", () => {
    it("should return an observable", () => {
      const aThunk = createObservableThunk({ method: () => Observable.of() })

      const observable = dispatch(aThunk({}))

      expect(observable).toBeInstanceOf(Observable)
    })
    describe("before", () => {
      const DUMMY_ACTiON = { type: "dummy-action" }

      it("should dispatch a sole-action", () => {
        const dummyAction = jest.fn(() => DUMMY_ACTiON)
        const aThunk = createObservableThunk({
          method: () => Observable.of(),
          before: dummyAction
        })

        dispatch(aThunk({}))

        expect(dispatch).toBeCalledWith(DUMMY_ACTiON)
      })
    })
  })
})
