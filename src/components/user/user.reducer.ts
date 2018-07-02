import { ReduxAction } from '../../utils/interfaces/redux-action';
import {
  ENTER_PASSWORD, ENTER_USERNAME, SAVE_USER_PROFILE,
  SELECT_PROFILE_IMAGE
} from './user.actions';
import {UserObj} from './login';

export interface LoginReduxState {
  username?: string;
  password?: string;
  profileImageUri?: string;
  user?: UserObj;
}

interface Action extends ReduxAction, LoginReduxState {}

export default function login(
  state: LoginReduxState = {
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
    case SAVE_USER_PROFILE:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
