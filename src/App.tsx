import * as React from 'react';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Post from './components/post-list/post';
import Home from './containers/home-page/home';
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Post: {
      screen: Post,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {},
      headerRight: (
        <Avatar
          small={true}
          rounded={true}
          source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
          onPress={() => alert('This is a button!')}
          activeOpacity={0.7}
          avatarStyle={{
            marginRight: 20
          }}
        />
      ),
    },
  }
);

export default class App extends React.Component<{}> {
  public render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
