import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveText } from 'reducers/archivedText/actions';

import Logo from 'components/Logo';
import Button from 'components/Button';
import LoadingView from 'components/LoadingView';

import styles from './HomeStyle.css';

class HomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      doingArchive: false,
      showingError: false,
      errorType: null,
    };
  }

  onChangeText = (value) => {
    this.setState({
      inputText: value,
    });
  }

  checkValidNetwork = (networkId) => {
    const { web3 } = this.props;
    return web3.expectedNetwork === networkId;
  }

  doArchiveText = () => {
    const { inputText } = this.state;
    const { web3 } = this.props;

    if (inputText.length === 0) {
      return;
    }
    if (!web3.injected) {
      this.setState({
        showingError: true,
        errorType: 'inject-web3',
      });
      return;
    }
    web3.eth.getAccounts((err, accounts) => {
      if (err || accounts.length === 0) {
        this.setState({
          showingError: true,
          errorType: 'locked',
        });
        return;
      }

      console.log('get network?? ', web3)
      web3.eth.net.getNetworkType((err, netId) => {
        console.log('net id?? ', netId)
        if (err || !this.checkValidNetwork(netId)) {
          this.setState({
            showingError: true,
            errorType: 'wrong-network',
          });
          return;
        }

        this.setState({
          doingArchive: true,
        });
        this.props.archiveText(inputText)
          .then((transactionHash) => {
            this.props.history.push(`/receipt/${transactionHash}`);
          })
          .catch((err) => {
            console.log('got error from archive...', err);
          })
          .finally(() => {
            this.setState({ doingArchive: false });
          });
      });
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.doArchiveText();
    }
  }

  renderErrorText = () => {
    const { errorType } = this.state;
    const { web3 } = this.props;
    switch (errorType) {
      case 'inject-web3':
        return <div>No injected web3 detected. You need to install something like <a className={styles.link} href="https://metamask.io/">metamask</a> to archive text on the Ethereum blockchain.</div>;
      case 'locked':
        return (
          <div>
            <div>Your injected ETH account seems to be locked.</div>
            <div>Please unlock and try again.</div>
          </div>
        );
      case 'wrong-network':
        return (
          <div>
            <div>Your ETH wallet is connected to the wrong network.</div>
            <div>Make sure your ETH provider (Metamask or otherwise) is connected to { web3.expectedNetwork } and try again.</div>
          </div>
        );
      default:
        return <div>Unknown error. Please try again later.</div>;
    }
  }

  render() {
    const { inputText, doingArchive, showingError } = this.state;
    const { web3 } = this.props;
    if (!web3 || !web3.initialized) {
      return <LoadingView />;
    }
    if (showingError) {
      return (
        <div className={styles.errorWrap}>
          <div className={styles.errorText}>
            { this.renderErrorText() }
          </div>
          <Button
            text="Okay"
            customStyle={styles.errorButton}
            onClick={() => window.location.reload()}
          />
        </div>
      );
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
            onChange={event => this.onChangeText(event.target.value)}
          />
          <div className={styles.belowInputWrap}>
            <Button
              text="Archive this Text"
              onClick={this.doArchiveText}
              customStyle={styles.button}
              loading={doingArchive}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    archivedText: state.archivedText,
    web3: state.web3,
  };
};

export default connect(mapStateToProps, { archiveText })(HomeRoute);
