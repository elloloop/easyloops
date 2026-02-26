# NPM Dev

## npm run dev ante enti?

`npm run dev` ante Node.js projects lo development server start cheyadaniki or development scripts run cheyadaniki use chese command. Idi `package.json` file lo `scripts` section lo define chesina `"dev"` script ni execute chesthundi.

## package.json Scripts

`scripts` section lo custom commands define chestham.

```json
{
  "name": "my-project",
  "scripts": {
    "dev": "node server.js",
    "start": "node index.js",
    "build": "webpack --mode production"
  }
}
```

Run: `npm run dev`

## Common Dev Commands

### Development Server

Local development server start tho hot reload.

```json
"dev": "vite"
"dev": "next dev"
"dev": "nodemon server.js"
```

### Watch Mode

File changes aithe automatically rebuild.

```json
"dev": "webpack --watch"
"dev": "tsc --watch"
```

## Dev vs Start vs Build

| Command         | Purpose     | Use                     |
| --------------- | ----------- | ----------------------- |
| `npm run dev`   | Development | Local development       |
| `npm start`     | Production  | Production app run      |
| `npm run build` | Build       | Production deploy kosam |

## Development Features

- **Hot Reload**: Changes instant ga reflect
- **Source Maps**: Original code debug
- **Auto-Restart**: Code change aithe auto restart
- **Environment Variables**: `.env` files use

## Common Tools

### Frontend

- **Vite**: `"dev": "vite"`
- **Next.js**: `"dev": "next dev"`
- **React**: `"dev": "react-scripts start"`

### Backend

- **Nodemon**: `"dev": "nodemon server.js"`
- **Node Watch**: `"dev": "node --watch server.js"`

## Environment Variables

```bash
# .env.development
API_URL=http://localhost:3000
DEBUG=true
PORT=3000
```

Load in code:

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

## Script Arguments

```bash
npm run dev -- --port 4000
npm run dev -- --open
```

## Pre/Post Scripts

```json
"predev": "echo Starting...",
"dev": "vite",
"postdev": "echo Stopped"
```

## Best Practices

1. Standard names use (`dev`, `start`, `build`)
2. Scripts document cheyandi
3. `.env` files development config kosam
4. HMR use chesi fast feedback
5. Error reporting proper ga configure

## Troubleshooting

### Port Already in Use

```bash
npx kill-port 3000
npm run dev -- --port 4000
```

### Module Not Found

```bash
npm install
npm cache clean --force
```

---

_Note: Ee page inka development stage lo undi._
