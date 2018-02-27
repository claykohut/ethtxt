import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getArchivedText } from 'reducers/featuredText/actions';

import LoadingView from 'components/LoadingView';

import styles from 'routes/TextRoute/TextRouteStyle.css';

class TextRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      submitter: null,
      timestamp: null,
      displayDetail: 'time',
    };
  }

  componentDidMount() {
    const { match: { params: { code = '0' } } } = this.props;
    setTimeout(() => {
      this.props.getArchivedText(code)
        .then((textData) => {
          let text = textData[0];
          const submitter = textData[1];
          const timestamp = textData[2];
          if (!text) {
            text = '404';
          }
          this.setState({ text, submitter, timestamp });
        })
        .catch((error) => {
          this.setState({ text: '404' });
        });
    });
  }

  toggleDisplayDetail = () => {
    const { displayDetail } = this.state;
    const newDetail = displayDetail === 'time' ? 'submitter' : 'time';
    this.setState({
      displayDetail: newDetail,
    });
  }

  renderDetails = () => {
    const { submitter, timestamp, displayDetail } = this.state;

    if (!submitter || !timestamp) {
      return null;
    }
    return (
      <div className={styles.outerDetails}>
        <div className={styles.separator} />
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span onClick={this.toggleDisplayDetail}>{displayDetail === 'submitter' ? submitter : moment.unix(timestamp).format('LLLL')}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { text } = this.state;

    if (!text) {
      return <LoadingView />;
    }

    return (
      <div className={styles.textPageWrap}>
        <div className={styles.featuredText}>{ text }</div>
        { this.renderDetails() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

export default connect(mapStateToProps, { getArchivedText })(TextRoute);
