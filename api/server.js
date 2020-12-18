const app = require('./app');
const config = require('./services/config');
const port = config.getPort();

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });
