import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';

import styles from './TextBoxStyle.css';

class TextBox extends Component {

  renderFeaturedText = () => {
    const { text } = this.props;
    if(!text) {
      return (
        <BarLoader
          color="#4561CB"
          height={6}
        />
      )
    }
    return (
      <div className={styles.featuredText}>{ text }</div>
    )
  }
  
  render() {
    return (
      <div className={styles.featuredTextBox}>
        { this.renderFeaturedText() }
      </div>
    )
  }

}

export default TextBox
