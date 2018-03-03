import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';

import { getTransactionReceipt, getReceiptData } from 'reducers/archivedText/actions';

import styles from './ReceiptStyle.css';

class ReceiptRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: null,
      fromAddress: null,
      status: null,
      loading: true,
      showingError: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkForTransactionReceipt();
      this.intervalId = setInterval(this.checkForTransactionReceipt, 2500);
    }, 250);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getStatusText = () => {
    const { status } = this.state;
    if (!status) {
      return '';
    }
    return 'Processing. This may take a few minutes.';
  }

  getEtherscanLink = () => {
    const { match: { params = {} } } = this.props;
    const isRopsten = window.location.href.indexOf('ropsten.') !== -1;
    const prefix = isRopsten ? 'ropsten.' : '';
    return `https://${prefix}etherscan.io/tx/${params.tx}`;
  }

  showErorr = (receipt) => {
    console.log('setting showing error to true..')
    this.setState({
      showingError: true,
    });
  }

  checkForTransactionReceipt = () => {
    const { match: { params = {} } } = this.props;
    this.props.getTransactionReceipt({ tx: params.tx })
      .then((receipt) => {
        clearInterval(this.intervalId);

        if (receipt.status === 0 || receipt.status === '0x0') {
          return this.showErorr(receipt);
        }

        this.setState({
          blockNumber: receipt.blockNumber,
          fromAddress: receipt.from,
        }, () => {
          this.getTxReceiptData();
          this.intervalId = setInterval(this.getTxReceiptData, 2500);
        });
      })
      .catch(() => {
        if (!this.state.status) {
          this.setState({
            status: 'pending',
          });
        }
      });
  }


  getTxReceiptData = () => {
    const { blockNumber, fromAddress } = this.state;
    const { match: { params = {} } } = this.props;
    this.props.getReceiptData({ blockNumber, fromAddress, tx: params.tx })
      .then((receipt) => {
        console.log('got event data? ', receipt);
        clearInterval(this.intervalId);
        const { returnValues: { code } } = receipt;
        this.setState({
          code,
          status: null,
          loading: false,
        });
      })
      .catch((err) => {
        console.log('in error from event data ', err);
      });
  }

  renderError = () => {
    return (
      <div>
        <div className={`${styles.title} ${styles.titleError}`}>Transaction Error</div>
        <div className={styles.statusText}>
          <div>There was an error with your transaction. This often means you didn't provide enough gas for the ETH network to process your transaction.</div>
          <div>Please try again with a higher gas limit.</div>
          <div>We recommend a minimum gas limit of 120k</div>
        </div>
        <Button
          text="Go Back"
          onClick={() => this.props.history.push('/')}
          customStyle={styles.button}
        />
      </div>
    );
  }

  renderContent = () => {
    const { match: { params = {} } } = this.props;
    const { code, loading, showingError } = this.state;

    if (showingError) {
      return this.renderError();
    }

    return (
      <div>
        <div className={styles.title}>Transaction Receipt</div>
        <a href={this.getEtherscanLink()} target="_blank" className={styles.transactionHash}>{params.tx}</a>
        <div className={styles.statusText}>{this.getStatusText()}</div>
        <Button
          text="Go to Text"
          onClick={() => {
            if (code) {
              this.props.history.push(`/${code}`);
            }
          }}
          customStyle={styles.button}
          loading={loading}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.receiptWrap}>
        { this.renderContent() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

export default connect(mapStateToProps, { getTransactionReceipt, getReceiptData })(ReceiptRoute);
