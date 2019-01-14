import React from 'react';

// Components
import AuthContainer from 'src/components/AuthContainer';

// Locals
import withRedux from './withRedux';

@withRedux
export default class Home extends React.PureComponent {
  render() {
    return (
      <AuthContainer>
        {'hello word'}
      </AuthContainer>
    );
  }
}
