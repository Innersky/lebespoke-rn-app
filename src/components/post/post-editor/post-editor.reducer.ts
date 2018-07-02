import { ImagePicker } from 'expo';
import { ReduxAction } from '../../../utils/interfaces/redux-action';
import ImageInfo = ImagePicker.ImageInfo;
import {ADD_IMAGE, DISMISS_POST_EDITING, ENTER_CONTENT, ENTER_TITLE} from './post-editor.action';

export interface PostEditorReduxState {
  content: string;
  title: string;
  images: ImageInfo[];
  submitting: boolean;
}

interface Action extends ReduxAction, PostEditorReduxState {
  image: ImageInfo;
}

const initialState = {
  images: [],
  title: '',
  content: '',
  submitting: false,
};

export default function postEditor(
  state: PostEditorReduxState = initialState,
  action: Action
) {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.image]
      };
    case ENTER_TITLE:
      return {
        ...state,
        title: action.title
      };
    case ENTER_CONTENT:
      return {
        ...state,
        content: action.content
      };
    case DISMISS_POST_EDITING:
      return initialState;
    default:
      return state;
  }
}
