import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';

import styles from './TextBoxStyle.css';

import { getFeaturedText } from 'reducers/featuredText/actions';

class TextBox extends Component {

  renderFeaturedText = () => {
    const { featuredText } = this.props;
    if(!featuredText.text) {
      return (
        <BarLoader
          color="#4561CB"
          height={6}
        />
      )
    }
    return (
      <div className={styles.featuredText}>{ featuredText.text }</div>
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

const mapStateToProps = ({ featuredText }) => ({
  featuredText,
});

export default connect(mapStateToProps, { getFeaturedText })(TextBox);
