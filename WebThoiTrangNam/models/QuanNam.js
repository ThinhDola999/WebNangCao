const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuanSchema = new Schema({
    _id: String,
    "tên sản phẩm": String,
    "ảnh sản phẩm": String,
    "loại quần": String,
    "form": String,
    "thiết kế": String,
    "màu sắc": String,
    "size": String,
    "chất liệu": String,
    "giá tiền": String
}, {
    versionKey: false
});

module.exports = mongoose.model('QuanNam', QuanSchema, 'QuanNam');
