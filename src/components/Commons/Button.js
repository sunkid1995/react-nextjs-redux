import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button as BootstrapButton } from 'reactstrap';
import MDSpinner from 'react-md-spinner';
import css from 'styled-jsx/css';

const Button = props => {
  const { children, loading, ...restProps } = props;

  return (
    <Fragment>
      <BootstrapButton {...restProps} disabled={loading}>
        {children}
        {loading && (
          <span className="btn-accessory-right">
            <MDSpinner singleColor="white" size={20} />
            <style jsx>{loadingStyles}</style>
          </span>
        )}
      </BootstrapButton>
    </Fragment>
  );
};

Button.propTypes = {
  ...BootstrapButton.propTypes,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  block: false,
  color: 'pink',
  loading: false,
  size: null,
};

const loadingStyles = css`
  .btn-accessory-right {
    position: absolute !important;
    right: 2rem;
  }
`;

export default Button;
