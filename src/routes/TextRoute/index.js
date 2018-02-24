import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getArchivedText } from 'reducers/featuredText/actions';

import TextBox from 'components/TextBox';

class TextRoute extends Component {
  constructor(props) {
    super(props);
    console.log('props? ', props)
    this.state = {
      loading: true,
      text: '',
    };
  }

  componentDidMount() {
    const { match: { params: { code = '0' }} } = this.props;
    setTimeout(() => {
      this.props.getArchivedText(code)
        .then((textData) => {
          let text = textData[0];
          const submitter = textData[1];
          const timestamp = textData[2];
          if(!text) {
            text = '404';
          }
          this.setState({ text });
        })
        .catch((error) => {
          console.log('got error? ', error)
          this.setState({ text: '404' })
        })
    })
  }

  render() {
    return (
      <div>
        <TextBox
          text={this.state.text}
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

export default connect(mapStateToProps, { getArchivedText })(TextRoute);
