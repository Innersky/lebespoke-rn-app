import { combineReducers } from 'redux';
import {
  default as postEditor,
  PostEditorReduxState
} from './components/post/post-editor/post-editor.reducer';
import {default as postList, PostListReduxState} from './components/post/post-list.reducer';
import {default as login, LoginReduxState} from './components/user/user.reducer';

export interface RootReducer {
  postList: PostListReduxState;
  login: LoginReduxState;
  postEditor: PostEditorReduxState;
}

const rootReducer = combineReducers({
  postList,
  login,
  postEditor
});

export default rootReducer;
