# NPM Dev in JavaScript/Node.js

## Setting Up Dev Script

Basic `package.json` configuration for development.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

Run: `npm run dev`

## Frontend Development

### React with Vite

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "@vitejs/plugin-react": "^3.0.0"
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

### Next.js Development

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Custom port:

```json
"dev": "next dev -p 4000"
```

## Backend Development

### Express with Nodemon

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

```javascript
// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### TypeScript Development

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^18.0.0"
  }
}
```

## Full-Stack Development

### Concurrent Frontend + Backend

```json
{
  "scripts": {
    "dev": "concurrently \"npm:dev:client\" \"npm:dev:server\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

### Using Turbo (Monorepo)

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  }
}
```

## Environment Variables

### .env Files

```bash
# .env.development
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=mongodb://localhost:27017/myapp
DEBUG=true
PORT=3000
```

### Loading in Node.js

```javascript
// Load dotenv
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
  console.log(`API: ${API_URL}`);
});
```

### Cross-env for Cross-Platform

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server.js"
  },
  "devDependencies": {
    "cross-env": "^7.0.3"
  }
}
```

## Watch Mode Examples

### TypeScript Watch

```json
{
  "scripts": {
    "dev": "tsc --watch",
    "dev:run": "concurrently \"tsc --watch\" \"nodemon dist/index.js\""
  }
}
```

### Webpack Watch

```json
{
  "scripts": {
    "dev": "webpack --watch --mode development"
  }
}
```

## Debugging in Dev Mode

### VS Code Launch Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "NPM Dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Node Inspector

```json
{
  "scripts": {
    "dev": "node --inspect server.js",
    "dev:break": "node --inspect-brk server.js"
  }
}
```

Connect Chrome DevTools to: `chrome://inspect`

## Hot Module Replacement

### Vite HMR

```javascript
// main.js
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Handle hot update
  });
}
```

### Webpack HMR

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    hot: true,
    port: 3000,
  },
};

// In your app
if (module.hot) {
  module.hot.accept();
}
```

## Performance Optimization

### Faster Builds with SWC

```json
{
  "scripts": {
    "dev": "vite --config vite.config.js"
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
});
```

### ESBuild for Speed

```json
{
  "scripts": {
    "dev": "esbuild src/index.js --bundle --outfile=dist/bundle.js --watch"
  }
}
```

## Common Development Patterns

### Proxy API Requests

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
};
```

### CORS in Development

```javascript
// server.js
const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
```

## Related Concepts

- [[wiki:package-json]] - NPM configuration
- [[wiki:environment-variables]] - Environment setup
- [[wiki:webpack]] - Build tools
