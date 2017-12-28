import { Action } from 'redux';

export interface MainState {

}

const initialState: MainState = {};

export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};