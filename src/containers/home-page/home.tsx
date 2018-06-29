import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationProp, NavigationRoute, NavigationScreenProp } from 'react-navigation';
import PostListContainer from '../../components/post/post-list';

const headerButtons = [
  {
    element: () => <Text numberOfLines={1}>Post</Text>
  },
  {
    element: () => <Text numberOfLines={1}>Shopping</Text>
  },
];

enum HomeTab {
  Post,
  Shopping
}

interface HomeProps {
  navigation: NavigationScreenProp<HomeNavigationState>;
}

export interface HomeNavigationState {
  selectedTab: HomeTab;
  selectTab: () => void;
}

interface HomeState {
  selectedTab: HomeTab;
}

class Home extends React.Component<HomeProps, HomeState> {
  public static navigationOptions = (
    {navigation}: {navigation: NavigationScreenProp<HomeNavigationState>}) => {
    return {
      headerTitle: (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            title="POST"
            textStyle={{
              fontSize: 13,
              fontWeight: 'normal',
              color: '#fff'
            }}
            buttonStyle={{
              width: 70,
              borderBottomWidth: 3,
              borderBottomColor: '#fff',
              backgroundColor: '#000',
              padding: 0,
              paddingBottom: 5,
              marginRight: -20,
              marginBottom: -10
            }}
            onPress={() => {return; }}
          />
          <Button
            title="PRODUCT"
            textStyle={{
              fontSize: 13,
              fontWeight: 'normal',
              color: '#fff'
            }}
            buttonStyle={{
              width: 70,
              borderWidth: 0,
              backgroundColor: '#000',
              padding: 0,
              paddingBottom: 5,
              marginBottom: -10
            }}
            onPress={() => {return; }}
          />
        </View>
      ),
    };
  }

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      selectedTab: HomeTab.Post
    };
  }

  public componentDidMount() {
    this.props.navigation.setParams({
      selectedTab: this.state.selectedTab,
      selectTab: (tab: number) => this.setState({
        selectedTab: tab
      }),
    });
  }

  public render() {
    return (
      <View
        style={{
          backgroundColor: '#000'
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#fff'
          }}
        >
          <Button
            title={'Add post'}
            onPress={() => this.props.navigation.navigate('AddPost')}
          />
          <PostListContainer navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

export default Home;
