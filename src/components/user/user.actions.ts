import { Dispatch } from 'react-redux';
import { RootReducer } from '../../reducer';
import { LOGIN_API } from '../../urls';
import HttpRequestDelegate from '../../utils/http-request-delegate';
import ResponseData from '../../utils/interfaces/http-response';

export const ENTER_USERNAME = 'ENTER_USERNAME';

export const enterUsername = (username: string) => {
  return {
    type: ENTER_USERNAME,
    username
  };
};

export const ENTER_PASSWORD = 'ENTER_PASSWORD';

export const enterPassword = (password: string) => {
  return {
    type: ENTER_PASSWORD,
    password
  };
};

interface LoginResponse extends ResponseData {
  sessionId: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
}

export const login = () => {
  return (dispatch: Dispatch, getState: () => RootReducer) => {
    return HttpRequestDelegate.request(
      LOGIN_API,
      {
        body: JSON.stringify(
          {
            password: getState().login.password,
            username: getState().login.username
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      },
      (data: LoginResponse) => {
        alert(`Success! Name: ${data.name.first}, email: ${data.email}`);
      }
    );
  };
};
