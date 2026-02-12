# NPM Scripts in JavaScript Projects

## Complete Example package.json

```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write src/**/*.{js,json,css}",
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "postbuild": "npm run size-report",
    "size-report": "size-limit",
    "start": "npm run dev"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0",
    "rimraf": "^3.0.2"
  }
}
```

## Real-World Examples

### React Project Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

### Node.js API Project

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --forceExit",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts",
    "migrate": "knex migrate:latest",
    "seed": "knex seed:run",
    "db:reset": "npm run migrate:rollback && npm run migrate && npm run seed"
  }
}
```

### Full-Stack Monorepo

```json
{
  "scripts": {
    "dev": "concurrently \"npm:dev:*\"",
    "dev:client": "cd packages/client && npm run dev",
    "dev:server": "cd packages/server && npm run dev",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd packages/client && npm run build",
    "build:server": "cd packages/server && npm run build",
    "test": "npm run test:client && npm run test:server",
    "test:client": "cd packages/client && npm test",
    "test:server": "cd packages/server && npm test"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

## Lifecycle Hooks in Practice

### Publishing Workflow

```json
{
  "scripts": {
    "preversion": "npm test",
    "version": "npm run build && git add -A dist",
    "postversion": "git push && git push --tags && npm publish",
    "prepublishOnly": "npm run test && npm run build"
  }
}
```

### Installation Hooks

```json
{
  "scripts": {
    "preinstall": "node scripts/check-node-version.js",
    "postinstall": "husky install",
    "prepare": "npm run build"
  }
}
```

## Advanced Script Patterns

### Conditional Scripts

Create a script file for complex logic:

```javascript
// scripts/deploy.js
const environment = process.argv[2];

if (environment === 'production') {
  console.log('Deploying to production...');
  // Production deploy logic
} else if (environment === 'staging') {
  console.log('Deploying to staging...');
  // Staging deploy logic
} else {
  console.error('Invalid environment');
  process.exit(1);
}
```

```json
{
  "scripts": {
    "deploy:prod": "node scripts/deploy.js production",
    "deploy:staging": "node scripts/deploy.js staging"
  }
}
```

### Dynamic Port Allocation

```javascript
// scripts/start-with-port.js
const { spawn } = require('child_process');
const getPort = require('get-port');

(async () => {
  const port = await getPort({ port: 3000 });
  process.env.PORT = port;

  spawn('node', ['server.js'], {
    stdio: 'inherit',
    env: process.env,
  });
})();
```

```json
{
  "scripts": {
    "start": "node scripts/start-with-port.js"
  }
}
```

## Using npm-run-all

### Run Scripts in Parallel

```json
{
  "scripts": {
    "watch": "npm-run-all --parallel watch:*",
    "watch:js": "webpack --watch",
    "watch:css": "sass --watch styles:dist",
    "watch:server": "nodemon server.js"
  }
}
```

### Run Scripts in Sequence

```json
{
  "scripts": {
    "build": "npm-run-all clean build:*",
    "clean": "rimraf dist",
    "build:js": "webpack",
    "build:css": "sass styles.scss dist/styles.css"
  }
}
```

## Environment Variables in Scripts

### Using dotenv

```javascript
// scripts/load-env.js
require('dotenv').config();
const { spawn } = require('child_process');

spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: process.env,
});
```

```json
{
  "scripts": {
    "start": "node scripts/load-env.js"
  }
}
```

### Multiple Environment Files

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node -r dotenv/config server.js dotenv_config_path=.env.development",
    "prod": "cross-env NODE_ENV=production node -r dotenv/config server.js dotenv_config_path=.env.production"
  }
}
```

## Testing Scripts

### Jest Configuration

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

### E2E Testing

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

## Helpful Utility Scripts

### Check Dependencies

```json
{
  "scripts": {
    "deps:check": "npm outdated",
    "deps:update": "npm update",
    "deps:audit": "npm audit",
    "deps:fix": "npm audit fix"
  }
}
```

### Code Quality

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "quality": "npm-run-all lint format:check type-check test"
  }
}
```

## Related Concepts

- [[wiki:npm-dev]] - Development workflows
- [[wiki:package-json]] - Package configuration
- [[wiki:build-tools]] - Build automation
