import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { NavigationProp, NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { store } from '../../App';
import PostListContainer from '../../components/post/post-list';
import { UserObj } from '../../components/user/login';
import { saveUserProfile } from '../../components/user/user.actions';
import { RootReducer } from '../../reducer';
import { GET_USER_INFO_API } from '../../urls';
import HttpRequestDelegate from '../../utils/http-request-delegate';
import ResponseData from '../../utils/interfaces/http-response';
import {Permissions} from 'expo';

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

interface UserInfoResponse extends ResponseData {
  user: UserObj;
}

interface HomeProps {
  navigation: NavigationScreenProp<HomeNavigationState>;
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
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

  public async componentWillMount() {
    HttpRequestDelegate.request(
      GET_USER_INFO_API,
      {},
      (data: UserInfoResponse) => {
        this.props.dispatch(saveUserProfile(data.user));
      }
    );
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
          flex: 1,
          backgroundColor: '#000'
        }}
      >
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#fff'
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100
            }}
          >
            <Button
              title={''}
              fontSize={0}
              icon={{
                name: 'plus',
                type: 'font-awesome',
                color: '#fff',
              }}
              backgroundColor={'#000'}
              borderRadius={20}
              buttonStyle={{
                paddingRight: 6,
                paddingLeft: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
              onPress={this.addPost}
            />
          </View>
          <PostListContainer navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }

  private addPost = () => {
    if (store.getState().login.user) {
      this.props.navigation.navigate('AddPost');
    } else {
      this.props.navigation.navigate('Login');
    }
  }
}

const HomeContainer = connect(() => ({}))(Home);

export default HomeContainer;
