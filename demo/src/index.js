import React from 'react'
import {render} from 'react-dom'

import './uikit.css'
import './base.css'

import LoadableSection from '../../src/LoadableSection'
import Messages from '../../src'

let Demo = React.createClass({
  render() {
    return <div className="uikit-body">
      <LoadableSection>
        Hi
      </LoadableSection>

      <LoadableSection loading={true}>
      Im am spinning (you should nt see htis text)
      </LoadableSection>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
