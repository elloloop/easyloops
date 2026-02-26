# NPM Scripts

## What are NPM Scripts?

**NPM scripts** are custom commands defined in the `scripts` section of `package.json` that automate common tasks like building, testing, and running your application. They provide a standardized way to execute project tasks across different environments.

## Basic Syntax

Define scripts in `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack --mode production"
  }
}
```

Run with: `npm run <script-name>`

## Standard Script Names

### Built-in Scripts (No "run" needed)

```bash
npm start      # Runs "start" script
npm test       # Runs "test" script
npm stop       # Runs "stop" script
npm restart    # Runs "restart" script
```

### Custom Scripts (Need "run")

```bash
npm run dev
npm run build
npm run deploy
```

## Common Script Patterns

### Development

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "dev:watch": "webpack --watch",
    "dev:debug": "node --inspect server.js"
  }
}
```

### Building

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "build:clean": "rm -rf dist && npm run build"
  }
}
```

### Testing

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run"
  }
}
```

## Lifecycle Hooks

NPM automatically runs scripts before and after certain commands.

### Pre and Post Hooks

```json
{
  "scripts": {
    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "npm run cleanup"
  }
}
```

Running `npm test` executes:

1. `pretest`
2. `test`
3. `posttest`

### Lifecycle Events

```json
{
  "scripts": {
    "prepare": "npm run build",
    "prepublishOnly": "npm test",
    "preversion": "npm test",
    "version": "npm run format && git add -A",
    "postversion": "git push && git push --tags"
  }
}
```

## Chaining Scripts

### Sequential Execution (&&)

Run commands one after another. Stops if any fails.

```json
{
  "scripts": {
    "build": "npm run clean && npm run compile && npm run minify"
  }
}
```

### Parallel Execution (&)

Run commands simultaneously.

```json
{
  "scripts": {
    "start": "npm run server & npm run client"
  }
}
```

### Using npm-run-all

```json
{
  "scripts": {
    "clean": "rm -rf dist",
    "build:js": "webpack",
    "build:css": "sass styles.scss dist/styles.css",
    "build": "npm-run-all clean build:*"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

## Passing Arguments

### Double Dash (--)

```bash
npm run dev -- --port 4000 --host 0.0.0.0
```

In script:

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

Becomes: `vite --port 4000 --host 0.0.0.0`

### Environment Variables

```bash
PORT=4000 npm run dev
```

Or using cross-env:

```json
{
  "scripts": {
    "dev": "cross-env PORT=4000 node server.js"
  }
}
```

## Referencing Scripts

### Call Other Scripts

```json
{
  "scripts": {
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "build": "webpack"
  }
}
```

### Using npm-run syntax

```json
{
  "scripts": {
    "start:all": "npm-run-all --parallel start:*",
    "start:server": "node server.js",
    "start:client": "vite"
  }
}
```

## Environment-Specific Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "start:dev": "NODE_ENV=development nodemon server.js",
    "start:prod": "NODE_ENV=production node server.js",
    "start:staging": "NODE_ENV=staging node server.js"
  }
}
```

## Scripting Best Practices

### 1. Use Standard Names

Stick to conventional names: `start`, `dev`, `build`, `test`, `lint`.

### 2. Keep Scripts Simple

Complex logic belongs in separate script files, not package.json.

### 3. Document Scripts

Add comments or maintain a scripts section in README.

### 4. Cross-Platform Compatibility

Use tools like `cross-env`, `rimraf` instead of platform-specific commands.

### 5. Error Handling

Use `|| true` to prevent errors from stopping the build.

```json
{
  "scripts": {
    "lint": "eslint . || true"
  }
}
```

## Cross-Platform Commands

### File Operations

Instead of `rm -rf`:

```json
{
  "scripts": {
    "clean": "rimraf dist"
  },
  "devDependencies": {
    "rimraf": "^3.0.2"
  }
}
```

### Environment Variables

Instead of `export` or `set`:

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack"
  },
  "devDependencies": {
    "cross-env": "^7.0.3"
  }
}
```

## Advanced Patterns

### Silent Execution

```json
{
  "scripts": {
    "silent": "npm run build --silent"
  }
}
```

### Conditional Execution

```bash
npm run test && npm run deploy
npm run test || echo "Tests failed"
```

### Multi-Step Workflows

```json
{
  "scripts": {
    "deploy": "npm run test && npm run build && npm run upload",
    "test": "jest",
    "build": "webpack",
    "upload": "scp -r dist/ server:/var/www"
  }
}
```

## Debugging Scripts

### Verbose Output

```bash
npm run build --verbose
```

### See What Would Run

```bash
npm run build --dry-run
```

### List All Scripts

```bash
npm run
```

## Related Concepts

- [[wiki:npm-dev]] - Development scripts
- [[wiki:package-json]] - NPM configuration
- [[wiki:build-tools]] - Build automation
