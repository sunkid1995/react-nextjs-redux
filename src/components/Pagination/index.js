import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

// css
import css from 'styled-jsx/css';

// Component
import SvgIcon from 'src/components/Commons/SvgIcon';

export default class Pagination extends React.Component {
  static propTypes = {
    curentPage: propTypes.number.isRequired,
    onChangePage: propTypes.func.isRequired,
    onChangePerpage: propTypes.func.isRequired,
    totalPages: propTypes.number.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      disablePrev: false,
      disableNext: false,
      stateColorPrev: { cursor: 'no-drop', borderColor: '#9b9b9b' },
      stateColorNext: { cursor: 'pointer', borderColor: '#e82e83' },
    };
    this.onClickChange = this.onClickChange.bind(this);
    this.getValueSelect = this.getValueSelect.bind(this);
  }
  componentDidMount() {
    const { curentPage, totalPages } = this.props;
    if (curentPage <= 1) this.setState({ disablePrev: true });

    if (curentPage >= totalPages) {
      this.setState({
        disableNext: true,
        stateColorNext: { ...this.state.stateColorNext, cursor: 'no-drop', borderColor: '#9b9b9b' },
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    const { curentPage, totalPages } = this.props;
    const { curentPage: nextCurentPage, totalPages: nextTotalPages } = nextProps;

    if (curentPage !== nextCurentPage) {
      if (curentPage >= 1) this.setState({
        disablePrev: false,
        stateColorPrev: { ...this.state.stateColorPrev, borderColor: '#e82e83', cursor: 'pointer' },
      });
      if (nextCurentPage <= 1) this.setState({
        disablePrev: true,
        stateColorPrev: { ...this.state.stateColorPrev, borderColor: '#9b9b9b', cursor: 'no-drop' },
      });
    }
    if (nextCurentPage >= totalPages) {
      this.setState({
        disableNext: true,
        stateColorNext: { ...this.state.stateColorNext, cursor: 'no-drop', borderColor: '#9b9b9b' },
      });
    }
    if (nextCurentPage < nextTotalPages) {
      this.setState({
        disableNext: false,
        stateColorNext: { ...this.state.stateColorNext, cursor: 'pointer', borderColor: '#e82e83' },
      });
    }
  }

  onClickChange(number) {
    const { curentPage, onChangePage } = this.props;
    if (number === -1 && number === 1) return;
    onChangePage(curentPage + number);
  }

  getValueSelect(event) {
    this.props.onChangePerpage(event.target.value);
  }

  next = () => this.onClickChange(1);
  prev = () => this.onClickChange(-1);

  render() {
    const { curentPage, totalPages } = this.props;
    const { disablePrev, disableNext, stateColorPrev, stateColorNext } = this.state;
    return (
      <Container className="cusstom-pagination" fluid>
        <Row className="cusstom-row-content">
          <Col>
            <div className="cusstom-content">
              <label className="cusstom-label">
                <p className="text-logs">{'Kết quả mỗi trang:'}</p>
              </label>
              <select
                className="cusstom-select"
                onChange={this.getValueSelect}
              >
                <option value="10">{'10'}</option>
                <option value="20">{'20'}</option>
                <option value="50">{'50'}</option>
                <option value="100">{'100'}</option>
              </select>
              <label className="cusstom-label">{'Trang: '}{curentPage}{':'}{totalPages}</label>
              <button
                className="btn"
                disabled={disablePrev}
                onClick={this.prev}
                style={stateColorPrev}
              >
                <SvgIcon name="chevron-left" size={10} />
              </button>
              <button
                className="btn"
                disabled={disableNext}
                onClick={this.next}
                style={stateColorNext}
              >
                <SvgIcon name="chevron-right" size={10} />
              </button>
            </div>
          </Col>
        </Row>
        <style jsx>{styles}</style>
      </Container>
    );
  }
}
const styles = css`
  :global(.cusstom-pagination) {
    background: white;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .cusstom-content {
    display: flex;
    float: right;
    margin: 10px 0px 10px 0px;
  }
  .cusstom-label {
    display: inline;
    font-weight: 300;
    max-width: unset;
    white-space: pre-line;
    color: #999999;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 5px;
  }
  .cusstom-select {
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    border-color: #e82e81;
    background: white;
    margin-left: 5px;
    // color: #999999;
  }
  .btn {
    margin: 0px 5px 0px 5px;
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    border-color: #e82e81;
  }
  .btn-no-drop {
    border-color: #999999;
    width: 38px; 
    height: 38px; 
    margin-left: 10px;
    cursor: no-drop;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    margin-top: 2px;
  }
  .text-logs {
    margin-bottom: 0;
  }
  @media screen and (max-width: 1600px) {
    .cusstom-select {
      height: 40px;
    }
    .btn {
      height: 40px;
    }
    .text-logs {
      width: 70px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 0;
    }
  }
`;
