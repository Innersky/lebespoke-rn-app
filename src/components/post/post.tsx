import React from 'react';
import { View, WebView } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

export interface PostObj {
  title: string;
  coverImageSrc: string;
  urlIdentifier: string;
}

interface PostProps {
  navigation: NavigationScreenProp<{
    params: {
      post: PostObj
    }
  }>;
}

class Post extends React.Component<PostProps> {
  constructor(props: PostProps) {
    super(props);
  }

  public render() {
    return (
      <WebView
        source={{uri: 'https://www.lebespoke.com/blog/' +
          this.props.navigation.state.params.post.urlIdentifier + '/reading-mode'}}
        style={{
          flex: 1,
          marginTop: -100
        }}
      />
    );
  }
}

export default Post;
