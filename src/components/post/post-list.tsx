import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HomeNavigationState } from '../../containers/home-page/home';
import { RootReducer } from '../../reducer';
import { PostObj } from './post';
import { fetchPosts } from './post-list.actions';

export interface PostListProps {
  text: string;
  posts: PostObj[];
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
  navigation: NavigationScreenProp<HomeNavigationState>;
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
    return (
      <FlatList
        data={this.props.posts.map((post: PostObj, index) => {
          return {
            key: index,
            post
          };
        })}
        renderItem={({item}) =>
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.navigation.navigate('Post', {
              post: item.post
            })}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <FullWidthImage
                style={styles.image}
                source={{uri: item.post.coverImageSrc ||
                  'http://cdn.lebespoke.com/static/image/logo.png'}}
              />
            </View>
            <Text
              numberOfLines={2}
              style={styles.text}
            >
              {item.post.title}
            </Text>
          </TouchableOpacity>}
        numColumns={2}
      />
    );
  }
}

const PostListContainer = connect(mapStateToProps)(PostList);

export default PostListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5
  },
  imageContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    borderRadius: 2
  }
});
