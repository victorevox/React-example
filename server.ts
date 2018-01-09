
import * as express from 'express';
import * as methodOverride from "method-override";
import { join, resolve } from 'path';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { json, urlencoded } from "body-parser";
import { config as dotEnvConfig } from "dotenv";

import { api_routes } from "./server/routes/api.routes";
import { dbConfig } from './server/config/db';
import { PassportConfig } from "./server/config/passport";

// const DIST_FOLDER = join(process.cwd(), 'dist');
const DIST_FOLDER = join(process.cwd(), 'app/build');

//Read env variables
if (existsSync(join(__dirname, '/../.env'))) {
  let envPath = join(__dirname, '/../.env');
  dotEnvConfig({ path: envPath });
} else if (existsSync(join(__dirname, '/../.env.example'))) {
  let envPath = join(__dirname, '/../.env.example');
  dotEnvConfig({ path: envPath });
  console.log(join(__dirname, '/../.env.example'));
  console.log("Loaded example ENV");

} else {
  console.log("No .env file found");
}
// dotEnvConfig({ path:  })

// Express server
const app = express();

const PORT = process.env.PORT || 4000;

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

app.use(json()); // parse application/json
app.use(json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(filter());

//Config DB
dbConfig();

//Config Passport
PassportConfig.config(app);

// Server static files from /browser
// app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

//Create storage folder if not exists
if (!existsSync(join(__dirname, '/../storage'))) {
  mkdirSync(resolve(__dirname + '/../storage'));
}
// Server static files from /../storage
app.get('*.*', express.static(join(DIST_FOLDER, '/../storage'), {
  maxAge: '1y'
}));

//register APIs and WEB routes
api_routes(app);

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  // res.render('index', { req });
  res.sendFile(join(DIST_FOLDER, '/index.html'))
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
