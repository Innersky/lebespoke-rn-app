import React from 'react';
import { View, WebView } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import {DOMAIN_URI} from '../../urls';

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
      <View
        style={{
          backgroundColor: '#000',
          flex: 1
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#fff',
            flex: 1
          }}
        >
          <WebView
            source={{uri: DOMAIN_URI + '/blog/' +
              this.props.navigation.state.params.post.urlIdentifier + '/reading-mode'}}
          />
        </View>
      </View>
    );
  }
}

export default Post;
