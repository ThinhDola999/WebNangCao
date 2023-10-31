

$(document).ready(function () {


    $(".toggle").click(function () {
        // $(".menu").removeClass("active");
        $(".menu").show();

    });

    // Ẩn menu khi con trỏ ra khỏi menu
    $(".menu").mouseleave(function () {
        $(this).hide();
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


    $('.tat2 .ten').on('click', function () {


        window.location.href = '/tai-khoan';


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



    $(".header-customer").click(function () {
        var customerContent = $(".header-customer-content-Tai-Khoan");

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



    $('.thanhtoan .button_thanhtoan').click(function () {
        window.location.href = '/thanh-toan';
    });

});


$(document).ready(function () {




    $('.header-customer-content-Tai-Khoan .dangxuat').on('click', function () {

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
        $('.ItemYeuThich .anhItem img').off('click');
        $('.ItemYeuThich .anhItem img').on('click', function () {

            var productId = $(this).closest('.ItemYeuThich ').data('productid');
            var loai = $(this).closest('.ItemYeuThich').data('loai');

            window.location.href = '/mua-san-pham?loai=' + loai + '&sanpham=' + productId;

        })
    }


    function UpdateGioHang() {


        $.ajax({
            url: '/lay-du-lieu-gio-hang',
            method: 'GET',
            dataType: 'json',
            success: function (data) {

                //THEM GIO HANG PHIEN TAIKHOAN
                if (data.isAuthenticated) {

                    $('.header .GioHang .DanhSachGioHang').empty();
                    loadGioHang_phienTk(data.user.userId);
                    function loadGioHang_phienTk(userId) {

                        $.ajax({
                            url: '/lay_du_lieu_databaseGioHang',
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                userId: userId,

                            },
                            success: function (data) {


                                if (data.error) {


                                    $('.GioHang .thongbao_giohang').show();
                                    $('.thanhtoan').hide();

                                } else {

                                    console.log(data)

                                    $('.GioHang .thongbao_giohang').hide();
                                    $('.header .GioHang .DanhSachGioHang').empty();
                                    data.forEach(function (item) {
                                        // Truy cập thông tin của từng sản phẩm

                                        // Tạo một item sản phẩm mới
                                        var itemGioHang = $('<div class="ItemGioHang"></div>');

                                        itemGioHang.attr('data-productid', item['productId']['_id']);
                                        itemGioHang.attr('data-userid', item.userId);

                                        itemGioHang.attr('data-giohangid', item._id);

                                        if (item.productId['loại áo']) {
                                            itemGioHang.attr('data-loai', "loại áo");

                                        } else if (item.productId['loại quần']) {
                                            itemGioHang.attr('data-loai', "loại quần");
                                        }


                                        // Tạo các phần tử HTML trong item sản phẩm
                                        var anhItem = $('<div class="anhItem"><img src="' + item['productId']['ảnh sản phẩm'] + '"></div>');
                                        var thongtinItem = $('<div class="thongtin-item"></div>');
                                        var tenSanPham = $('<div class="ten-san-pham"><p>' + item['productId']['tên sản phẩm'] + '</p></div>');
                                        var mauSize = $('<div class="mau-size"></div>');
                                        var mau = $('<div class="mau"><p>MÀU <h7>' + item.mauSac + '</h7></p></div>');
                                        var size = $('<div class="size"><p>SIZE <h7>' + item.size + '</h7></p></div>');

                                        var soluongItem = $('<p>SỐ LƯỢNG: <h7>' + item.soLuong + '</h7></p>');
                                        var giaSanPham = $('<div class="gia-san-pham"><p class="gia">' + item['productId']['giá tiền'] + '</p></div>');
                                        var buttonXoaItemGioHang = $('<div class="button-xoa-item-gio_hang"><i class="fas fa-times"></i></div>');

                                        // Gắn các phần tử vào item sản phẩm
                                        mauSize.append(mau, size);
                                        thongtinItem.append(tenSanPham, mauSize, soluongItem, giaSanPham);
                                        itemGioHang.append(anhItem, thongtinItem, buttonXoaItemGioHang);

                                        // Gắn item sản phẩm vào phần DanhSachGioHang
                                        $('.header .GioHang .DanhSachGioHang').append(itemGioHang);
                                    });

                                    function tinhTongTien(gioHang) {
                                        var tongTien = 0;

                                        for (var i = 0; i < gioHang.length; i++) {
                                            var item = gioHang[i];
                                            var gia = parseFloat(item['productId']['giá tiền'].replace(/\D/g, '')); // Chuyển giá từ chuỗi sang số, loại bỏ ký tự không phải số
                                            var soLuong = parseInt(item.soLuong, 10);
                                            tongTien += gia * soLuong;
                                        }

                                        return tongTien;
                                    }
                                    const tongtien = tinhTongTien(data);
                                    const tongtienChuoi = tongtien.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    });

                                    // Đặt giá trị vào .so_tien

                                    $('.thanhtoan .tong_tien .so_tien').text(tongtienChuoi);
                                    $('.thanhtoan').show();
                                    click_ImgGioHang()
                                    Click_xoaGioHang();

                                }

                            },
                            error: function (err) {
                                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                            }
                        });
                    }

                }
                //THEM GIO HANG PHIEN  0 TAIKHOAN
                else {

                    $('.header .GioHang .DanhSachGioHang').empty();
                    if (data.GioHang && data.GioHang.length > 0) {
                        $('.GioHang .thongbao_giohang').hide();
                        data.GioHang.forEach(function (product) {
                            // Truy cập thông tin của từng sản phẩm

                            // Tạo một item sản phẩm mới
                            var itemGioHang = $('<div class="ItemGioHang"></div>');

                            itemGioHang.attr('data-id', product._id);
                            itemGioHang.attr('data-loai', product.loai);
                            itemGioHang.attr('data-productid', product.productid);

                            // Tạo các phần tử HTML trong item sản phẩm
                            var anhItem = $('<div class="anhItem"><img src="' + product.img + '"></div>');
                            var thongtinItem = $('<div class="thongtin-item"></div>');
                            var tenSanPham = $('<div class="ten-san-pham"><p>' + product.ten + '</p></div>');
                            var mauSize = $('<div class="mau-size"></div>');
                            var mau = $('<div class="mau"><p>MÀU <h7>' + product.mauSac + '</h7></p></div>');
                            var size = $('<div class="size"><p>SIZE <h7>' + product.size + '</h7></p></div>');

                            var soluongItem = $('<p>SỐ LƯỢNG: <h7>' + product.soLuong + '</h7></p>');
                            var giaSanPham = $('<div class="gia-san-pham"><p class="gia">' + product.gia + '</p></div>');
                            var buttonXoaItemGioHang = $('<div class="button-xoa-item-gio_hang"><i class="fas fa-times"></i></div>');

                            // Gắn các phần tử vào item sản phẩm
                            mauSize.append(mau, size);
                            thongtinItem.append(tenSanPham, mauSize, soluongItem, giaSanPham);
                            itemGioHang.append(anhItem, thongtinItem, buttonXoaItemGioHang);

                            // Gắn item sản phẩm vào phần DanhSachGioHang
                            $('.header .GioHang .DanhSachGioHang').append(itemGioHang);
                        });

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
                        const tongtien = tinhTongTien(data.GioHang);
                        const tongtienChuoi = tongtien.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        });

                        // Đặt giá trị vào .so_tien

                        $('.thanhtoan .tong_tien .so_tien').text(tongtienChuoi);
                        $('.thanhtoan').show();
                        click_ImgGioHang()
                        Click_xoaGioHang();




                    } else {
                        $('.GioHang .thongbao_giohang').show();
                        $('.thanhtoan').hide();
                    }




                }

            },
            error: function (err) {
                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
            }
        });


    }

    function Click_xoaGioHang() {

        function xoaSanPhamKhoiGioHang(productToBeDeleted) {
            // Loại bỏ sản phẩm từ giỏ hàng, đây là một ví dụ giả định:

            $.ajax({
                url: '/lay-du-lieu-gio-hang',
                method: 'GET',
                dataType: 'json',
                success: function (data) {

                    //THEM GIO HANG PHIEN TAIKHOAN
                    if (data.isAuthenticated) {

                        xoaGioHangPhienTaiKhoan(productToBeDeleted);

                    }
                    //THEM GIO HANG PHIEN  0 TAIKHOAN
                    else {

                        xoaGioHangKhongTaiKhoan(productToBeDeleted);

                    }

                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });

            function xoaGioHangPhienTaiKhoan(gioHangId) {
                $.ajax({
                    url: '/xoa-gio-hang-databaseGioHang',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        GioHangId: gioHangId,

                    },
                    success: function (data) {


                        if (data.success) {
                            UpdateGioHang();
                            console.log('xóa thành công giỏ hàng');

                        } else {
                            console.log('không thành công')

                        }


                    },
                    error: function (err) {
                        console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                    }
                });

            }
            function xoaGioHangKhongTaiKhoan(productToBeDeleted) {
                $.ajax({
                    url: '/xoa-gio-hang',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        product1: productToBeDeleted,

                    },
                    success: function (data) {


                        if (data.success) {
                            UpdateGioHang();
                            console.log('xóa thành công giỏ hàng');
                            console.log(data.data1)
                        } else {
                            console.log('không thành công')
                            console.log(data.data1)
                        }


                    },
                    error: function (err) {
                        console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                    }
                });
            }



        }


        $('.ItemGioHang .button-xoa-item-gio_hang').on('click', function () {

            var itemGioHang = $(this).closest('.ItemGioHang');



            $.ajax({
                url: '/lay-du-lieu-gio-hang',
                method: 'GET',
                dataType: 'json',
                success: function (data) {

                    //THEM GIO HANG PHIEN TAIKHOAN
                    if (data.isAuthenticated) {

                        var _id = itemGioHang.data('giohangid');
                        xoaSanPhamKhoiGioHang(_id);

                    }
                    //THEM GIO HANG PHIEN  0 TAIKHOAN
                    else {
                        var _id = itemGioHang.data('id');
                        xoaSanPhamKhoiGioHang(_id);
                    }

                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });



            // Thực hiện các tác vụ khác sau khi xóa
        })
    }

    function LoadGioHang() {

        UpdateGioHang();
    }

    Click_xoaGioHang();
    LoadGioHang();

    function click_ImgGioHang() {
        $('.ItemGioHang .anhItem img').on('click', function () {

            var productId = $(this).closest('.ItemGioHang ').data('productid');
            var loai = $(this).closest('.ItemGioHang').data('loai');
            var mau = $(this).closest('.ItemGioHang').find('.thongtin-item .mau-size .mau p h7').text();
            var size = $(this).closest('.ItemGioHang').find('.thongtin-item .mau-size .size p h7').text();
            window.location.href = '/mua-san-pham-gio-hang?loai=' + loai
                + '&sanpham=' + productId
                + '&mau=' + mau
                + '&size=' + size;

        })
    }


});