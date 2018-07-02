import { ReduxAction } from '../../utils/interfaces/redux-action';
import { PostObj } from './post';
import { CHANGE_TEXT, RECEIVE_POSTS, REQUEST_POSTS } from './post-list.actions';

export interface PostListReduxState {
  text?: string;
  posts?: PostObj[];
}

interface Action extends ReduxAction, PostListReduxState {}

export default function postList(
  state: PostListReduxState = {
    text: 'tasdqwq',
    posts: []
  },
  action: Action
) {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text
      };
    case REQUEST_POSTS:
      return {
        ...state,
        post: []
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts || []
      };
    default:
      return state;
  }
}
