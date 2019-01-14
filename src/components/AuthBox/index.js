import _ from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Card, CardBody, CardText, Form, Input } from 'reactstrap';
import css from 'styled-jsx/css';

// Components
import Button from 'src/components/Commons/Button';

// Constants
import { buildRequestProps } from 'src/constants/Props';

// Models
import User from 'src/models/User';

// Locals
import withConnect from './withConnect';

@withConnect
export default class AuthBox extends React.PureComponent {
  static propTypes = {
    authWithEmail: PropTypes.func.isRequired,
    authorize: PropTypes.func.isRequired,
    emailAuth: buildRequestProps(PropTypes.instanceOf(User)).isRequired,
  };

  constructor(props) {
    super(props);

    this.authWithEmail = props.authWithEmail.bind(this);
    this.authorize = props.authorize.bind(this);
    this.state = { email: '', errorMessage: undefined, password: '' };
  }

  componentDidUpdate(prevProps) {
    const { emailAuth } = this.props;
    const { emailAuth: prevEmailAuth } = prevProps;

    if (emailAuth !== prevEmailAuth)
      this.handleRequestChanged(emailAuth);
  }

  handleRequestChanged = ({ data: user, error, loading }) => {
    if (loading) return;

    if (error != null) {
      const { message: errorMessage } = error;
      this.setState({ errorMessage });
      return;
    }

    if (user != null) this.authorize(user);
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.props.emailAuth.loading) return;
    
    const { email, password } = this.state;
    this.authWithEmail({ email, password });
  };

  onEmailChange = event => this.setState({ email: event.target.value, errorMessage: undefined });
  onPasswordChange = event => this.setState({ errorMessage: undefined, password: event.target.value });

  renderContent = () => {
    const { emailAuth: { loading } } = this.props;

    return (
      <Card>
        <CardBody className="pb-2">
          <CardText>{'Vui lòng đăng nhập để tiếp tục'}</CardText>
          <Form onSubmit={this.onSubmit}>
            <Input
              autoComplete="username email"
              autoFocus
              className="mt-3"
              onChange={this.onEmailChange}
              placeholder="Email"
            />
            <Input
              autoComplete="current-password"
              className="mt-1"
              onChange={this.onPasswordChange}
              placeholder="Mật khẩu"
              type="password"
            />
            <Button block className="mt-3" loading={loading}>{'Đăng nhập'}</Button>
            <Link href="/reset_password">
              <Button className="mt-2" color="link">{'Quên mật khẩu'}</Button>
            </Link>
          </Form>
        </CardBody>
      </Card>
    );
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="auth-box mx-auto">
        {this.renderContent()}
        <Alert className="mt-2" color="danger" isOpen={!_.isEmpty(errorMessage)}>
          {errorMessage}
        </Alert>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const styles = css`
  .auth-box {
    margin-top: 5rem;
    text-align: center;
    width: 20rem;
  }

  .auth-box :global(.btn-link) {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;
