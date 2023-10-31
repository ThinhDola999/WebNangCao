const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gioHangSchema = new Schema({

    userId: String,
    productId: String,
    mauSac: String,
    size: String,
    soLuong: String,
    img: String

}, {
    versionKey: false // Tắt tự động thêm trường __v
});

module.exports = mongoose.model('GioHang', gioHangSchema, 'GioHang');