import { ImagePicker } from 'expo';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ImageInfo = ImagePicker.ImageInfo;
import { RootReducer } from '../../../reducer';
import { ADD_POST_API } from '../../../urls';
import HttpRequestDelegate from '../../../utils/http-request-delegate';
import ResponseData from '../../../utils/interfaces/http-response';
import { PostObj } from '../post';
import { fetchPosts } from '../post-list.actions';
import {NavigationAction, NavigationActions} from 'react-navigation';

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

export const ENTER_TITLE = 'ENTER_TITLE';

export const enterTitle = (title: string) => {
  return {
    type: ENTER_TITLE,
    title
  };
};

export const ENTER_CONTENT = 'ENTER_CONTENT';

export const enterContent = (content: string) => {
  return {
    type: ENTER_CONTENT,
    content
  };
};

export const START_POST = 'START_POST';

export const startPost = () => {
  return {
    type: START_POST,
    submitting: true
  };
};

export const END_POST = 'END_POST';

export const endPost = () => {
  return {
    type: END_POST,
    submitting: false
  };
};

export const DISMISS_POST_EDITING = 'DISMISS_POST_EDITING';

export const dismissPostEditing = () => {
  return {
    type: DISMISS_POST_EDITING
  };
};

interface AddPostResponse extends ResponseData {
  post: PostObj;
}

export const sharePost = () => {
  return (dispatch: ThunkDispatch<RootReducer, {}, AnyAction>, getState: () => RootReducer) => {
    dispatch(startPost());
    dispatch(NavigationActions.setParams({
      key: 'AddContent',
      params: {
        submitting: true
      }
    }));
    if (!getState().postEditor.images.length) {
      alert('Please select image');
      return;
    }
    if (getState().postEditor.submitting) {
      return;
    }
    const formData = new FormData();
    formData.append('title', getState().postEditor.title);
    formData.append('content', getState().postEditor.content);
    getState().postEditor.images.map((image: ImageInfo, index: number) => {
      if (index === 0) {
        formData.append('coverImage', {
          uri: image.uri,
          type: image.type,
          name: 'coverImage',
        });
      } else {
        formData.append(`image-${index}`, {
          uri: image.uri,
          type: image.type,
          name: `image-${index}`,
        });
      }
    });
    return HttpRequestDelegate.request(
      ADD_POST_API,
      {
        body: formData,
        method: 'POST',
      },
      (data: AddPostResponse) => {
        alert(data.code + '\n' + data.message);
        dispatch(dismissPostEditing());
        dispatch(NavigationActions.back());
        dispatch(fetchPosts());
      },
      () => {return; },
      () => {
        dispatch(endPost());
      }
    );
  };
};
