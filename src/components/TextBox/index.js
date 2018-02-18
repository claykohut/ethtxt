import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './TextBoxStyle.css';

import { getFeaturedText } from 'reducers/featuredText/actions';

class TextBox extends Component {
  render() {
    const { featuredText } = this.props;
    return (
      <div className={styles.featuredTextBox}>
        <div className={styles.featuredText}>{ featuredText.text }</div>
      </div>
    )
  }
}

const mapStateToProps = ({ featuredText }) => ({
  featuredText,
});

export default connect(mapStateToProps, { getFeaturedText })(TextBox);
