import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import {selectProfileImage, updateProfileImage} from '../../user/user.actions';
import {ImagePicker} from 'expo';
import {RootReducer} from '../../../reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {selectImages} from './post-editor.action';

interface SelectImagesProps {
  navigation: NavigationScreenProp<{}>;
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
}

class SelectImages extends React.Component<SelectImagesProps> {
  constructor(props: SelectImagesProps) {
    super(props);
  }

  public render() {
    return (
      <View>
        <Button
          title={'Select Image'}
          onPress={this.selectImage}
        />
      </View>
    );
  }

  private selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: 'Images',
      quality: 0
    });

    if (!result.cancelled) {
      this.props.dispatch(selectImages([result]));
      this.props.navigation.navigate('AddContent');
    }
  }
}

export default SelectImages;
