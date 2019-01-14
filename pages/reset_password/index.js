import _ from 'lodash';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import AuthContainer from 'src/components/AuthContainer';

// Models
import User from 'src/models/User';

// Locals
import EmailBox from './EmailBox';
import PasswordsBox from './PasswordsBox';
import withRedux from './withRedux';

@withRedux
export default class ResetPassword extends React.PureComponent {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        token: PropTypes.string,
      }).isRequired,
    }).isRequired,
    user: PropTypes.instanceOf(User),
  };

  static defaultProps = {
    user: null,
  };

  initialCallback = ({ user }) => {
    if (user == null) return;
    Router.replace('/');
  };

  renderContent = () => {
    const { url: { query: { token } }, user } = this.props;

    // Hide this page's content when user still logged-on
    if (user != null) return null;

    return _.isEmpty(token) ? <EmailBox /> : <PasswordsBox token={token} />;
  };

  render() {
    return (
      <AuthContainer ignoreAuth initialCallback={this.initialCallback}>
        {this.renderContent()}
      </AuthContainer>
    );
  }
}
