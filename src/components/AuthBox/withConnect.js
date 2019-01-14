import { connect } from 'react-redux';
import { auth, serviceApi } from 'src/redux/actions';

function mapStateToProps(state) {
  const { emailAuth } = state.serviceApi;
  return { emailAuth };
}

function mapDispatchToProps(dispatch) {
  return {
    authWithEmail: credentials => dispatch(serviceApi.authWithEmail(credentials)),
    authorize: user => dispatch(auth.authorize(user)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
