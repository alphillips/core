import React from 'react'
import observer from 'node-observer'
import Spinner from 'react-spinner-material'

class LoadableSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }

  componentDidMount() {
    observer.subscribe('load-listener', "section-loading", function(who, data) {
      this.setState((prevState, props) => ({
        loading:data.loading
      }))
    }.bind(this))
  }

  render() {
    return (
      <div>
        {this.state.loading &&
          <Spinner
            size={30}
            spinnerColor={"#1B7991"}
            spinnerWidth={2}
            visible={true}
          />
        }

        {!this.state.loading &&
        <div>
          {this.props.children}
        </div>
        }
      </div>
    )
  }
}

export default LoadableSection
