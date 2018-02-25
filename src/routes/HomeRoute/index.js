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
      showingWeb3Error: false
    }
  }

  onChangeText = (value) => {
    this.setState({
      inputText: value
    })
  }

  doArchiveText = () => {
    const { inputText } = this.state;
    const { web3 } = this.props;
    if(inputText.length === 0) {
      return;
    }
    if(!web3.injected) {
      return this.setState({
        showingWeb3Error: true,
      });
    }
    this.setState({
      doingArchive: true,
    })
    this.props.archiveText(inputText)
      .then((transactionHash) => {
        this.props.history.push(`/receipt/${transactionHash}`);
      })
      .finally(() => {
        this.setState({ doingArchive: false })
      })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.doArchiveText();
    }
  }

  render() {
    const { inputText, doingArchive, showingWeb3Error } = this.state;
    const { featuredText } = this.props;

    if(showingWeb3Error) {
      return (
        <div className={styles.errorWrap}>
          <div className={styles.errorText}>
            No injected web3 detected. You need to install something like <a className={styles.link} href="https://metamask.io/">metamask</a> to archive text on the Ethereum blockchain.
          </div>
          <Button
            text="Okay"
            customStyle={styles.errorButton}
            onClick={() => location.reload()}
          />
        </div>
      )
    }

    return (
      <div>
        <Logo />
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="New text here..."
            value={inputText}
            onKeyPress={this.handleKeyPress}
            onChange={(event) => this.onChangeText(event.target.value)}
          />
          <div className={styles.belowInputWrap}>
            <Button
              text="Archive this Text"
              onClick={this.doArchiveText}
              customStyle={styles.button}
              loading={this.state.doingArchive}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    featuredText: state.featuredText,
    web3: state.web3,
  }
}

export default connect(mapStateToProps, { archiveText })(HomeRoute);
