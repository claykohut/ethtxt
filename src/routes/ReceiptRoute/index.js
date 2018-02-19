import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getReceiptData } from 'reducers/featuredText/actions';

import styles from './ReceiptStyle.css';

class ReceiptRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Pending',
    }
  }

  componentDidMount() {
    console.log('about to start watch...');
    setTimeout(() => {
      const { web3, match: { params = {} } } = this.props;
      web3.eth.getTransactionReceipt(params.tx, (err, data) => {
        console.log('in response -- ', err, ' data ', data)
        if(data) {
          this.props.getReceiptData({ tx: params.tx, blockNum: 49 });
        }
      })
    }, 100)
  }

  render() {
    const { match: { params = {} }} = this.props;
    console.log('props? ', params.tx);
    const { status } = this.state;
    return (
      <div>
        <div className={styles.row}>Transaction: <span className={styles.valueText}>{params.tx}</span></div>
        <div>Status: <span className={styles.valueText}>{status}</span></div>
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
