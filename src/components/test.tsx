import React from 'react';
import { Button } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { changeText } from './post/post-list.actions';

interface TestProps {
  dispatch: Dispatch;
}

class Test extends React.Component<TestProps> {
  constructor(props: TestProps) {
    super(props);
  }

  public render() {
        return (
            <Button title={'Change'} onPress={() => this.props.dispatch(changeText('test'))}/>
        );
    }
}

export default connect()(Test);
