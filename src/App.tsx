import * as React from 'react';
import {
  TabBarIOS, View
} from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import PostListContainer from './components/post-list/post-list';
import Test from './components/test';
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default class App extends React.Component<{}> {
  public render() {
    return (
      <Provider store={store}>
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="featured"
            title="Home"
            selected={true}
          >
            <View>
              <PostListContainer/>
              <Test/>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="favorites"
            selected={false}
          >
            <PostListContainer/>
          </TabBarIOS.Item>
        </TabBarIOS>
      </Provider>
    );
  }
}
