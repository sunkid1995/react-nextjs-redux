import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Avatar = ({ size, src }) => {
  const props = !_.isEmpty(src)
    ? { src }
    : {
      src: '/static/images/placeholder-avatar.png',
      srcSet: '/static/images/placeholder-avatar@2x.png 2x',
    };

  return (
    <Fragment>
      <img {...props} />
      <style jsx>{`
        img {
          border-radius: 50%;
          height: ${size}px;
          width: ${size}px;
        }
      `}</style>
    </Fragment>
  );
};

Avatar.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
};

Avatar.defaultProps = {
  size: 50,
  src: null,
};

export default Avatar;
