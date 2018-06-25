import React from 'react';
import { View } from 'react-native';
import { Button, FormInput, Icon, Text } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootReducer } from '../../reducer';
import { enterPassword, enterUsername, login } from './user.actions';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  profileImageSrc: string;
  email: string;
  type: string;
  description?: string;
}

interface LoginProps {
  username: string;
  password: string;
  navigation: NavigationScreenProp<{}>;
  dispatch: ThunkDispatch<RootReducer, {}, AnyAction>;
}

const mapStateToProps = (state: RootReducer) => {
  return {
    username: state.login.username,
    password: state.login.password
  };
};

class Login extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props);
  }

  public render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: 10
          }}
        >
          <Icon
            name="close"
            type="evilicon"
            onPress={() => this.props.navigation.goBack()}
            size={36}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Login</Text>
          <FormInput
            style={{
              margin: 10
            }}
            placeholder={'Username'}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text: string) => this.props.dispatch(enterUsername(text))}
          />
          <FormInput
            style={{
              margin: 10
            }}
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={(text: string) => this.props.dispatch(enterPassword(text))}
          />
          <Button
            title={'Login'}
            onPress={() => this.props.dispatch(login())}
          />
        </View>
      </View>
    );
  }
}

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
