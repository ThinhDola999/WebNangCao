// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dangkySchema = new Schema({
    Ho: String,
    Ten: String,
    Email: String,
    SDT: String,
    MatKhau: String, // Lưu mật khẩu không mã hóa
}, {
    versionKey: false // Tắt tự động thêm trường __v
});

module.exports = mongoose.model('DangKy', dangkySchema, 'DangNhap');