import { Observable } from 'rxjs/Observable'

/**
 * 
 */
interface ActionCreator<Input> { 
  ():any 
  (arg:Input):any 
  (arg:Input, date:Date):any 
}

type ActionCreators<Input> = ActionCreator<Input> | ActionCreator<Input>[] | Function | Function[]

interface Options<Input, Response> {
  /**
   * An Observable returning function
   */
  method(input:Input): Observable<Response>

  /**
   * OPTIONAL: An ActionCreator or list of ActionCreators to be dispatched before the Observable is created.
   */
  before?:ActionCreators<Input>

  /**
   * OPTIONAL: An ActionCreator or list of ActionCreators to be dispatched if the Observable succeeds.
   * 
   */
  success?:ActionCreators<Response>

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

export declare function createObservableThunk(options: Options<any, any>): ThunkCreator<any, any>
export declare function createObservableThunk<I, R>(options: Options<I, R>): ThunkCreator<I, R>

