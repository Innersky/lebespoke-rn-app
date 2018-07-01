import { ImagePicker } from 'expo';
import ImageInfo = ImagePicker.ImageInfo;
import {RootReducer} from '../../../reducer';
import HttpRequestDelegate from '../../../utils/http-request-delegate';
import {Dispatch} from 'react-redux';
import {ADD_POST_API, LOGIN_API} from '../../../urls';
import ResponseData from '../../../utils/interfaces/http-response';
import {PostObj} from '../post';

export const SELECT_IMAGES = 'SELECT_IMAGES';

export const selectImages = (images: ImageInfo[]) => {
  return {
    type: SELECT_IMAGES,
    images
  };
};

export const ADD_IMAGE = 'ADD_IMAGE';

export const addImage = (image: ImageInfo) => {
  return {
    type: ADD_IMAGE,
    image
  };
};

export const ENTER_CONTENT = 'ENTER_CONTENT';

export const enterContent = (content: string) => {
  return {
    type: ENTER_CONTENT,
    content
  };
};

interface AddPostResponse extends ResponseData {
  post: PostObj;
}

export const sharePost = () => {
  return (dispatch: Dispatch, getState: () => RootReducer) => {
    const formData = new FormData();
    formData.append('content', getState().postEditor.content);
    return HttpRequestDelegate.request(
      ADD_POST_API,
      {
        body: formData,
        method: 'POST',
      },
      (data: AddPostResponse) => {
        alert(data.code);
      }
    );
  };
};
