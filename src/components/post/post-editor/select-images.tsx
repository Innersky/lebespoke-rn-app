import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

interface SelectImagesProps {
  navigation: NavigationScreenProp<{}>;
}

class SelectImages extends React.Component<SelectImagesProps> {
  constructor(props: SelectImagesProps) {
    super(props);
  }

  public render() {
    return (
      <View>
        <Text>selectImage</Text>
        <Button
          title={'Next'}
          onPress={() => this.props.navigation.navigate('AddContent')}
        />
      </View>
    );
  }
}

export default SelectImages;
