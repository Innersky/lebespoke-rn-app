import { ImagePicker } from 'expo';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Button, FormInput, Icon, Text} from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootReducer } from '../../../reducer';
import {addImage, enterContent, sharePost} from './post-editor.action';
import ImageInfo = ImagePicker.ImageInfo;

interface AddContentProps {
  navigation: NavigationScreenProp<{}>;
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
  images: ImageInfo[];
  content: string;
}

const mapStateToProps = (state: RootReducer) => {
  return {
    images: state.postEditor.images,
    content: state.postEditor.content
  };
};

class AddContent extends React.Component<AddContentProps> {
  public static navigationOptions = (
    {navigation}: {navigation: NavigationScreenProp<{}>}) => {
    return {
      headerTitle: 'Share Post',
      headerLeft: (
        <Icon
          type="font-awesome"
          name="times"
          color="#fff"
          containerStyle={{
            marginLeft: 10
          }}
          onPress={() => navigation.dismiss()}
        />
      ),
      headerRight: (
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            marginRight: 10
          }}
          onPress={() => navigation.getParam('sharePost')()}
        >
          Share
        </Text>
      )
    };
  }

  constructor(props: AddContentProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.navigation.setParams({
      sharePost: () => this.props.dispatch(sharePost())
    });
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
          <FormInput
            containerStyle={{
              borderBottomWidth: 0,
              minHeight: 200
            }}
            multiline={true}
            placeholder={'Share your experience...'}
            onChangeText={(content: string) => this.props.dispatch(enterContent(content))}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {this.props.images.map((image: ImageInfo, index: number) =>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  margin: 10
                }}
                resizeMode="cover"
                key={index}
                source={{uri: image.uri}}
              />
            )}
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                margin: 10,
                borderWidth: 2,
                borderColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={this.selectImage}
            >
              <Icon
                name="plus"
                type="font-awesome"
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  private selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      quality: 0.5
    });

    if (!result.cancelled) {
      this.props.dispatch(addImage(result));
    }
  }
}

const AddContentContainer = connect(mapStateToProps)(AddContent);

export default AddContentContainer;
