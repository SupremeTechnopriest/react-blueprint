const markdown = `

## File Structure

### Static Directory

The static directory contains all your static assets.  Images, fonts, stylesheets, and the \`index.html\`.

### Config Directory

The config directory contains your development and production config files.  They are provided to your application via \`WebpackProvidePlugin\`.

### Source(src) Directory

The source directory contains all your application views and logic.

- **actions** - Redux actions
- **components** - Reusable components
- **containers** - Container components (components that act as route handlers)
- **reducers** - Redux store reducers
- **selectors** - Redux store selectors
- **stores** - There is only one store in a Redux app.  This is kept in a directory to keep things uniform. 
- **utils** - Various utilities including a websocket dispatcher, superagent request factory, custom decorators, LocalStorage middleware, style abstractions/variables and application copy centrailization.

*Diagram of the tree structure:*

\`\`\`
.
├── LICENSE
├── README.md
├── config
│   ├── dev-config.js
│   └── prod-config.js
├── package.json
├── src
│   ├── actions
│   │   ├── UIActions.js
│   │   └── index.js
│   ├── components
│   │   ├── DevTools
│   │   │   └── DevTools.js
│   │   ├── Routes
│   │   │   └── Routes.js
│   │   └── index.js
│   ├── containers
│   │   ├── App
│   │   │   └── App.js
│   │   └── index.js
│   ├── index.js
│   ├── reducers
│   │   ├── UIReducer.js
│   │   └── index.js
│   ├── selectors
│   │   ├── RouteSelectors.js
│   │   ├── UISelectors.js
│   │   └── index.js
│   ├── stores
│   │   └── store.js
│   └── utils
│       ├── api.js
│       ├── copy.js
│       ├── decorators.js
│       ├── index.js
│       ├── localStorage.js
│       ├── style.js
│       └── websocket.js
├── static
│   ├── fonts
│   │   ├── clearsans
│   │   ├── clearsans_bold
│   │   ├── clearsans_bold_italic
│   │   ├── clearsans_italic
│   │   ├── clearsans_light
│   │   ├── clearsans_medium
│   │   ├── clearsans_medium_italic
│   │   ├── clearsans_thin
│   │   └── fonts.css
│   └── index.html
├── webpack
│   ├── dev.config.js
│   ├── prod.config.js
│   ├── webpack-dev-server.js
│   └── webpack-isomorphic-tools.js
└── webpack-assets.json
\`\`\`

`;

export default markdown;