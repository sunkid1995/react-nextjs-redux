import reduxWrapper from 'next-redux-wrapper';

// Redux
import { auth } from 'src/redux/actions';
import makeStore from 'src/redux/store';

function mapStateToProps(/* state */) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    deauthorize: () => dispatch(auth.deauthorize()),
  };
}

export default function withRedux(WrappedComponent) {
  return reduxWrapper(makeStore, mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
