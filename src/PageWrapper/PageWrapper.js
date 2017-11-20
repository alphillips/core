import React from 'react'

import {setCacheData, getCacheData, addCacheData} from './../cache-service'

function wrapPage() {

  return function(WrappedComponent) {

    class PageWrapper extends React.Component {

      constructor(props) {
        super(props);
        let data = getCacheData('rex-data')
        this.rexData = {}
        if(data !== undefined && data !== null){
          this.rexData = data
        }

        this.success = null
        this.error = null
        let userMessage = getCacheData('user-message')
        if(userMessage !== undefined && userMessage !== null){
          setCacheData('user-message',null);
          if(userMessage.success){
            this.success = userMessage.success
          }
          if(userMessage.error){
            this.error = userMessage.error
          }
        }

        window.scrollTo(0, 0)
      }

      save = (data) => {
        addCacheData('rex-data',data)
      }

      getCache = (key) => {
        return getCacheData(key)
      }

      setMessage = (msg) => {
        setCacheData('user-message',msg)
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            saveCache={this.save}
            cache={this.rexData}
            getCache={this.getCache}
            setMessage={this.setMessage}
            success={this.success}
            error={this.error}
           />
        );
      }
    }

    return PageWrapper;
  }
}

export default wrapPage;
