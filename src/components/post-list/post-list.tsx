import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { RootReducer } from '../../reducer';
import { Post } from './post';
import { fetchPosts } from './post-list.actions';

export interface PostListProps {
  text: string;
  posts: Post[];
  dispatch: any;
}

const mapStateToProps = (state: RootReducer) => {
  return {
    text: state.postList.text,
    posts: state.postList.posts
  };
};

class PostList extends React.Component<PostListProps> {
  constructor(props: PostListProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  public render() {
    return [
      (<Text key={-1}>{this.props.text}</Text>),
      ...this.props.posts.map((post, index) => (
        <Text key={index}>{post.title}</Text>
      ))
    ];
  }
}

export default connect(mapStateToProps)(PostList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
