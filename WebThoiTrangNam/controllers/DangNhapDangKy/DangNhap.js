// controllers/authController.js
const User = require('../../models/User');
const UserDk = require('../../models/UserDangKy');
// const uuid = require('uuid');

module.exports = {
    login: (req, res) => {
        const { user, matkhau } = req.body;

        // Tìm người dùng bằng email hoặc số điện thoại
        User.findOne({ $or: [{ Email: user }, { SDT: user }] })
            .then(userRecord => {
                if (!userRecord) {
                    // Không tìm thấy người dùng, hiển thị thông báo lỗi
                    res.json({
                        error: 'Sai email hoặc số điện thoại',

                    });
                } else if (userRecord.MatKhau !== matkhau) {
                    // Mật khẩu không hợp lệ, hiển thị thông báo lỗi
                    res.json({
                        error: 'Sai mật khẩu',

                    });

                } else {

                    req.session.users = {
                        userId: userRecord._id,
                        ho: userRecord.Ho,
                        ten: userRecord.Ten,
                        email: userRecord.Email,
                        sdt: userRecord.SDT
                    };

                    req.session.isAuthenticated = true;

                    res.json({
                        // user: user,
                        error: null, // Không có lỗi
                        redirect: '/tai-khoan' // URL bạn muốn chuyển hướng đến

                    });
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
                res.status(500).json({ error: 'Đã xảy ra lỗi' });
            });
    },


    DoiMatKhau: async (req, res) => {

        const matKhauMoi = req.body.matKhauMoi;
        try {
            const user = await UserDk.findOne({ $or: [{ Email: req.session.users.email }, { SDT: req.session.users.sdt }] })
            if (!user) {
                return res.json({ error: 'Người dùng không tồn tại' });
            }

            user.MatKhau = matKhauMoi;
            await user.save();

            return res.json({ success: 'Mật khẩu đã được cập nhật thành công' });
        } catch (err) {
            return res.status(500).json({ error: 'Lỗi trong quá trình cập nhật mật khẩu' });
        }
    },

    DangXuat: (req, res) => {


        req.session.users = null;

        req.session.isAuthenticated = false;

        res.json({ success: 'đăng xuất thành công' });




    }


};
