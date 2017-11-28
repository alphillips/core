import React from 'react'
import blades from './blades.svg'
import tower from './tower.svg'
import './page-not-found.css'

class PageNotFound extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info:null,
      warning:null,
      success:null,
      error:null
    }
    // this.apiHook = (props.apiHook === false) ? false : true
  }

  componentDidMount() {
    // this.setState((prevState, props) => ({
    //   info:this.props.info,
    //   warning:this.props.warning,
    //   success:this.props.success,
    //   error:this.props.error
    // }))
    //
    // if(this.apiHook){
    //   observer.subscribe('error-listener', "error", function(who, data) {
    //     this.setState((prevState, props) => ({
    //       error:data
    //     }))
    //   }.bind(this))
    // }
  }


  componentWillUnmount = () => {
    // observer.unsubscribe('error-listener', "error")
  }

  render() {

    // based on https://codepen.io/pBun/pen/mkHvG

    return (
      <div className="page-not-found">
        <h1>Page not found</h1>
        <br />
        <br />
        <div className="windmill">
          <div className="tower">
            <img src={tower}  />
          </div>
          <div className="blades">
            <img src={blades}  />
          </div>
        </div>

      </div>
    )
  }
}

export default PageNotFound
