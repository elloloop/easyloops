# NPM Scripts

## NPM Scripts ante enti?

**NPM scripts** ante `package.json` lo `scripts` section lo define chesina custom commands. Building, testing, running lanti common tasks automate cheyadaniki use chestham.

## Basic Syntax

`package.json` lo scripts define:

```json
{
  "name": "my-project",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack --mode production"
  }
}
```

Run: `npm run <script-name>`

## Standard Script Names

### Built-in ("run" avasaram ledu)

```bash
npm start     # "start" script run
npm test      # "test" script run
npm stop      # "stop" script run
```

### Custom ("run" kavali)

```bash
npm run dev
npm run build
npm run deploy
```

## Common Patterns

### Development

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "dev:watch": "webpack --watch"
  }
}
```

### Building

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  }
}
```

### Testing

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Lifecycle Hooks

Pre and post scripts automatic ga run avthayi.

```json
{
  "scripts": {
    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "npm run cleanup"
  }
}
```

`npm test` run chesthe:

1. `pretest`
2. `test`
3. `posttest`

## Script Chaining

### Sequential (&&)

One after another. Fail aithe stop.

```json
{
  "scripts": {
    "build": "npm run clean && npm run compile"
  }
}
```

### Parallel (&)

Simultaneously run.

```json
{
  "scripts": {
    "start": "npm run server & npm run client"
  }
}
```

## Arguments Pass Cheyadam

```bash
npm run dev -- --port 4000
```

## Environment Variables

```bash
PORT=4000 npm run dev
```

Or cross-env tho:

```json
{
  "scripts": {
    "dev": "cross-env PORT=4000 node server.js"
  }
}
```

## Best Practices

1. **Standard names**: `start`, `dev`, `build`, `test`
2. **Simple scripts**: Complex logic separate files lo
3. **Document**: README lo explain
4. **Cross-platform**: `cross-env`, `rimraf` use
5. **Error handling**: `|| true` use if needed

## Cross-Platform Commands

### File Operations

`rm -rf` badulu:

```json
{
  "scripts": {
    "clean": "rimraf dist"
  }
}
```

### Environment

`export`/`set` badulu:

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack"
  }
}
```

## Useful Commands

```bash
npm run              # List all scripts
npm run build --verbose  # Detailed output
```

---

_Note: Ee page inka development stage lo undi._
