// database/db.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;

// useNewUrlParser: true: Đây là một tùy chọn trong mongoose.connect()
//  để cho phép sử dụng trình phân tích cú pháp URL MongoDB mới

// useUnifiedTopology: true: Đây là tùy chọn để sử dụng
// các thiết lập kết nối mới có hiệu suất cao cho MongoDB