# Core

Goals!
- Ideally, it will export out scss, project including could choose to modify what they want to import
- Move it off uikit, move it all to material-ui, esp grid

To do!
- Update all project with (radio/select/checkbox) npm component
- move page-alert into message component and remove from Core
- check what we are using in headings and see if we can move the styles out


> Note: Messages has 4 types, warning, info, error and success

## Usage

### Install
```
npm i @react-ag-components/core --save
```
### Use in your project
```
import Messages from '@react-ag-components/core'
```

```
<Messages />
```

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
