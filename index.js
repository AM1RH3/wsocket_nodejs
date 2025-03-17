const http = require('http');
const socketIo = require('socket.io');

// ایجاد سرور HTTP
const server = http.createServer((req, res) => { // اصلاح پرانتز و پارامترها
    res.writeHead(200, {'Content-Type': 'text/plain'}); // اصلاح کد وضعیت 200
    res.end('Socket.IO Server');
});

// اتصال Socket.IO به سرور
const io = socketIo(server, {
    cors: {
      origin: "*", // اجازه دسترسی از همه منابع
      methods: ["GET", "POST"]
    }
  });

// مدیریت اتصال کلاینت‌ها
io.on('connection', (socket) => {
    console.log('Client connected'); // اصلاح نقلقول
    //! تمامی اطلاعات کلاینت رو لیست میکنه
   //! console.log('Client connected',socket);

    socket.emit('welcome','Hello welcome to the client app!');

    // دریافت پیام از کلاینت
    socket.on('message', (data) => {
        console.log(`Received message from client: ${data}`); // استفاده از backtick
        io.emit(`message`,`Msg From Server: ${data}`); // ارسال پیام به همه کلاینت‌ها
    });

    // قطع ارتباط کلاینت
    socket.on('disconnect', () => {
        console.log('Client disconnected'); // اصلاح نقلقول
    });

    // مدیریت خطاها
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    }); // بستن صحیح تابع
});

// شروع سرور روی پورت 3003
server.listen(3003, () => {
    console.log('Server running on http://localhost:3003');
});

//! socket.emit فقط به سوکت کلاینت دینا میفرسته  
//! io.emit اون دیتا رو تو اون چنل به همه میفرسته 