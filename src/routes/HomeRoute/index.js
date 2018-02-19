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
      inputText: '',
      doingArchive: false,
    }
  }

  onChangeText = (value) => {
    this.setState({
      inputText: value
    })
  }

  doArchiveText = () => {
    const { inputText } = this.state;

    this.props.archiveText(inputText)
      .then((transactionHash) => {
        this.props.history.push(`/receipt/${transactionHash}`);
      })
  }

  render() {
    const { inputText, doingArchive } = this.state;
    const { featuredText } = this.props;
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
            onClick={this.doArchiveText}
            customStyle={styles.button}
            loading={featuredText.submitting}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    featuredText: state.featuredText
  }
}

export default connect(mapStateToProps, { archiveText })(HomeRoute);
