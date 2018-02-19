import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveText } from 'reducers/featuredText/actions';

import Logo from 'components/Logo';
import Button from 'components/Button';
import styles from './HomeStyle.css';

class HomeRoute extends Component {
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
        <Logo />
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
            customStyle={styles.button}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { archiveText })(HomeRoute);
