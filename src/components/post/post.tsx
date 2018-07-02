import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { NavigationScreenProp } from 'react-navigation';

export interface PostObj {
  title: string;
  coverImageSrc: string;
  content: string;
  images: string[];
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
          {this.props.navigation.state.params.post.images.map((image, index) =>
            <FullWidthImage
              key={index}
              source={{uri: image}}
            />
          )}
          <Text h2={true}>{this.props.navigation.state.params.post.title}</Text>
          <Text>{this.props.navigation.state.params.post.content}</Text>
        </View>
      </View>
    );
  }
}

export default Post;
