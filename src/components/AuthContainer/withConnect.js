import { connect } from 'react-redux';
// import { auth } from 'src/redux/actions';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { rehydrated } = state.meta;
  return { rehydrated, user };
}

function mapDispatchToProps(/* dispatch */) {
  return {
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
