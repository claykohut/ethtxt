import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BarLoader } from 'react-spinners';

import { getReceiptData } from 'reducers/featuredText/actions';

import styles from './ReceiptStyle.css';

class ReceiptRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: null,
    }
  }

  componentDidMount() {
    console.log('about to start watch...');
    this.intervalId  = setInterval(this.checkForTransactionReceipt, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkForTransactionReceipt = () => {
    console.log('in get tx receipt..')
    const { web3, match: { params = {} } } = this.props;
    web3.eth.getTransactionReceipt(params.tx, (err, data) => {
      if(data) {
        clearInterval(this.intervalId);
        this.setState({ blockNumber: data.blockNumber });
        this.intervalId = setInterval(this.getTxReceiptData, 1000);
      }
    })
  }

  getTxReceiptData = () => {
    const { blockNumber } = this.state;
    const { match: { params = {} } } = this.props;
    this.props.getReceiptData({ blockNumber, tx: params.tx })
      .then((receipt) => {
        clearInterval(this.intervalId);
        const { args: { text, textId } } = receipt;
        this.props.history.push(`/text/${textId.toNumber()}`);
      })
  }

  render() {
    const { match: { params = {} }} = this.props;
    const { status } = this.state;
    return (
      <div>
        <BarLoader
          color="#4561CB"
          height={6}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3
  }
}

export default connect(mapStateToProps, { getReceiptData })(ReceiptRoute);
