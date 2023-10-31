$(document).ready(function () {
    $('#thayDoiMatKhau').change(function () {
        if (this.checked) {
            $('#matKhauContainer').show();
        } else {
            $('#matKhauContainer').hide();
        }
    });

    $('.left .info .dangxuat p').on('click', function () {
        $.ajax({
            type: 'POST',  // Bạn có thể sử dụng GET hoặc POST tùy theo yêu cầu
            url: '/dang-xuat', // Thay thế bằng đường dẫn thực tế của bạn
            success: function (data) {

                if (data.error) {
                    // Xử lý lỗi, ví dụ:
                    alert('Lỗi: ' + data.error);
                } else if (data.success) {
                    // Xử lý thành công, ví dụ:
                    alert(data.success);
                    window.location.href = '/';

                }

            }
        });
    });
    $('.right .mid-right .r-left .matkhau .capnhatmatkhau').on('click', function () {
        // Chuyển hướng người dùng đến trang 'Thời Trang Nam'
        var matkhaumoi = $('.right .mid-right .r-left .matkhau .matkhaumoi #MKM').val();
        var NLMKM = $('.right .mid-right .r-left .matkhau .nhaplaimatkhaumoi #NLMKM').val();

        if (matkhaumoi === NLMKM) {

            $.ajax({
                type: 'POST',  // Bạn có thể sử dụng GET hoặc POST tùy theo yêu cầu
                url: '/cap-nhat-mat-khau', // Thay thế bằng đường dẫn thực tế của bạn
                data: {
                    matKhauMoi: matkhaumoi
                }, // Gửi dữ liệu người dùng và mật khẩu
                success: function (data) {

                    if (data.error) {
                        // Xử lý lỗi, ví dụ:

                        alert('Lỗi: ' + data.error);
                    } else if (data.success) {
                        // Xử lý thành công, ví dụ:
                        alert(data.success);


                    }

                }
            });
        } else {

            $('.right .mid-right .r-left .matkhau .error').css({
                "color": "red",
            });
            $('.right .mid-right .r-left .matkhau .error').text("mật khẩu không trùng khớp")

        }

    });
});
