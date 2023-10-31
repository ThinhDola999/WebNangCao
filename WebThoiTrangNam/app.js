// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('./database/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/dangNhapDangKy');
const pageRoutes = require("./routes/pageRoutes");
// const jwt = require('jsonwebtoken');

const app = express();

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// app.use(session({
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: true
// }));
app.use(cookieParser());

app.use(session({
    secret: 'your-secret-key', // Khóa bí mật để mã hóa thông tin phiên
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // Đặt thời gian sống của phiên (30 ngày)
    }
}));


app.use(bodyParser.urlencoded({ extended: true }));
// body-parser được sử dụng để xử lý dữ liệu từ biểu mẫu gửi bằng phương thức POST,
// body-parser giúp bạn trích xuất dữ liệu từ req.body 
// sau khi dữ liệu từ biểu mẫu đã được gửi bằng phương thức POST


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/js'));

app.use('/', authRoutes);
app.use('/', pageRoutes);








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


