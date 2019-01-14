import { connect } from 'react-redux';
import { auth } from 'src/redux/actions';

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    deauthorize: () => dispatch(auth.deauthorize()),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
