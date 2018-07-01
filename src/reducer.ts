import { combineReducers } from 'redux';
import postList, { PostListState } from './components/post/post-list.reducer';
import login, { LoginState } from './components/user/user.reducer';
import postEditor, {PostEditorState} from './components/post/post-editor/post-editor.reducer';

export interface RootReducer {
  postList: PostListState;
  login: LoginState;
  postEditor: PostEditorState;
}

const rootReducer = combineReducers({
  postList,
  login,
  postEditor
});

export default rootReducer;
