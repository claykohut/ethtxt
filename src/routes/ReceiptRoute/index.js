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
      fromAddress: null,
    }
  }

  componentDidMount() {
    console.log('about to start watch...');
    setTimeout(() => {
      this.checkForTransactionReceipt();
      this.intervalId = setInterval(this.checkForTransactionReceipt, 2500);
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkForTransactionReceipt = () => {
    console.log('in get tx receipt..')
    const { web3, match: { params = {} } } = this.props;
    web3.eth.getTransactionReceipt(params.tx, (err, data) => {
      console.log('response from tx receipt? ', err, ' data ', data)
      if(data) {
        clearInterval(this.intervalId);
        this.setState({
          blockNumber: data.blockNumber,
          fromAddress: data.from
        }, () => {
          this.getTxReceiptData();
          this.intervalId = setInterval(this.getTxReceiptData, 2500);
        });
      }
    })
  }

  getTxReceiptData = () => {
    const { blockNumber, fromAddress } = this.state;
    const { match: { params = {} } } = this.props;
    this.props.getReceiptData({ blockNumber, fromAddress, tx: params.tx })
      .then((receipt) => {
        clearInterval(this.intervalId);
        const { returnValues: { text, code } } = receipt;
        console.log('got receipt?? ', receipt)
        this.props.history.push(`/${code}`);
      })
      .catch((err) => {
        console.log('in error ', err)
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
