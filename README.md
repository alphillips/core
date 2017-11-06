# Core

This is the core component for the [Department's Component library](https://www.npmjs.com/org/react-ag-components/).

It provides the following:

- Core single shared CSS (coming soon)
- Base API client (includes global error handling)
- Automatic page loading spinner (if using Base APi client)
- Generic PageWrapper (coming soon ... maybe)


## Install
```
npm i @react-ag-components/core --save
```
## Use in your project

### Base API

Add this import to your project's arc/services/api/index.js

And use these instead of your local implementations.
```
import {get, post, put, del, formPost} from '@react-ag-components/core/api'
```

If you are using the [Messages component](https://www.npmjs.com/package/@react-ag-components/messages) (> 0.0.3) then any REST errors will automatically be shown.

### Loadable Section
If you need a Spinner on the page while a REST call is being made, wrap part of your page inside `<LoadableSection>`
```

import LoadableSection from '@react-ag-components/core/LoadableSection'

...

<LoadableSection>

  Anything inside here will be replaced with a spinner while an API call is in progress

</LoadableSection>

```

Note: any API errors will also stop the spinner.

### Properties


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
