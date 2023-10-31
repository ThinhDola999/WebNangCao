const YeuThich = require('../../models/YeuThich');
const AoNam = require('../../models/AoNam');
const QuanNam = require('../../models/QuanNam');
const add = async (req, res) => {
    try {

        const userId = req.body.userId;
        const productId = req.body.productId;

        // Tạo một bản ghi mới trong cơ sở dữ liệu
        const yeuThich = new YeuThich({
            userId: userId,
            productId: productId
        });

        // Lưu bản ghi vào cơ sở dữ liệu
        await yeuThich.save();

        res.json({ success: 'Đã thêm vào danh sách yêu thích' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
    }



};


const LayDulieu = async (req, res) => {
    try {
        // Lấy danh sách yêu thích
        const dsyeuThich = await YeuThich.find();
        // Lấy danh sách sản phẩm
        const dataAo = await AoNam.find();
        const dataQuan = await QuanNam.find();

        // Kết hợp danh sách sản phẩm thành một danh sách duy nhất
        const dataAoQuan = [...dataAo, ...dataQuan];

        // Đặt userId mà bạn muốn xem danh sách yêu thích của người dùng
        const userId = req.body.userId;

        // Lọc danh sách yêu thích của người dùng cụ thể
        const dsyeuThichCuaUser = dsyeuThich.filter(item => item.userId === userId);

        // Duyệt qua danh sách yêu thích và thêm thông tin sản phẩm vào mỗi mục yêu thích
        const dsyeuThichMoi = dsyeuThichCuaUser.map((yeuThichItem) => {
            // Tìm sản phẩm tương ứng với productId trong danh sách sản phẩm
            const matchingProduct = dataAoQuan.find((product) => product._id === yeuThichItem.productId);

            // Tạo một bản sao của yêu thích với thông tin sản phẩm
            const updatedYeuThichItem = {
                ...yeuThichItem.toObject(),
                productId: matchingProduct || null
            };

            return updatedYeuThichItem;
        });

        if (dsyeuThichMoi.length > 0) {
            res.json(dsyeuThichMoi);
        } else {
            // res.status(404).json({ error: 'Không tìm thấy danh sách yêu thích cho người dùng' });
            res.json({ error: "không có sản phẩm nào" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
    }
};


const XoaDuLieu = async (req, res) => {
    try {

        const yeuthichid = req.body.yeuthichid;

        await YeuThich.findByIdAndRemove(yeuthichid);

        res.json({ success: 'Đã xóa khỏi danh sách yêu thích' });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
    }



};



module.exports = {
    add, LayDulieu, XoaDuLieu
};
