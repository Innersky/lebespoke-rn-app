import { ImagePicker } from 'expo';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, FormInput, Icon, Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootReducer } from '../../../reducer';
import { addImage, enterContent, enterTitle, sharePost } from './post-editor.action';
import ImageInfo = ImagePicker.ImageInfo;
import { PostEditorReduxState } from './post-editor.reducer';

interface AddContentProps extends PostEditorReduxState {
  navigation: NavigationScreenProp<{}>;
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
  images: ImageInfo[];
  content: string;
}

const mapStateToProps: (state: RootReducer) => PostEditorReduxState = (state: RootReducer) => {
  return {
    images: state.postEditor.images,
    content: state.postEditor.content,
    submitting: state.postEditor.submitting,
    title: state.postEditor.title
  };
};

interface AddContentNavigatorParams {
  sharePost: () => void;
  submitting: boolean;
}

class AddContent extends React.Component<AddContentProps> {
  public static navigationOptions = (
    {navigation}: {navigation: NavigationScreenProp<{
        params: AddContentNavigatorParams
      }, AddContentNavigatorParams>}) => {
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
          onPress={() => navigation.state.params.sharePost()}
        >
          {navigation.getParam('submitting') &&
            <Icon
              type="font-awesome"
              name="spinner"
            />
          }
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
      sharePost: () => this.props.dispatch(sharePost()),
      submitting: false
    });
  }

  // public componentWillReceiveProps(nextProps: AddContentProps) {
  //   this.props.navigation.setParams({
  //     submitting: nextProps.submitting
  //   });
  // }

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
            placeholder={'Title'}
            onChangeText={(title: string) => this.props.dispatch(enterTitle(title))}
          />
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
      quality: 0
    });

    if (!result.cancelled) {
      this.props.dispatch(addImage(result));
    }
  }
}

const AddContentContainer = connect(mapStateToProps)(AddContent);

export default AddContentContainer;
