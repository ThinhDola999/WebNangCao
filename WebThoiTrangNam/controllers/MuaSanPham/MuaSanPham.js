const YeuThich = require('../../models/YeuThich');
const AoNam = require('../../models/AoNam');
const QuanNam = require('../../models/QuanNam');


const LayDulieu = async (req, res) => {
    try {

        const dataAo = await AoNam.find();
        const dataQuan = await QuanNam.find();

        // Kết hợp danh sách sản phẩm thành một danh sách duy nhất
        const dataAoQuan = [...dataAo, ...dataQuan];

        // Đặt userId mà bạn muốn xem danh sách yêu thích của người dùng
        const productId = req.body.productId;
        const loaiSanPham = req.body.loaiSanPham;

        // const loaiSanPham = "loại quần";
        // const productId = "652c12b1a9af04d6dece6e82";

        // Lọc danh sách yêu thích của người dùng cụ thể
        const SanPhamMuaHang = dataAoQuan.filter(item => item._id === productId);

        const sizeSanPhamMua = SanPhamMuaHang[0]["size"];

        let dsMau = {};
        let dsSize = [];

        if (loaiSanPham === "loại áo") {

            dsMau = locSanPhamAo(dataAo, SanPhamMuaHang);

            dataMau = [...dsMau];

            dsMau = filterUniqueProducts(dsMau, "màu sắc");

            dsSize = locSizeChoTungMau(dsMau, dataMau);

            // ["DARK NAVY", ["28", "29", "30", "31", "32"]],
            // ["SILVER MINK", ["28", "29", "30", "31", "32"]],
            dsMau = updateDsMauItem(dsMau, dsSize, sizeSanPhamMua);




        } else if (loaiSanPham === "loại quần") {


            dsMau = locSanPhamQuan(dataQuan, SanPhamMuaHang);

            dataMau = [...dsMau];

            dsMau = filterUniqueProducts(dsMau, "màu sắc");

            dsSize = locSizeChoTungMau(dsMau, dataMau);

            // ["DARK NAVY", ["28", "29", "30", "31", "32"]],
            // ["SILVER MINK", ["28", "29", "30", "31", "32"]],
            dsMau = updateDsMauItem(dsMau, dsSize, sizeSanPhamMua);


        }

        res.json(dsMau);
        // if (dsMau.length > 0) {
        //     res.json(dsMau);
        // } else {
        //     // res.status(404).json({ error: 'Không tìm thấy danh sách yêu thích cho người dùng' });
        //     res.json({ thongbao: "không có" });
        // }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
    }
};
function updateDsMauItem(dataDsMau, dsSize, sizeSanPham) {
    const dsMau = dataDsMau.map((dsMauItem) => {

        desiredColorSizes = dsSize.find((item) => item[0] === dsMauItem["màu sắc"]);
        // Tạo một bản sao của yêu thích với thông tin sản phẩm
        const updateddsMauItem = {
            ...dsMauItem.toObject(),
            size: desiredColorSizes[1],
            sizeSanPham: sizeSanPham
        };

        return updateddsMauItem;
    });

    return dsMau;
}

function locSizeChoTungMau(dsMau, dataMau) {
    const sizesMap = new Map();

    // Lặp qua dsMau và cập nhật danh sách size
    dsMau.forEach((item) => {
        sizesMap.set(item["màu sắc"], []);
    });

    // Lặp qua dữ liệu và cập nhật danh sách size của dsMau
    dataMau.forEach((item) => {
        if (sizesMap.has(item["màu sắc"])) {
            sizesMap.get(item["màu sắc"]).push(item.size);
        }
    });

    // Chuyển kết quả từ Map thành mảng
    const dsSize = Array.from(sizesMap);



    return dsSize;

}

//loc xem san pham kieu do co bao nhieu mau
function locSanPhamQuan(dataQuan, SanPhamMuaHang) {

    const dsMau = dataQuan.filter((item) => {
        return (
            item["loại quần"] === SanPhamMuaHang[0]["loại quần"] &&
            item["form"] === SanPhamMuaHang[0]["form"] &&
            item["thiết kế"] === SanPhamMuaHang[0]["thiết kế"]

        );
    });
    return dsMau;
}

//loc xem san pham kieu do co bao nhieu mau
function locSanPhamAo(dataAo, SanPhamMuaHang) {

    const dsMau = dataAo.filter((item) => {
        return (
            item["loại áo"] === SanPhamMuaHang[0]["loại áo"] &&
            item["form"] === SanPhamMuaHang[0]["form"] &&
            item["thiết kế"] === SanPhamMuaHang[0]["thiết kế"]

        );
    });
    return dsMau;
}


function filterUniqueProducts(data, key) {
    const uniqueProducts = [];
    const uniqueKeys = new Set();

    data.forEach(item => {
        if (!uniqueKeys.has(item[key])) {
            uniqueKeys.add(item[key]);
            uniqueProducts.push(item);
        }
    });

    return uniqueProducts;
};
module.exports = {
    LayDulieu
};
