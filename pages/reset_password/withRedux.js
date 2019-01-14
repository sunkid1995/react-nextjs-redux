import reduxWrapper from 'next-redux-wrapper';

// Redux
import makeStore from 'src/redux/store';

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

function mapDispatchToProps(/* dispatch */) {
  return {
  };
}

export default function withRedux(WrappedComponent) {
  return reduxWrapper(makeStore, mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
