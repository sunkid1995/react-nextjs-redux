import _ from 'lodash';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Container } from 'reactstrap';

// Components
import AuthBox from 'src/components/AuthBox';
import HeaderBar from 'src/components/HeaderBar';

// Constants
import { IN_DEV_MODE } from 'src/constants';

// Models
import User from 'src/models/User';

// Locals
import withConnect from './withConnect';

if (IN_DEV_MODE) {
  Object.assign(global, {
    _: require('lodash'),
    $: require('lodash/fp'),
    moment: require('moment'),
    numeral: require('numeral'),
  });
}

@withConnect
export default class AuthContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    ignoreAuth: PropTypes.bool,
    initialCallback: PropTypes.func,
    rehydrated: PropTypes.bool.isRequired,
    user: PropTypes.instanceOf(User),
  };

  static defaultProps = {
    children: null,
    ignoreAuth: false,
    initialCallback: null,
    user: null,
  };

  componentDidMount() {
    Router.onRouteChangeStart = () => NProgress.start();
    Router.onRouteChangeError = () => NProgress.done();
    Router.onRouteChangeComplete = () => NProgress.done();
  }

  componentDidUpdate(prevProps) {
    const { rehydrated } = this.props;
    const { rehydrated: prevRehydrated } = prevProps;

    if (rehydrated && !prevRehydrated)
      this.performInitialCallback();
  }

  performInitialCallback = () => {
    const { initialCallback, user } = this.props;

    if (user != null) {
      // Additionally refresh user profile to update profile changes over-the-air
      // this.getProfile();

      // Get static data
      // this.getMemberships();
      // this.getSaleStaffs();
    }

    // Perform initial callback passed from child component
    if (initialCallback != null) initialCallback({ user });
  }

  renderContent = () => {
    const { children, ignoreAuth, rehydrated, user } = this.props;
    if (!rehydrated) return null;

    const renderChildren = ignoreAuth || !_.isEmpty(user);

    return (
      <Container fluid>
        {renderChildren ? children : <AuthBox />}
      </Container>
    );
  };

  render() {
    return (
      <Fragment>
        <HeaderBar />
        {this.renderContent()}
      </Fragment>
    );
  }
}
