import { ImagePicker } from 'expo';
import { ReduxAction } from '../../../utils/interfaces/redux-action';
import ImageInfo = ImagePicker.ImageInfo;
import {ADD_IMAGE, ENTER_CONTENT, ENTER_TITLE} from './post-editor.action';

export interface PostEditorReduxState {
  content: string;
  title: string;
  images: ImageInfo[];
  submitting: boolean;
}

interface Action extends ReduxAction, PostEditorReduxState {
  image: ImageInfo;
}

export default function postEditor(
  state: PostEditorReduxState = {
    images: [],
    title: '',
    content: '',
    submitting: false,
  },
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
    default:
      return state;
  }
}
