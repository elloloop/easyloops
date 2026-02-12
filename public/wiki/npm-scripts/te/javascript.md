# JavaScript lo NPM Scripts

## Complete Example

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "clean": "rimraf dist",
    "prebuild": "npm run clean"
  }
}
```

## Real Examples

### React Project

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
  }
}
```

### Node.js API

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --forceExit",
    "migrate": "knex migrate:latest"
  }
}
```

### Full-Stack

```json
{
  "scripts": {
    "dev": "concurrently \"npm:dev:*\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

## Lifecycle Hooks

### Publishing

```json
{
  "scripts": {
    "preversion": "npm test",
    "version": "npm run build",
    "postversion": "git push && npm publish"
  }
}
```

## npm-run-all Use

### Parallel

```json
{
  "scripts": {
    "watch": "npm-run-all --parallel watch:*",
    "watch:js": "webpack --watch",
    "watch:css": "sass --watch styles:dist"
  }
}
```

### Sequential

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

## Testing Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:e2e": "playwright test"
  }
}
```

## Utility Scripts

### Dependencies Check

```json
{
  "scripts": {
    "deps:check": "npm outdated",
    "deps:update": "npm update",
    "deps:audit": "npm audit"
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
    "type-check": "tsc --noEmit"
  }
}
```

## Tips

- Standard script names use cheyandi
- Complex logic separate files lo unchandi
- `npm-run-all` parallel/sequential kosam
- Lifecycle hooks (pre/post) automatic
- `cross-env` cross-platform environment variables kosam
- `rimraf` cross-platform file deletion kosam
- `npm run` all scripts list chesthundi

---

_Note: Ee page inka development stage lo undi._
