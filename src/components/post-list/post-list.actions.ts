import { Dispatch } from 'react-redux';
import HttpRequestDelegate from '../../utils/http-request-delegate';
import ResponseData from '../../utils/interfaces/http-response';
import { Post } from './post';

export const SHOW_ALL = 'SHOW_ALL';

export const CHANGE_TEXT = 'CHANGE_TEXT';

export const changeText = (text: string) => {
  return {
    type: CHANGE_TEXT,
    text
  };
};

interface FetchPostResponse extends ResponseData {
  blogs: Post[];
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(posts: Post[]) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export const FETCH_POSTS = 'FETCH_POSTS';

export const fetchPosts = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosts());
    return HttpRequestDelegate.request(
      'http://localhost:5000/api/blog/blogs',
      {},
      (data: FetchPostResponse) => {
        dispatch(receivePosts(data.blogs));
      }
    );
  };
};
