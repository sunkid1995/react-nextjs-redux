import PropTypes from 'prop-types';

/* eslint-disable import/prefer-default-export */

export function buildRequestProps(dataProps) {
  return PropTypes.shape({
    data: dataProps || PropTypes.object,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
  });
}
