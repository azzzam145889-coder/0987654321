# نستخدم صورة Node الرسمية
FROM node:20

# نحدد مجلد العمل داخل الحاوية
WORKDIR /app

# ننسخ كل الملفات إلى الحاوية
COPY . .

# نثبت CMake وأدوات البناء (حل المشكلة)
RUN apt-get update && apt-get install -y cmake python3 make g++ && \
    npm install && \
    npm rebuild raknet-native --build-from-source

# تشغيل البوت
CMD ["node", "bot.js"]
