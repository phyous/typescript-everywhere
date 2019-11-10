import express from 'express';

const app = express();
const port = process.env.SERVER_PORT || 3001;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope.');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});