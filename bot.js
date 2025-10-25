// 📦 استيراد مكتبة bedrock-protocol
import { createClient } from 'bedrock-protocol';
import http from 'http';

// 🟢 إعدادات البوت
const BOT_NAME = 'FUCK YOU'; // اسم البوت في السيرفر (offline mode)
const HOST = 'emerald.magmanode.com';
const PORT_SERVER = 33760;

// 🟢 دالة تشغيل البوت
async function startBot() {
  try {
    const client = createClient({
      host: HOST,
      port: PORT_SERVER,
      username: BOT_NAME,
      offline: true // offline mode لتجنب مشاكل Microsoft Auth
    });

    client.on('join', () => console.log(`✅ البوت "${BOT_NAME}" دخل السيرفر بنجاح!`));

    client.on('disconnect', () => {
      console.log('⚠️ تم قطع الاتصال من السيرفر. إعادة المحاولة بعد 3 ثواني...');
      setTimeout(startBot, 3000);
    });

    client.on('error', (err) => {
      console.log('❌ خطأ في الاتصال:', err.message);
      setTimeout(startBot, 3000);
    });
  } catch (err) {
    console.log('🚫 فشل إنشاء الاتصال:', err.message);
    setTimeout(startBot, 3000);
  }
}

// 🔁 تشغيل البوت لأول مرة
startBot();

// 🌍 خادم HTTP لإبقاء البوت شغال في Render
const PORT_HTTP = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('✅ Bot is alive and running on Render!');
}).listen(PORT_HTTP, () => {
  console.log(`🌐 HTTP server running on port ${PORT_HTTP}`);
});
