import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';

import { getTransactionReceipt, getReceiptData } from 'reducers/featuredText/actions';

import styles from './ReceiptStyle.css';

class ReceiptRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: null,
      fromAddress: null,
      status: null,
      loading: true,
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

  checkForTransactionReceipt = () => {
    const { match: { params = {} } } = this.props;
    this.props.getTransactionReceipt({ tx: params.tx })
      .then((data) => {
        console.log('got response from receipt check? ', data);
        clearInterval(this.intervalId);
        this.setState({
          blockNumber: data.blockNumber,
          fromAddress: data.from,
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
        console.log('got event data? ');
        clearInterval(this.intervalId);
        const { returnValues: { text, code } } = receipt;
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

  getStatusText = () => {
    const { status } = this.state;
    if (!status) {
      return '';
    }
    return 'Processing. This may take a few minutes.';
  }

  getEtherscanLink = () => {
    const { match: { params = {} } } = this.props;
    const isRopsten = location.href.indexOf('ropsten.') !== -1;
    const prefix = isRopsten ? 'ropsten.' : '';
    return `https://${prefix}etherscan.io/tx/${params.tx}`;
  }

  render() {
    const { match: { params = {} } } = this.props;
    const { status, code, loading } = this.state;
    return (
      <div className={styles.receiptWrap}>
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
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

export default connect(mapStateToProps, { getTransactionReceipt, getReceiptData })(ReceiptRoute);
