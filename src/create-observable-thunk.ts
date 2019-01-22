import { ensureArray } from "./ensure-array"
import { Observable, of } from "rxjs"
import { tap, catchError, share } from "rxjs/operators"
/**
 *
 */
export interface ActionCreator<Input> {
  (): any
  (arg: Input): any
  (arg: Input, date: Date): any
}

export type ActionCreators<Input> =
  | ActionCreator<Input>
  | ActionCreator<Input>[]
  | Function
  | Function[]

export interface Options<Input, Response> {
  /**
   * An Observable returning function
   */
  method(input: Input): Observable<Response>

  /**
   * OPTIONAL: An ActionCreator or list of ActionCreators to be dispatched before the Observable is created.
   */
  before?: ActionCreators<Input>

  /**
   * OPTIONAL: An ActionCreator or list of ActionCreators to be dispatched if the Observable succeeds.
   *
   */
  success?: ActionCreators<Response>

  /**
   * OPTIONAL: An ActionCreator or list of ActionCreators to be dispatched if the Observable fails.
   */
  failure?: ActionCreators<any>
}

interface ThunkCreator<I, R> {
  (input?: I): Thunk<R>
}

interface Thunk<R> {
  (dispatch: Dispatch, getState: GetState): Observable<R>
}

interface Dispatch {
  (action: any): any
}
interface GetState {
  (): any
}

export function createObservableThunk<I = any, R = any>(
  options: Options<I, R>
) {
  const { method, before, success, failure } = options

  const beforeActions = ensureArray(before)
  const successActions = ensureArray(success)
  const failureActions = ensureArray(failure)

  return function thunkCreator(input: I) {
    return function thunk(dispatch: any, getState: () => any) {
      dispatchMany<I>(beforeActions, input)

      let o = method(input).pipe(
        tap(response => dispatchMany(successActions, response)),
        catchError(error => {
          dispatchMany(failureActions, error)
          return of({ error })
        }),
        share()
      )

      o.subscribe()

      return o

      function dispatchMany<Payload = any>(
        actionCreators: any[],
        payload: Payload
      ) {
        let date = new Date()
        actionCreators.forEach(callback => {
          let action = callback(payload, date)
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
