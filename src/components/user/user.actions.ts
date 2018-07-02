import { Dispatch } from 'react-redux';
import { RootReducer } from '../../reducer';
import {LOGIN_API, LOGOUT_API, UPLOAD_PROFILE_IMAGE_API} from '../../urls';
import { AppStorageType, saveStorageItem } from '../../utils/app-storage';
import HttpRequestDelegate from '../../utils/http-request-delegate';
import ResponseData, {ResponseCode} from '../../utils/interfaces/http-response';
import {UserObj} from './login';

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

export const SELECT_PROFILE_IMAGE = 'SELECT_PROFILE_IMAGE';

export const selectProfileImage = (profileImageUri: string) => {
  return {
    type: SELECT_PROFILE_IMAGE,
    profileImageUri
  };
};

export const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE';

export const saveUserProfile = (user: UserObj | null) => {
  return {
    type: SAVE_USER_PROFILE,
    user
  };
};

export const logout = () => {
  return (dispatch: Dispatch) => {
    return HttpRequestDelegate.request(
      LOGOUT_API,
      {},
      (data: LoginResponse) => {
        if (data.code === ResponseCode.SUCCESS) {
          dispatch(saveUserProfile(null));
        } else {
          alert('error logout');
        }
      }
    );
  };
};

interface LoginResponse extends ResponseData {
  email: string;
  name: {
    first: string;
    last: string;
  };
  user: UserObj;
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
        if (data.code === ResponseCode.SUCCESS) {
          dispatch(saveUserProfile(data.user));
        } else {
          alert('error login');
        }
      }
    );
  };
};

export const updateProfileImage = () => {
  return (dispatch: Dispatch, getState: () => RootReducer) => {
    const formData = new FormData();
    formData.append('profileImage', {
      uri: getState().login.profileImageUri,
      type: 'image/jpg',
      name: 'profileImage.jpg',
    });
    return HttpRequestDelegate.request(
      UPLOAD_PROFILE_IMAGE_API,
      {
        body: formData,
        method: 'POST',
      },
      (data: LoginResponse) => {
        alert(data.code);
      }
    );
  };
};
