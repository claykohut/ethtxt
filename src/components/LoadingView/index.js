import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';

import styles from './LoadingViewStyle.css';

class LoadingView extends Component {
  render() {
    return (
      <div className={styles.loadingViewContainer}>
        <BarLoader
          color="#4561CB"
          height={6}
        />
      </div>
    );
  }
}

export default LoadingView;
