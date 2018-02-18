import React, { Component } from 'react';

import styles from './TextBoxStyle.css';

class TextBox extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className={styles.featuredTextBox}>
        <div className={styles.featuredText}>{ text }</div>
      </div>
    )
  }
}

export default TextBox;
