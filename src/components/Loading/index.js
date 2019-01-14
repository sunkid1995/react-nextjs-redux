import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import css from 'styled-jsx/css';
import { Container } from 'reactstrap';
import MDSpinner from 'react-md-spinner';

export default class Loading extends React.Component {
  static propTypes = {
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  }
  componentDidMount() { }
  render() {
    const { data, loading } = this.props;
    return (
      <Container>
        {!loading && _.isEmpty(data) && <p className="error_message_data">{'Không có dữ liệu !'}</p>}
        <p className="cusstom-loading">
          {loading && <MDSpinner className="loading-local" singleColor={'#e82e83'} size={50} />}
        </p>
        <style jsx>{styles}</style>
      </Container>
    );
  }
}
const styles = css`
  :global(.loading-local) {
    margin-top: 70px;
  }
  .cusstom-loading {
    text-align: center;
  }
  .error_message_data {
    text-align: center;
    font-size: 25px;
    font-weight: 250;
    margin-top: 70px;
  }
`;
