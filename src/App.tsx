import * as React from 'react';
import { Avatar } from 'react-native-elements';
import {createStackNavigator, NavigationScreenProp} from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Post from './components/post/post';
import Home from './containers/home-page/home';
import rootReducer from './reducer';
import Login, {default as LoginContainer, User} from './components/user/login';
import HttpRequestDelegate from './utils/http-request-delegate';
import {GET_USER_INFO_API} from './urls';
import ResponseData from './utils/interfaces/http-response';
import AddContent from './components/post/post-editor/add-content';
import SelectImages from './components/post/post-editor/select-images';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const MainStack = createStackNavigator(
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
    navigationOptions: (
      {navigation}: {navigation: NavigationScreenProp<{}>}) => {
      return {
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
    SelectImages: {
      screen: SelectImages,
    },
    AddContent: {
      screen: AddContent,
    },
  },
  {
    headerMode: 'none'
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

interface UserInfoResponse extends ResponseData {
  username: string;
}

export default class App extends React.Component<{}> {
  public componentDidMount() {
    HttpRequestDelegate.request(
      GET_USER_INFO_API,
      {},
      (data: UserInfoResponse) => {

      }
    );
  }

  public render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
