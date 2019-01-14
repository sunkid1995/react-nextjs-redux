import { connect } from 'react-redux';
import { serviceApi } from 'src/redux/actions';

function mapStateToProps(state) {
  const { passwordForgotten } = state.serviceApi;
  return { passwordForgotten };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: email => dispatch(serviceApi.forgotPassword(email)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
