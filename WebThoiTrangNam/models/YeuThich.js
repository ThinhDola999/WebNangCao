const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yeuThichSchema = new Schema({

    userId: String,
    productId: String

}, {
    versionKey: false // Tắt tự động thêm trường __v
});

module.exports = mongoose.model('YeuThich', yeuThichSchema, 'YeuThich');