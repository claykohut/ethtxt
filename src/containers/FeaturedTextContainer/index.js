import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFeaturedText, archiveText } from 'reducers/featuredText/actions';

import TextBox from 'components/TextBox';
import Button from 'components/Button';

import styles from './FeaturedTextContainerStyle.css';

class FeaturedTextContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  onChangeText = (value) => {
    this.setState({
      inputText: value
    })
  }

  render() {
    const { inputText } = this.state;
    return (
      <div>
        <TextBox
          text={this.props.featuredText.text}
        />
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="New text here..."
            value={inputText}
            onChange={(event) => this.onChangeText(event.target.value)}
          />
          <Button
            text="Archive this Text"
            onClick={() => {
              this.props.archiveText(inputText)
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ featuredText }) => ({
  featuredText,
});

export default connect(mapStateToProps, { getFeaturedText, archiveText })(FeaturedTextContainer);
