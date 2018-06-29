import { combineReducers } from 'redux';
import postList, { PostListState } from './components/post/post-list.reducer';
import login, { LoginState } from './components/user/user.reducer';

export interface RootReducer {
  postList: PostListState;
  login: LoginState;
}

const rootReducer = combineReducers({
  postList,
  login
});

export default rootReducer;
