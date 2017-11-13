# Core

This is the core component for the [Department's Component library](https://www.npmjs.com/org/react-ag-components/).

It provides the following:

- Single base CSS and uikit css
- Base API client (includes global error handling)
- Automatic page loading spinner (if using Base APi client)
- PageWrapper for caching and message passing


## Install
```
npm i @react-ag-components/core --save
```
## Use in your project

### Base CSS and Uikit
Include the base.css and uikit.css in your `src/index.html` file
```
import '@react-ag-components/core/lib/styles/uikit.css'
import '@react-ag-components/core/lib/styles/base.css'
```

### Base API

Add this import to your project's arc/services/api/index.js

And use these instead of your local implementations.
```
import {get, post, put, del, formPost} from '@react-ag-components/core/lib/api'
```

If you are using the [Messages component](https://www.npmjs.com/package/@react-ag-components/messages) (> 0.0.3) then any REST errors will automatically be shown.

### Loadable Section
If you need a Spinner on the page while a REST call is being made, wrap part of your page inside `<LoadableSection>`
```

import LoadableSection from '@react-ag-components/core/lib/LoadableSection'

...

<LoadableSection>

  Anything inside here will be replaced with a spinner while an API call is in progress

</LoadableSection>

```

Note: any API errors will also stop the spinner.


### Page Wrapper


Use the `PageWrapper` to support caching and pass messages between pages.

```
import wrapPage from '@react-ag-components/core/lib/PageWrapper'
...

export default wrapPage()(Country)

```

To save an object to cache:
```
this.props.saveCache(yourObj)
```
To read the object from cache
```
let obj = this.props.cache.yourObj
```

To set a message for another page to show:
```
this.props.setMessage({success:'Success!'})
```
The message can be read and shown from a different page:
```
this.state = {
  success:props.success
}
```

## Contributing

Get the repository
```
git clone https://github.com/alphillips/core.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`
