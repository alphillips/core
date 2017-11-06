import React from 'react'
import observer from 'node-observer'
// import Spinner from 'react-spinner-material'
import Spinner from './../Spinner'

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

  componentWillUnmount = () => {
    observer.unsubscribe('load-listener', "section-loading")
  }

  render() {

    const loading = this.props.loading || this.state.loading

    return (
      <div>
        {loading &&
          <Spinner
            size={50}
            spinnerColor={"#1B7991"}
            spinnerWidth={4}
            visible={true}
          />
        }

        {!loading &&
        <div>
          {this.props.children}
        </div>
        }
      </div>
    )
  }
}

export default LoadableSection
