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
      const DUMMY_ACTiON_2 = { type: "dummy-action-2" }

      it("should dispatch a sole-action", () => {
        const dummyAction = jest.fn(() => DUMMY_ACTiON)
        const aThunk = createObservableThunk({
          method: () => Observable.of(),
          before: dummyAction
        })

        dispatch(aThunk({}))

        expect(dispatch).toBeCalledWith(DUMMY_ACTiON)
      })

      it("should dispatch two given actions", () => {
        const dummyAction = jest.fn(() => DUMMY_ACTiON)
        const dummyAction2 = jest.fn(() => DUMMY_ACTiON_2)
        const aThunk = createObservableThunk({
          method: () => Observable.of(),
          before: [dummyAction2, dummyAction]
        })

        dispatch(aThunk({}))

        expect(dummyAction).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(DUMMY_ACTiON)
        expect(dummyAction2).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(DUMMY_ACTiON_2)
      })

    })
  })
})
