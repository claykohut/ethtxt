import React, { Component } from 'react';

import styles from 'components/Button/ButtonStyle.css';

class Button extends Component {

  static defaultProps = {
      text: '',
      onClick: () => {},
      customStyle: '',
  }

  render() {
    const { text, onClick, customStyle } = this.props;
    return (
      <div
        className={`${styles.button} ${customStyle}`}
        onClick={onClick}
      >
        { text }
      </div>
    )
  }
}

export default Button;
