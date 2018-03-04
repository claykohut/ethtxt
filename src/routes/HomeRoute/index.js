import React, { Component } from 'react';
import { connect } from 'react-redux';

// local web3, not metamask
import Web3 from 'web3';
import { getProviderUrl } from 'utils/getWeb3';

import { archiveText } from 'reducers/archivedText/actions';

import Logo from 'components/Logo';
import Button from 'components/Button';
import LoadingView from 'components/LoadingView';

import styles from './HomeStyle.css';

// eslint-disable-next-line
import EthTxtContract from 'contracts/EthTxt.json';
const contract = require('truffle-contract');

const PROVIDER_URL = getProviderUrl();
const localProvider = new Web3.providers.HttpProvider(PROVIDER_URL);

const simpleStorage = contract(EthTxtContract);
simpleStorage.setProvider(localProvider);

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

      web3.eth.net.getNetworkType((err, netId) => {
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

  getContractAddress = () => {
    const { web3: { expectedNetwork } } = this.props;
    let networkId = 1;
    if (expectedNetwork === 'ropsten') {
      networkId = 3;
    }
    return EthTxtContract.networks[networkId].address;
  }

  getContractLink = () => {
    const { web3: { expectedNetwork } } = this.props;
    const address = this.getContractAddress();
    return `https://${expectedNetwork === 'ropsten' ? 'ropsten.' : ''}etherscan.io/address/${address}#code`;
  }

  renderTopLinks = () => {
    return (
      <div className={styles.topLinks}>
        <a href={this.getContractLink()} target="_blank" rel="noopener noreferrer">Smart Contract</a>
        <div className={styles.seperator} />
        <a href="https://github.com/claykohut/ethtxt" target="_blank" rel="noopener noreferrer">Github</a>
      </div>
    );
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
        { this.renderTopLinks() }
        <Logo />
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="Text goes here. (140 char max)"
            value={inputText}
            onKeyPress={this.handleKeyPress}
            onChange={event => this.onChangeText(event.target.value)}
            maxLength={140}
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
