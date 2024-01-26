const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(
  '/_functions',
  createProxyMiddleware({
    target: 'https://certifiedcode.wixsite.com/3d-carousel',
    changeOrigin: true,    
  })
);

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});

