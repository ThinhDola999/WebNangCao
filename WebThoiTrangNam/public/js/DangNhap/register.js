$(document).ready(function () {

    // Hàm để xử lý yêu cầu AJAX
    function handleAjaxResponse() {
        // Lấy dữ liệu từ các trường input và gửi chúng trong yêu cầu AJAX
        var ho = $('.register-container .form .form-group .form-group-HT .ho').val();
        var ten = $('.register-container .form .form-group .form-group-HT .ten').val();
        var email = $('.register-container .form .form-group .email').val();
        var sdt = $('.register-container .form .form-group .sdt').val();
        var matkhau = $('.register-container .form .form-group .matkhau').val();
        var nhaplaimatkhau = $('.register-container .form .form-group .nhaplaimatkhau').val();




        $.ajax({
            type: 'POST',  // Bạn có thể sử dụng GET hoặc POST tùy theo yêu cầu
            url: '/register', // Thay thế bằng đường dẫn thực tế của bạn
            data: {
                ho: ho,
                ten: ten,
                email: email,
                sdt: sdt,
                matkhau: matkhau,
                nhaplaimatkhau: nhaplaimatkhau
            }, // Gửi dữ liệu người dùng và mật khẩu
            success: function (data) {
                if (data.error) {
                    // Xử lý lỗi, hiển thị thông báo lỗi hoặc thực hiện thao tác cần thiết
                    $('.register-container .error').text(data.error);

                } else {
                    // Đăng nhập thành công
                    if (data.redirect) {
                        // Nếu phản hồi từ máy chủ chứa thông tin chuyển hướng, thì chuyển hướng đến URL đó
                        alert("Dăng ký thành công")
                        window.location.href = data.redirect;
                    }
                }
            }
        });
    }

    // Gọi hàm AJAX khi cần, ví dụ, khi người dùng nhấn nút đăng nhập
    $('.register-container .form .buttondangky').click(function () {

        handleAjaxResponse();


    });

    $('.register-container .login .dangnhapngay').
        on('click', function () {
            var form = $('.FormDangNhap');


            if (form.is(":visible")) {

                form.hide()

                // overlay.css('position', 'unset');
            } else {

                form.show();
                $('.FormDangKy').hide();

                // overlay.css('position', 'fixed');
            }
        });
});