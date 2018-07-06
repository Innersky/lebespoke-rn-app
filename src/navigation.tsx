import React from 'react';
import { Avatar } from 'react-native-elements';
import { createStackNavigator, NavigationScreenProp } from 'react-navigation';
import {
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import Post from './components/post/post';
import AddContentContainer from './components/post/post-editor/add-content';
import LoginContainer from './components/user/login';
import HomeContainer from './containers/home-page/home';
import { RootReducer } from './reducer';
import {connect} from 'react-redux';

const defaultHeaderStyle = {
  backgroundColor: '#000',
  borderBottomWidth: 0,
  paddingBottom: 10,
};

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeContainer,
    },
    Post: {
      screen: Post,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: (
      {navigation}: {navigation: NavigationScreenProp<{}>}) => {
      return {
        headerStyle: defaultHeaderStyle,
        headerTintColor: '#fff',
        headerTitleStyle: {},
        headerRight: (
          <Avatar
            small={true}
            rounded={true}
            source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
            avatarStyle={{
              marginRight: 20
            }}
          />
        ),
      };
    },
  }
);

const AddPostStack = createStackNavigator(
  {
    AddContent: {
      screen: AddContentContainer,
    },
  },
  {
    mode: 'modal',
    navigationOptions: (
      {navigation}: {navigation: NavigationScreenProp<{}>}) => {
      return {
        headerStyle: defaultHeaderStyle,
        headerTintColor: '#fff',
        headerTitleStyle: {}
      };
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Login: {
      screen: LoginContainer,
    },
    AddPost: {
      screen: AddPostStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export const navReducer = createNavigationReducer(RootStack);

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state: RootReducer) => state.nav,
);

const App = reduxifyNavigator(RootStack, 'root');

const mapStateToProps = (state: RootReducer) => ({
  state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);
