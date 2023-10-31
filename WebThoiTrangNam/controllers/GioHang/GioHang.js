
const uuid = require('uuid');
const GioHang = require('../../models/GioHang');
const AoNam = require('../../models/AoNam');
const QuanNam = require('../../models/QuanNam');
module.exports = {
    add_1: (req, res) => {
        const { img, ten, gia, mauSac, size, soLuong, loai, productid } = req.body;
        try {


            const newID = uuid.v4();
            const productInfo = {
                _id: newID,
                img: img,
                ten: ten,
                gia: gia,
                mauSac: mauSac,
                size: size,
                soLuong: soLuong,
                loai: loai,
                productid: productid

            };


            if (!req.session.gioHang) {
                req.session.gioHang = []; // Tạo một giỏ hàng mới
            }
            // Thêm thông tin sản phẩm vào giỏ hàng
            req.session.gioHang.push(productInfo);



            res.json({
                // user: user,
                success: "thêm thành công",
                data1: req.session.gioHang,
                // tongtien: tinhTongTien(req.session.gioHang)


            })
        }
        catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        };
    },

    add_2: async (req, res) => {
        const { userId, productId, mauSac, size, soLuong, img } = req.body;
        try {


            const gioHang = new GioHang({
                userId: userId,
                productId: productId,
                mauSac: mauSac,
                size: size,
                soLuong: soLuong,
                img: img

            });

            // Lưu bản ghi vào cơ sở dữ liệu
            await gioHang.save();


            res.json({ success: 'Đã thêm vào danh sách giỏ hàng' });
        }
        catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        };
    },

    Lay_du_lieu: async (req, res) => {
        try {
            // Lấy danh sách yêu thích
            const dsGioHang = await GioHang.find();
            // Lấy danh sách sản phẩm
            const dataAo = await AoNam.find();
            const dataQuan = await QuanNam.find();

            // Kết hợp danh sách sản phẩm thành một danh sách duy nhất
            const dataAoQuan = [...dataAo, ...dataQuan];

            // Đặt userId mà bạn muốn xem danh sách yêu thích của người dùng
            const userId = req.body.userId;


            // const userId = "6531d56b22a4c43f26ffb722";

            // Lọc danh sách yêu thích của người dùng cụ thể
            const dsGioHangCuaUser = dsGioHang.filter(item => item.userId === userId);

            // Duyệt qua danh sách yêu thích và thêm thông tin sản phẩm vào mỗi mục yêu thích
            const dsGioHangMoi = dsGioHangCuaUser.map((GioHangItem) => {
                // Tìm sản phẩm tương ứng với productId trong danh sách sản phẩm
                const matchingProduct = dataAoQuan.find((product) => product._id === GioHangItem.productId);

                // Tạo một bản sao của yêu thích với thông tin sản phẩm


                const updatedGioHangItem = {
                    ...GioHangItem.toObject(),
                    productId: matchingProduct || null
                    // productId: {
                    //     "_id": matchingProduct._id,
                    //     "tên sản phẩm": matchingProduct['tên sản phẩm'],
                    //     "ảnh sản phẩm": matchingProduct['ảnh sản phẩm'],
                    //     [loai]: matchingProduct[loai],
                    //     "form": matchingProduct['form'],
                    //     "thiết kế": matchingProduct['thiết kế'],
                    //     "màu sắc": matchingProduct['màu sắc'],
                    //     "size": matchingProduct.size,
                    //     "chất liệu": matchingProduct['chất liệu'],
                    //     "giá tiền": matchingProduct['giá tiền'],
                    //     "số lượng": soLuong
                    // },

                };

                return updatedGioHangItem;
            });

            // res.json(dsGioHangCuaUser)
            if (dsGioHangMoi.length > 0) {
                res.json(dsGioHangMoi);
            } else {
                // res.status(404).json({ error: 'Không tìm thấy danh sách yêu thích cho người dùng' });
                res.json({ error: "không có sản phẩm nào" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
        }
    },

    delete: (req, res) => {
        const { product1 } = req.body;
        try {

            function kiemTraSanPhamGiongNhau(product1, product2) {
                return (
                    product1 === product2._id

                );
            }
            var gioHang = req.session.gioHang; // Lấy danh sách sản phẩm từ session
            var productIndex = -1;

            // Tìm vị trí của sản phẩm cần xóa
            for (var i = 0; i < gioHang.length; i++) {
                if (kiemTraSanPhamGiongNhau(product1, gioHang[i])) {
                    productIndex = i;

                }
            }

            // Nếu tìm thấy sản phẩm, xóa nó khỏi giỏ hàng
            if (productIndex !== -1) {
                gioHang.splice(productIndex, 1);

                // Cập nhật giỏ hàng trong session
                req.session.gioHang = gioHang;

                res.json({
                    // user: user,
                    success: "xóa giỏ hàng thành công",
                    data1: req.session.gioHang


                })

            } else {


                res.json({
                    // user: user,
                    error: "xóa không thành công",
                    data1: req.session.gioHang


                })
            }





        }
        catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        };
    },

    delete_2: async (req, res) => {
        const { GioHangId } = req.body;
        try {

            await GioHang.findByIdAndRemove(GioHangId);

            res.json({ success: 'Đã xóa khỏi danh sách giỏ hàng' });

        }
        catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        };
    },





};

function tinhTongTien(gioHang) {
    var tongTien = 0;

    for (var i = 0; i < gioHang.length; i++) {
        var product = gioHang[i];
        var gia = parseFloat(product.gia.replace(/\D/g, '')); // Chuyển giá từ chuỗi sang số, loại bỏ ký tự không phải số
        var soLuong = parseInt(product.soLuong, 10);
        tongTien += gia * soLuong;
    }

    return tongTien;
}

// // Cập nhật hiển thị tổng số tiền
// function capNhatTongTien() {
//     var gioHang = req.session.gioHang; // Lấy danh sách sản phẩm từ session
//     var tongTien = tinhTongTien(gioHang);
//     var tongTienElement = document.querySelector('.tong_tien .so_tien');
//     tongTienElement.textContent = tongTien.toLocaleString() + 'đ';
//     return  tongTienElement.textContent;

// }


