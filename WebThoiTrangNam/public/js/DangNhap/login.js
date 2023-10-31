

$(document).ready(function () {

    // Hàm để xử lý yêu cầu AJAX
    function handleAjaxResponse() {
        // Lấy dữ liệu từ các trường input và gửi chúng trong yêu cầu AJAX
        var user = $('.login-container .form #user').val();
        var matkhau = $('.login-container .form  #matkhau').val();


        $.ajax({
            type: 'POST',  // Bạn có thể sử dụng GET hoặc POST tùy theo yêu cầu
            url: '/login', // Thay thế bằng đường dẫn thực tế của bạn
            data: { user: user, matkhau: matkhau }, // Gửi dữ liệu người dùng và mật khẩu
            success: function (data) {
                if (data.error) {
                    // Xử lý lỗi, hiển thị thông báo lỗi hoặc thực hiện thao tác cần thiết
                    $('.login-container .error').text(data.error);

                }
                else {
                    // Đăng nhập thành công
                    if (data.redirect) {



                        window.location.href = data.redirect;



                    }
                }
            }
        });
    }

    // Gọi hàm AJAX khi cần, ví dụ, khi người dùng nhấn nút đăng nhập
    $('.login-container .form .buttondangnhap').click(function () {

        handleAjaxResponse();



    });


    $('.login-container .register-link .dangkyngay').
        on('click', function () {
            var form = $('.FormDangKy');


            if (form.is(":visible")) {

                form.hide()

                // overlay.css('position', 'unset');
            } else {

                form.show();
                $('.FormDangNhap').hide();

                // overlay.css('position', 'fixed');
            }
        });
});