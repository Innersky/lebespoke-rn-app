import { ReduxAction } from '../../utils/interfaces/redux-action';
import {ENTER_PASSWORD, ENTER_USERNAME, SELECT_PROFILE_IMAGE} from './user.actions';

export interface LoginState {
  username?: string;
  password?: string;
  profileImageUri?: string;
}

interface Action extends ReduxAction, LoginState {}

export default function login(
  state: LoginState = {
    username: '',
    password: '',
    profileImageUri: ''
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
    case SELECT_PROFILE_IMAGE:
      return {
        ...state,
        profileImageUri: action.profileImageUri
      };
    default:
      return state;
  }
}
