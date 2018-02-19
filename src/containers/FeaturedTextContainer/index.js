import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFeaturedText } from 'reducers/featuredText/actions';

import TextBox from 'components/TextBox';
import Button from 'components/Button';

import styles from './FeaturedTextContainerStyle.css';

class FeaturedTextContainer extends Component {

  render() {
    return (
      <div>
        <TextBox
          text={this.props.featuredText.text}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ featuredText }) => ({
  featuredText,
});

export default connect(mapStateToProps, { getFeaturedText })(FeaturedTextContainer);
