// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const ThoiTrangNam = require('../controllers/ThoiTrangNam/ThoiTrangNam');
const AoNam = require('../controllers/Trang/AoNam');
const QuanNam = require('../controllers/Trang/QuanNam');
const vest = require('../controllers/Trang/VestTangAo');
const TimKiem = require('../controllers/Trang/TimKiem');
const coffee = require('../controllers/Trang/Coffee150k');
const authMiddleware = require('../middleware/authMiddleware');
const yeuthich = require("../controllers/YeuThich/YeuThich");
const muaSanPham = require("../controllers/MuaSanPham/MuaSanPham");
const GioHang = require("../controllers/GioHang/GioHang")

router.get('/', (req, res) => {
    res.render('pages/TrangChu');

});

router.get('/thoi-trang-nam', (req, res) => {
    res.render('pages/ThoiTrangNam');
});


router.get('/thoi-trang-nam/ao-nam', (req, res) => {
    res.render('pages/TrangAoNam');
});

router.get('/thoi-trang-nam/quan-nam', (req, res) => {
    res.render('pages/TrangQuanNam');
});

router.get('/tim-kiem', (req, res) => {
    const searchText = req.query.searchText || '';
    res.render('pages/TrangTimKiem', { searchText });
});

router.get('/vest-tang-ao', (req, res) => {
    res.render('pages/TrangVestTangAo');
});


router.get('/coffee-tang150k', (req, res) => {
    res.render('pages/TrangCoffee150k');
});


router.get('/tai-khoan', authMiddleware.isAuthenticated, (req, res) => {
    const user = req.session.users;
    res.render('pages/TrangTaiKhoan', { user });

});

router.get('/mua-san-pham', (req, res) => {
    const productId = req.query.sanpham;
    const loai = req.query.loai;
    res.render('pages/TrangMuaHang', { productId, loai });
});


router.get('/mua-san-pham-gio-hang', (req, res) => {
    const productId = req.query.sanpham;
    const loai = req.query.loai;
    const mau = req.query.mau;
    const size = req.query.size;
    res.render('pages/TrangMuaHang', { productId, loai, mau, size });
});

router.post('/mua-san-pham', muaSanPham.LayDulieu);
// router.get('/thu', muaSanPham.LayDulieu);//kiem tra test thu controller tra ve jsson

router.post('/yeu-thich', yeuthich.add);

router.post('/lay-du-lieu-yeu-thich', yeuthich.LayDulieu);
router.post('/xoa-yeuthich', yeuthich.XoaDuLieu);



//khong tai khoan dung sseion
router.post('/them-vao-gio', GioHang.add_1);
router.post('/xoa-gio-hang', GioHang.delete);

router.post('/them_gio_hang_tk', GioHang.add_2);
router.post('/xoa-gio-hang-databaseGioHang', GioHang.delete_2);


//lay du lieu danh cho sesion va xac thuc thuc phien
router.get('/lay-du-lieu-gio-hang', (req, res) => {
    res.json({ user: req.session.users, isAuthenticated: req.session.isAuthenticated, GioHang: req.session.gioHang });
});

router.post('/lay_du_lieu_databaseGioHang', GioHang.Lay_du_lieu);
// router.get('/lay-du-lieu-databaseGioHang', GioHang.Lay_du_lieu);



router.get('/thanh-toan', (req, res) => {
    res.render('pages/ThanhToan');

});

router.post('/AoQuanNam', ThoiTrangNam.Data);//layDuLieu
router.get('/AoQuanNam', ThoiTrangNam.Data);//layDuLieu



router.post('/AoNam', AoNam.Data);
router.get('/AoNam', AoNam.Data);

router.post('/QuanNam', QuanNam.Data);
router.get('/QuanNam', QuanNam.Data);


router.post('/TimKiem', TimKiem.Data);
router.get('/TimKiem', TimKiem.Data);

router.post('/Vest', vest.Data);
router.get('/Vest', vest.Data);

router.post('/Coffee', coffee.Data);
router.get('/Coffee', coffee.Data);

module.exports = router;







