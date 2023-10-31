const DangKy = require('../../models/UserDangKy');


module.exports = {


    register: async (req, res) => {
        const { ho, ten, email, sdt, matkhau, nhaplaimatkhau } = req.body;

        try {

            // Kiểm tra xem tất cả các trường đều đã được nhập
            if (!ho || !ten || !email || !sdt || !matkhau || !nhaplaimatkhau) {
                return res.json({
                    error: 'Vui lòng điền đầy đủ thông tin'
                });
            }

            // Kiểm tra định dạng email bằng regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.json({
                    error: 'Email không hợp lệ'
                });
            }

            // Kiểm tra định dạng số điện thoại (ví dụ: 10 chữ số)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(sdt)) {
                // Trong mã Node.js và Express.js
                return res.json({
                    error: 'Số điện thoại không hợp lệ'
                });

                // return res.render('register', { error: 'Số điện thoại không hợp lệ' });
            }

            // Kiểm tra mật khẩu và nhập lại mật khẩu có trùng khớp không
            if (matkhau !== nhaplaimatkhau) {
                return res.json({
                    error: 'Mật khẩu và nhập lại mật khẩu không trùng khớp'
                });
            }

            // Kiểm tra xem email hoặc số điện thoại đã tồn tại
            const existingUser = await DangKy.findOne({ $or: [{ Email: email }, { SDT: sdt }] });

            if (existingUser) {
                // Người dùng đã tồn tại, hiển thị thông báo lỗi
                return res.json({
                    error: 'Email hoặc số điện thoại đã tồn tại'
                });
            }

            // Tạo một bản ghi người dùng mới
            // const newUser = new User({
            //     Ho: ho,
            //     Ten: ten,
            //     Email: email,
            //     SDT: sdt,
            //     MatKhau: matkhau
            // }, {
            //     versionKey: false // Tắt tự động thêm trường __v
            // }
            // );

            // // Lưu người dùng vào cơ sở dữ liệu
            // await newUser.save();
            const userObject = {
                Ho: ho,
                Ten: ten,
                Email: email,
                SDT: sdt,
                MatKhau: matkhau
            };

            await DangKy.create(userObject);


            req.session.users = {
                ho: ho,
                ten: ten,
                email: email,
                sdt: sdt
            };

            req.session.isAuthenticated = true;

            // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng ký thành công

            res.json({
                error: null, // Không có lỗi
                redirect: '/tai-khoan' // URL bạn muốn chuyển hướng đến
            });
        } catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
            res.status(500).json({ error: 'Đã xảy ra lỗi' });

        }
    },







};
