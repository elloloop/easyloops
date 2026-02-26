# NPM Dev

## What is npm run dev?

`npm run dev` is a common command used to start a development server or run development scripts in Node.js projects. It executes the script defined under the `"dev"` key in the `package.json` file's `scripts` section.

## package.json Scripts

The `scripts` section in `package.json` defines custom commands.

```json
{
  "name": "my-project",
  "scripts": {
    "dev": "node server.js",
    "start": "node index.js",
    "build": "webpack --mode production",
    "test": "jest"
  }
}
```

Run with: `npm run dev`

## Common Dev Commands

### Development Server

Start a local development server with hot reload.

```json
"dev": "vite"
"dev": "next dev"
"dev": "react-scripts start"
"dev": "nodemon server.js"
```

### Watch Mode

Automatically rebuild on file changes.

```json
"dev": "webpack --watch"
"dev": "tsc --watch"
"dev": "rollup -c -w"
```

### Concurrent Commands

Run multiple commands simultaneously.

```json
"dev": "concurrently \"npm:dev:client\" \"npm:dev:server\"",
"dev:client": "vite",
"dev:server": "nodemon server.js"
```

## Dev vs Start vs Build

| Command         | Purpose     | Use Case                          |
| --------------- | ----------- | --------------------------------- |
| `npm run dev`   | Development | Local development with hot reload |
| `npm start`     | Production  | Run production-ready application  |
| `npm run build` | Compilation | Build for production deployment   |

## Development Features

### Hot Module Replacement (HMR)

Changes reflect instantly without full page reload.

### Source Maps

Debug original source code instead of compiled code.

### Auto-Restart

Server automatically restarts on code changes (nodemon).

### Environment Variables

Use `.env` files for development configuration.

```
# .env.development
API_URL=http://localhost:3000
DEBUG=true
```

## Common Development Tools

### For Frontend

**Vite**

```json
"dev": "vite"
```

**Next.js**

```json
"dev": "next dev"
```

**Create React App**

```json
"dev": "react-scripts start"
```

### For Backend

**Nodemon**

```json
"dev": "nodemon server.js"
```

**Node with Watch**

```json
"dev": "node --watch server.js"
```

**ts-node-dev**

```json
"dev": "ts-node-dev src/index.ts"
```

## Environment-Specific Configuration

### Development Mode

```json
"dev": "NODE_ENV=development node server.js"
```

### With Debugging

```json
"dev": "node --inspect server.js"
"dev:debug": "node --inspect-brk server.js"
```

## Script Flags and Arguments

Pass arguments to scripts:

```bash
npm run dev -- --port 4000
npm run dev -- --open --host
```

In package.json:

```json
"dev": "vite --port 3000 --open"
```

## Pre and Post Scripts

Automatically run scripts before/after:

```json
"predev": "echo Starting dev server...",
"dev": "vite",
"postdev": "echo Dev server stopped"
```

## Best Practices

### 1. Use Standard Names

Stick to conventional script names (`dev`, `start`, `build`, `test`).

### 2. Document Scripts

Add comments in package.json or README.

### 3. Environment Files

Use `.env.development` for dev-specific configs.

### 4. Fast Reload

Use tools with HMR for instant feedback.

### 5. Error Handling

Configure proper error reporting in dev mode.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port
npx kill-port 3000

# Use different port
npm run dev -- --port 4000
```

### Module Not Found

```bash
# Reinstall dependencies
npm install

# Clear cache
npm cache clean --force
```

### Slow Performance

- Check for infinite loops in watched files
- Exclude unnecessary directories from watch
- Use faster build tools (Vite vs Webpack)

## Related Concepts

- [[wiki:npm]] - NPM basics
- [[wiki:package-json]] - Package configuration
- [[wiki:environment-variables]] - Configuration
- [[wiki:build-tools]] - Development tools
