const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;
app.use(express.static('dist'));

const pathName = path.join(__dirname, 'dist/index.html');

app.get('/*', (req, res) => {
  res.sendFile(pathName);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
