import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { AppWithNavigationState, navMiddleware } from './navigation';
import rootReducer from './reducer';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, navMiddleware)
);

export default class App extends React.Component<{}> {
  public render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}
