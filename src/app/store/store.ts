import { tassign } from 'tassign'
import { INCREMENT, UPDATE_LOGIN } from './actions';

export interface IAppState {
    counter: number;
    noLogin: boolean;
    titulo: string;
}

export const INITIAL_STATE: IAppState = {
    counter: 0,
    noLogin: true,
    titulo: ""
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case INCREMENT:
            return tassign(state, { counter: state.counter + 1 })

        case UPDATE_LOGIN:
            return tassign(state, { noLogin: !state.noLogin })

    }
    return state
}