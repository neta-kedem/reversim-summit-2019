import React from 'react';
import cn from 'classnames';

const IconLink = ({href, icon, className, isLarge: _isLarge}) => (
  <a className={cn(className, 'text-cyan')} href={href} target="_blank" rel="noopener noreferrer">
    <i className={`fa fa-${icon}`} />
  </a>
);

export default IconLink;
