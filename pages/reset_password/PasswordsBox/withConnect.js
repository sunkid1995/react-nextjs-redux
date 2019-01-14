import { connect } from 'react-redux';
import { serviceApi } from 'src/redux/actions';

function mapStateToProps(state) {
  const { passwordReset } = state.serviceApi;
  return { passwordReset };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: credentials => dispatch(serviceApi.resetPassword(credentials)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
