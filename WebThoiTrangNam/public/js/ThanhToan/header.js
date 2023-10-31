


$(document).ready(function () {
    // Theo dõi sự kiện thay đổi kích thước cửa sổ
    $(window).resize(function () {
        checkWindowWidth();
    });

    // Kiểm tra chiều rộng của cửa sổ và thực hiện các thay đổi tương ứng
    function checkWindowWidth() {
        var windowWidth = $(window).width();

        var windowWidthPercent = (windowWidth / 1707) * 100;

        if (windowWidthPercent <= 50) { // Kiểm tra nếu chiều rộng của cửa sổ nhỏ hơn hoặc bằng 50%
            // Khi chiều rộng của cửa sổ nhỏ hơn hoặc bằng 50%, hiện toggle và làm thay đổi các kiểu cho input của search
            $('.toggle').show();

            $('.header-content').addClass('active');
            $('.header-content .header-menu .menu-item').hide();



        } else {
            // Khi chiều rộng của cửa sổ lớn hơn 50%, ẩn toggle và làm thay đổi các kiểu cho logo
            $('.toggle').show();
            $('.header-content').removeClass('active');
            $('.header-content .header-menu .menu-item').hide();


            $(window).scroll(function () {
                var scroll = $(window).scrollTop();

                if (scroll > 7) { // Kiểm tra nếu cuộn trang xuống khoảng 50px
                    // Khi cuộn trang xuống khoảng 50px, hiển thị .header-content và .gym
                    // ('.header-content').show()
                    $('.toggle').hide();
                    $('.header-content').addClass('active');
                    $('.header-content .header-menu .menu-item').show();


                } else {
                    // Khi cuộn trang lên trên 50px, ẩn .header-content và .gym

                    $('.header-content').removeClass('active');
                    $('.toggle').show();
                    $('.header-content .header-menu .menu-item').hide();


                }

            });

        }


    }

    // Gọi hàm kiểm tra chiều rộng của cửa sổ ban đầu
    checkWindowWidth();
});


$(document).ready(function () {


    $(".toggle").click(function () {
        // $(".menu").removeClass("active");
        $(".menu").show();

    });

    // Ẩn menu khi con trỏ ra khỏi menu
    $(".menu").mouseleave(function () {
        $(this).hide();
    });

    $(".mucluc .menu-item").mouseenter(function () {
        $(".menu").show();
    });

    $(".menu .menu-item").click(function () {
        // Lấy ID của menu-item được nhấp vào
        var clickedItem = $(this);

        if (clickedItem.hasClass("active")) {
            // Nếu đã có lớp "active", loại bỏ nó
            clickedItem.removeClass("active");
        } else {

            $(".menu .menu-item").removeClass("active");
            clickedItem.addClass("active");
        }
    });



});




$(document).ready(function () {

    $(".close-yeuthich").click(function () {
        var customerContent = $(".sanphamyeuthich");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });

    $(".close-giohang").click(function () {
        var customerContent = $(".GioHang");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });



    $(".wishlist").click(function () {
        var customerContent = $(".sanphamyeuthich");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });

    $(".minicart").click(function () {
        var customerContent = $(".GioHang");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });


    $(".close-timkiem").click(function () {
        var customerContent = $(".timkiem");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });

    $(".block-search").click(function () {
        var customerContent = $(".timkiem");

        if (customerContent.is(":visible")) {
            // Nếu đã hiển thị, ẩn đi
            customerContent.hide();
        } else {
            // Nếu chưa hiển thị, hiển thị lên
            customerContent.show();
        }
    });





});


$(document).ready(function () {

    $('.menu .xemtatca').on('click', function () {
        // Chuyển hướng người dùng đến trang 'Thời Trang Nam'
        window.location.href = '/thoi-trang-nam';
    });



    $('.menu .itemAo .tatca').on('click', function () {

        // var loai = this.getAttribute('data-loai');

        // Chuyển hướng trang với giá trị data-loai
        window.location.href = '/thoi-trang-nam/ao-nam';

    });

    $('.menu .itemQuan .tatca').on('click', function () {

        // var loai = this.getAttribute('data-loai');

        // Chuyển hướng trang với giá trị data-loai
        window.location.href = '/thoi-trang-nam/quan-nam';

    });

    $('.header-content .logo').on('click', function () {

        // var loai = this.getAttribute('data-loai');

        // Chuyển hướng trang với giá trị data-loai
        window.location.href = '/';

    });

    $('.timkiem .search input').on('keydown', function (e) {
        if (e.keyCode === 13) {
            const searchText = $(this).val();
            // searchProducts(searchText);
            window.location.href = '/tim-kiem?searchText=' + searchText;

        }
    });
});

$(document).ready(function () {
    $('.FormDangKy .register-container .close-button')
        .on('click', function () {
            var form = $('.FormDangKy');


            if (form.is(":visible")) {

                form.hide();


            } else {

                form.show();


            }
        });

    $('.FormDangNhap .login-container .close-button')
        .on('click', function () {
            var form = $('.FormDangNhap');


            if (form.is(":visible")) {

                form.hide();


            } else {

                form.show();


            }
        });


    $('.header-customer-content .dangnhap').
        on('click', function () {
            var form = $('.FormDangNhap');


            if (form.is(":visible")) {

                form.hide();


            } else {

                form.show();


            }
        });


    $('.header-customer-content .dangky').
        on('click', function () {
            var form = $('.FormDangKy');


            if (form.is(":visible")) {

                form.hide()


            } else {

                form.show();


            }
        });


    $('.menu .authentication-menu .dangnhap').
        on('click', function () {
            var form = $('.FormDangNhap');
            var form2 = $('.FormDangKy');

            if (form.is(":visible")) {

                form.hide()

            } else {

                form.show();


            }
        });

    $('.menu .authentication-menu .dangky').
        on('click', function () {
            var form = $('.FormDangKy');
            var form2 = $('.FormDangNhap');

            if (form.is(":visible")) {

                form.hide()


            } else {

                form.show();


            }
        });

    $('.thanhtoan .button_thanhtoan').click(function () {
        window.location.href = '/thanh-toan';
    });



});

$(document).ready(function () {

    $('.phienCoTaiKhoan .dangxuat').on('click', function () {

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


    $('.phienCoTaiKhoan .userTaiKhoan .tenTk').on('click', function () {


        window.location.href = '/tai-khoan';


    });


    $('.tat2 .ten').on('click', function () {


        window.location.href = '/tai-khoan';


    });

});

$(document).ready(function () {


    // Sử dụng Ajax để kiểm tra giá trị isAuthenticated
    $.ajax({
        type: 'GET',
        url: '/check-auth', // Điều này đòi hỏi bạn cần có một tuyến đường "/check-auth" trên máy chủ
        success: function (data) {
            if (data.isAuthenticated) {
                var authenticationTk = $(".tat2");
                var authentication = $(".tat1");
                authentication.hide();
                authenticationTk.show();
                $(".header-customer").click(function () {

                    $('.phienCoTaiKhoan #ban').text(data.user.ten);
                    $('.tat2 .tentk').text(data.user.ten + data.user.ho)
                    var customerContentCoTaiKhoan = $(".phienCoTaiKhoan");

                    if (customerContentCoTaiKhoan.is(":visible")) {
                        // Nếu đã hiển thị, ẩn đi
                        customerContentCoTaiKhoan.hide();
                    } else {
                        // Nếu chưa hiển thị, hiển thị lên
                        customerContentCoTaiKhoan.show();

                    }

                });

            } else {
                var authenticationTk = $(".tat2");
                var authentication = $(".tat1");
                authentication.show();
                authenticationTk.hide();
                $(".header-customer").click(function () {
                    var customerContent = $(".header-customer-content");

                    if (customerContent.is(":visible")) {
                        // Nếu đã hiển thị, ẩn đi
                        customerContent.hide();
                    } else {
                        // Nếu chưa hiển thị, hiển thị lên
                        customerContent.show();
                    }
                });

            }
        }
    });

});

$(document).ready(function () {

    //yeuthich
    // Sử dụng Ajax để kiểm tra giá trị isAuthenticated
    function updateYeuThich(data) {

        $('.ĐanhSachYeuThich').empty();
        var favoriteList = $('.ĐanhSachYeuThich');

        data.forEach(function (item) {
            // Create a new item element for each favorite item
            var itemElement = $('<div class="ItemYeuThich"></div>');
            var itemThongTin = $('<div class="thongtin-item"></div>');


            // Create and set values for the item's elements

            var itemImage = $('<div class="anhItem"><img src="' + item.productId["ảnh sản phẩm"] + '"></div>');
            var itemName = $('<div class="ten-san-pham"><p>' + item.productId["tên sản phẩm"] + '</p></div>');
            var itemPrice = $('<div class="gia-san-pham"><p class="gia">' + item.productId["giá tiền"] + '</p></div>');

            // Add data attributes for productId, userId, and yeuthichid
            itemElement.attr('data-productId', item.productId._id);
            itemElement.attr('data-userId', item.userId);
            itemElement.attr('data-yeuthichid', item._id);


            if (item.productId['loại áo']) {
                itemElement.attr('data-loai', "loại áo");

            } else if (item.productId['loại quần']) {
                itemElement.attr('data-loai', "loại quần");
            }




            // Create a remove button
            var addButton = $('<div class="button-gio-hang"><p>Thêm vào giỏ hàng</p></div>');
            var removeButton = $('<div class="button-xoa-item-sp_yeu_thich"><i class="fas fa-times"></i></div>');

            // Append the elements to the item
            itemThongTin.append(itemName, itemPrice, addButton);
            itemElement.append(itemImage, itemThongTin, removeButton);

            // Append the item to the favorite list
            favoriteList.append(itemElement);
        });
        click_xoaYeuThich();
        click_ImgYeuThich();

    };
    function laydulieuYeuThich(userId) {
        $.ajax({
            url: 'lay-du-lieu-yeu-thich',
            method: 'POST',
            dataType: 'json',
            data: {
                userId: userId
            },
            success: function (data) {

                //lay du lieu yeu thich thanh cong
                if (data.error) {

                    // $('.sanphamyeuthich .error').text(data.error);
                    $('.sanphamyeuthich .canhbao').show();
                    $('.sanphamyeuthich .ĐanhSachYeuThich').hide();

                } else {
                    updateYeuThich(data);
                    $('.sanphamyeuthich .canhbao').hide();
                    $('.sanphamyeuthich .ĐanhSachYeuThich').show();
                    console.log("lay du lieu thanh cong");
                }


            },
            error: function (err) {
                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
            }
        });
    };

    function loadDataYeuThich() {
        $.ajax({
            type: 'GET',
            url: '/check-auth',
            dataType: 'json',// Điều này đòi hỏi bạn cần có một tuyến đường "/check-auth" trên máy chủ
            success: function (data) {
                if (data.isAuthenticated) {

                    // alert("lay");
                    laydulieuYeuThich(data.user.userId);


                }
            }
        });
    }


    loadDataYeuThich();

    function click_xoaYeuThich() {

        function xoaDataYeuThich(yeuthichid) {
            $.ajax({
                type: 'POST',
                url: '/xoa-yeuthich',
                dataType: 'json',// Điều này đòi hỏi bạn cần có một tuyến đường "/check-auth" trên máy chủ
                data: {
                    yeuthichid: yeuthichid
                },
                success: function (data) {
                    if (data.success) {
                        console.log("xóa thành công yêu thích");

                        loadDataYeuThich();

                    }
                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });
        }

        $('.button-xoa-item-sp_yeu_thich').off('click');
        $('.button-xoa-item-sp_yeu_thich').on('click', function () {
            // Lấy giá trị của thuộc tính data-yeuthichid
            var yeuthichid = $(this).parent('.ItemYeuThich').data('yeuthichid');
            xoaDataYeuThich(yeuthichid);


        });

    }

    function click_ImgYeuThich() {
        $('.ItemYeuThich .anhItem img').on('click', function () {

            var productId = $(this).closest('.ItemYeuThich ').data('productid');
            var loai = $(this).closest('.ItemYeuThich').data('loai');

            window.location.href = '/mua-san-pham?loai=' + loai + '&sanpham=' + productId;

        })
    }

});