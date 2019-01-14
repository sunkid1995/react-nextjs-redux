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

// Locals
import withConnect from './withConnect';

@withConnect
export default class EmailBox extends React.PureComponent {
  static propTypes = {
    passwordReset: buildRequestProps().isRequired,
    resetPassword: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.resetPassword = props.resetPassword.bind(this);
    this.state = { errorMessage: undefined, password: '', passwordConfirm: '', success: false };
  }

  componentDidUpdate(prevProps) {
    const { passwordReset } = this.props;
    const { passwordReset: prevPasswordReset } = prevProps;

    if (passwordReset !== prevPasswordReset)
      this.handleRequestChanged(passwordReset);
  }

  handleRequestChanged = ({ data, error, loading }) => {
    if (loading) return;

    if (error != null) {
      const { message: errorMessage } = error;
      this.setState({ errorMessage });
      return;
    }

    if (data != null) this.setState({ success: true });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.props.passwordReset.loading) return;

    const { token } = this.props;
    const { password, passwordConfirm } = this.state;
    this.resetPassword({ password, passwordConfirm, token });
  };

  onPasswordChange = event => this.setState({ errorMessage: undefined, password: event.target.value });
  onPasswordConfirmChange = event => this.setState({ errorMessage: undefined, passwordConfirm: event.target.value });

  renderContent = () => {
    const { success } = this.state;

    if (success)
      return (
        <CardBody className="pb-2">
          <CardText>
            {'Đổi mật khẩu thành công, vui lòng đăng nhập lại bằng mật khẩu mới!'}
          </CardText>
          <Link href="/">
            <Button color="link">{'Quay về Đăng nhập'}</Button>
          </Link>
        </CardBody>
      );

    const { passwordReset: { loading } } = this.props;

    return (
      <CardBody>
        <CardText>{'Vui lòng nhập Mật khẩu mới'}</CardText>
        <Form onSubmit={this.onSubmit}>
          <Input autoComplete="username email" hidden />
          <Input
            autoComplete="new-password"
            autoFocus
            className="mt-1"
            onChange={this.onPasswordChange}
            placeholder="Mật khẩu"
            type="password"
          />
          <Input
            autoComplete="new-password"
            className="mt-1"
            onChange={this.onPasswordConfirmChange}
            placeholder="Nhập lại mật khẩu"
            type="password"
          />
          <Button block className="mt-3" loading={loading}>{'Đổi mật khẩu'}</Button>
        </Form>
      </CardBody>
    );
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="passwords-box mx-auto">
        <Card>
          {this.renderContent()}
        </Card>
        <Alert className="mt-2" color="danger" isOpen={!_.isEmpty(errorMessage)}>
          {errorMessage}
        </Alert>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const styles = css`
  .passwords-box {
    margin-top: 5rem;
    text-align: center;
    width: 20rem;
  }

  .passwords-box :global(.btn-link) {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;
