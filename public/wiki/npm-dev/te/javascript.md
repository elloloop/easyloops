# JavaScript/Node.js lo NPM Dev

## Dev Script Setup

Basic `package.json` configuration.

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "node server.js"
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
    "build": "vite build"
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
});
```

### Next.js

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

## Backend Development

### Express with Nodemon

```json
{
  "scripts": {
    "dev": "nodemon server.js"
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
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
```

### TypeScript Development

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}
```

## Full-Stack Development

Frontend + Backend concurrent ga run.

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

## Environment Variables

### .env File

```bash
# .env.development
NODE_ENV=development
API_URL=http://localhost:3000
PORT=3000
```

### Node.js lo Load

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
```

### Cross-Platform

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server.js"
  }
}
```

## Watch Mode

### TypeScript Watch

```json
{
  "scripts": {
    "dev": "tsc --watch"
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

## Debugging

### Node Inspector

```json
{
  "scripts": {
    "dev": "node --inspect server.js"
  }
}
```

Chrome DevTools lo: `chrome://inspect`

## Hot Module Replacement

### Vite HMR

```javascript
if (import.meta.hot) {
  import.meta.hot.accept();
}
```

### Webpack HMR

```javascript
if (module.hot) {
  module.hot.accept();
}
```

## Common Patterns

### API Proxy

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
```

### CORS Setup

```javascript
const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
```

## Tips

- `nodemon` auto-restart kosam
- `.env` files environment config kosam
- Vite/esbuild fast builds kosam
- HMR instant updates kosam
- `concurrently` multiple scripts kosam
- Port conflicts avoid cheyadam

---

_Note: Ee page inka development stage lo undi._
