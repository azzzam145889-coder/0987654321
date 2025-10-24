// 📦 استيراد مكتبة bedrock-protocol
import { createClient } from 'bedrock-protocol';
import http from 'http';

// 🟢 دالة تشغيل البوت
async function startBot() {
  try {
    const client = createClient({
      host: 'emerald.magmanode.com', // عنوان السيرفر
      port: 33760,                   // رقم المنفذ
      username: 'RenderBot',         // اسم البوت
      offline: false
    });

    client.on('join', () => console.log('✅ البوت دخل السيرفر بنجاح!'));
    client.on('disconnect', () => {
      console.log('⚠️ تم قطع الاتصال من السيرفر. إعادة المحاولة...');
      setTimeout(startBot, 3000); // ⏳ إعادة المحاولة بعد 3 ثوانٍ
    });
    client.on('error', (err) => {
      console.log('❌ خطأ في الاتصال:', err.message);
      setTimeout(startBot, 3000); // ⏳ إعادة المحاولة بعد 3 ثوانٍ في حال الخطأ
    });
  } catch (err) {
    console.log('🚫 فشل إنشاء الاتصال:', err.message);
    setTimeout(startBot, 3000); // ⏳ إعادة المحاولة بعد 3 ثوانٍ في حال فشل غير متوقع
  }
}

// 🔁 تشغيل البوت لأول مرة
startBot();

// 🌍 خادم HTTP لإبقاء البوت شغال في Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('✅ Bot is alive and running on Render!');
}).listen(PORT, () => {
  console.log(`🌐 HTTP server running on port ${PORT}`);
});
