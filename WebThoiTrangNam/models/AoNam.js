const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const AoSchema = new Schema({
    _id: String,
    "tên sản phẩm": String,
    "ảnh sản phẩm": String,
    "loại áo": String,
    "form": String,
    "thiết kế": String,
    "màu sắc": String,
    "size": String,
    "chất liệu": String,
    "giá tiền": String
}, {
    versionKey: false
});

module.exports = mongoose.model('AoNam', AoSchema, 'AoNam');

