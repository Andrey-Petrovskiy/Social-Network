const app = require('./app');
const port = require('./services/config').getPort();

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
