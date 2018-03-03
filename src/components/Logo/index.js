import React, { Component } from 'react';

import styles from './LogoStyle.css';

class Logo extends Component {
  static defaultProps = {
    customStyle: '',
    onClick: () => {},
  }
  render() {
    const { customStyle, onClick } = this.props;
    return (
      <div className={`${styles.logo} ${customStyle}`} onClick={onClick}>ETHTXT</div>
    );
  }
}

export default Logo;
