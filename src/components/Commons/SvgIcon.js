import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import InlineSvg from 'react-inlinesvg';

const SvgIcon = ({ className, name, size, wrapperTag }) => {
  const src = `/static/images/${name}.svg`;
  const wrapper = React.createFactory(wrapperTag);
  const props = { name, size, src, wrapper, wrapperTag, className: className || name };

  return (
    <Fragment>
      <InlineSvg {...props} />
      <style jsx>{`
        :global(span.isvg.${name}) {
          display: inline-block;
          width: ${size ? `${size}px` : 'unset'};
        }
      `}</style>
    </Fragment>
  );
};

SvgIcon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  wrapperTag: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: null,
  wrapperTag: 'span',
};

export default SvgIcon;
