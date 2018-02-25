import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';

import styles from 'components/Button/ButtonStyle.css';

class Button extends Component {
  static defaultProps = {
    text: '',
    onClick: () => {},
    customStyle: '',
    loading: false,
  }

  renderLoader = () => {
    const { loading } = this.props;
    if (!loading) {
      return null;
    }
    return (
      <div className={styles.loader}>
        <BarLoader
          color="#FFF"
          height={6}
        />
      </div>
    );
  }

  render() {
    const {
      text, onClick, customStyle, loading,
    } = this.props;
    return (
      <div
        className={`${styles.button} ${customStyle} ${loading ? styles.buttonLoading : ''}`}
        onClick={onClick}
      >
        { this.renderLoader() }
        <span className={loading ? styles.hideText : null}>{ text }</span>
      </div>
    );
  }
}

export default Button;
