import { ReduxAction } from '../../utils/interfaces/redux-action';
import { ENTER_PASSWORD, ENTER_USERNAME } from './user.actions';

export interface LoginState {
  username?: string;
  password?: string;
}

interface Action extends ReduxAction {
  username?: string;
  password?: string;
}

export default function login(
  state: LoginState = {
    username: '',
    password: ''
  },
  action: Action
) {
  switch (action.type) {
    case ENTER_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case ENTER_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
}
