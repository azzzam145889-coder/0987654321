const http = require('http');
const PORT = process.env.PORT || 3000; // رقم البورت الافتراضي 3000 أو الرقم الذي يعطيه Render

http.createServer((req, res) => {
  res.writeHead(200);       // حالة النجاح 200
  res.end('Bot is alive!'); // الرد على أي طلب
}).listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});
