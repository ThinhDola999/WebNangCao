// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    Ho: String,
    Ten: String,
    Email: String,
    SDT: String,
    MatKhau: String, // Lưu mật khẩu không mã hóa
}, {
    versionKey: false // Tắt tự động thêm trường __v
});


// const userSchema = new Schema({
//     Ho: { type: String, field: 'Ho' },
//     Ten: { type: String, field: 'Ten' },
//     Email: { type: String, field: 'Email' },
//     SDT: { type: String, field: 'SDT' },
//     MatKhau: { type: String, field: 'MatKhau' },
// }, {
//     versionKey: false // Tắt tự động thêm trường __v
// });

module.exports = mongoose.model('DangNhap', userSchema, 'DangNhap');
