import { ImagePicker } from 'expo';
import { ReduxAction } from '../../../utils/interfaces/redux-action';
import ImageInfo = ImagePicker.ImageInfo;
import { ADD_IMAGE, ENTER_CONTENT } from './post-editor.action';

export interface PostEditorState {
  content: string;
  images: ImageInfo[];
}

interface Action extends ReduxAction, PostEditorState {
  image: ImageInfo;
}

export default function postEditor(
  state: PostEditorState = {
    images: [],
    content: ''
  },
  action: Action
) {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.image]
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
