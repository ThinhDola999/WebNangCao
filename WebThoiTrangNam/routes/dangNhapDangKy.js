// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const DangNhapController = require('../controllers/DangNhapDangKy/DangNhap');
const DangKyController = require('../controllers/DangNhapDangKy/DangKy');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', DangNhapController.login);


router.post('/register', DangKyController.register);


router.get('/check-auth', (req, res) => {
    res.json({ isAuthenticated: req.session.isAuthenticated, user: req.session.users });
});


router.post('/cap-nhat-mat-khau', authMiddleware.isAuthenticated, DangNhapController.DoiMatKhau);

router.post('/dang-xuat', authMiddleware.isAuthenticated, DangNhapController.DangXuat);
module.exports = router;
