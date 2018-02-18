import React, { Component } from 'react';

import styles from 'components/Button/ButtonStyle.css';

class Button extends Component {

  static defaultProps = {
      text: '',
      onClick: () => {}
  }

  render() {
    const { text, onClick } = this.props;
    return (
      <div className={styles.button} onClick={onClick}>{ text }</div>
    )
  }
}

export default Button;
