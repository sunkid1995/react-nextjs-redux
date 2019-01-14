import _ from 'lodash';
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
export default class PasswordsBox extends React.PureComponent {
  static propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    passwordForgotten: buildRequestProps().isRequired,
  };

  constructor(props) {
    super(props);

    this.forgotPassword = props.forgotPassword.bind(this);
    this.state = { email: '', errorMessage: undefined, success: false };
  }

  componentDidUpdate(prevProps) {
    const { passwordForgotten } = this.props;
    const { passwordForgotten: prevPasswordForgotten } = prevProps;

    if (passwordForgotten !== prevPasswordForgotten)
      this.handleRequestChanged(passwordForgotten);
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
    if (this.props.passwordForgotten.loading) return;

    const { email } = this.state;
    this.forgotPassword(email);
  };

  onEmailChange = event => this.setState({ email: event.target.value, errorMessage: undefined });

  renderContent = () => {
    const { success } = this.state;

    if (success)
      return (
        <CardBody>
          <CardText>
            {'Xác nhận đổi mật khẩu đã được gửi vào email của bạn, vui lòng kiểm tra và làm theo hướng dẫn!'}
          </CardText>
        </CardBody>
      );

    const { passwordForgotten: { loading } } = this.props;
    
    return (
      <CardBody>
        <CardText>{'Vui lòng cung cấp Email để tiếp tục'}</CardText>
        <Form onSubmit={this.onSubmit}>
          <Input
            autoComplete="username email"
            autoFocus
            className="mt-3"
            onChange={this.onEmailChange}
            placeholder="Email"
          />
          <Button block className="mt-3" loading={loading}>{'Quên mật khẩu'}</Button>
        </Form>
      </CardBody>
    );
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="email-box mx-auto">
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
  .email-box {
    margin-top: 5rem;
    text-align: center;
    width: 20rem;
  }
`;
