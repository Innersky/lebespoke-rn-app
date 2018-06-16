import { combineReducers } from 'redux';
import postList, { PostListState } from './components/post-list/post-list.reducer';

export interface RootReducer {
  postList: PostListState;
}

const rootReducer = combineReducers({
  postList
});

export default rootReducer;
