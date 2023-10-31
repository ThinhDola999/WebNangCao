function UpdateGioHang_2() {


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
                                    var anhItem = $('<div class="anhItem"><img src="' + item.img + '"></div>');
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

function UpdateGioHang() {


    $.ajax({
        url: '/lay-du-lieu-gio-hang',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            //THEM GIO HANG PHIEN TAIKHOAN
            if (data.isAuthenticated) {

                $('.main .thong-tin-san-pham-gio-hang .DanhSachGioHang').empty();
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


                                // $('.GioHang .thongbao_giohang').show();
                                // $('.thanhtoan').hide();

                            } else {

                                console.log(data)

                                // $('.GioHang .thongbao_giohang').hide();
                                $('.main .thong-tin-san-pham-gio-hang .DanhSachGioHang').empty();
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
                                    $('.main .thong-tin-san-pham-gio-hang .DanhSachGioHang').append(itemGioHang);
                                });

                                function tinhTongTien(gioHang) {
                                    $('.main .thong-tin-khac .thongtin_chiphi .sl  h7').text(gioHang.length);
                                    $('.main .thong-tin-san-pham-gio-hang .soluong-sp h7').text(gioHang.length)
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

                                $('.main .thong-tin-khac .tong_tien h7').text(tongtienChuoi);
                                $('.main .thong-tin-khac .thongtin_chiphi .tt  h7').text(tongtienChuoi);
                                $('.main .thong-tin-khac .so_tien_thanh_toan h7').text(tongtienChuoi);
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

                $('.main .thong-tin-san-pham-gio-hang .DanhSachGioHang').empty();
                if (data.GioHang && data.GioHang.length > 0) {

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
                        $('.main .thong-tin-san-pham-gio-hang .DanhSachGioHang').append(itemGioHang);
                    });

                    function tinhTongTien(gioHang) {
                        $('.main .thong-tin-khac .thongtin_chiphi .sl  h7').text(gioHang.length);
                        $('.main .thong-tin-san-pham-gio-hang .soluong-sp h7').text(gioHang.length)
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

                    $('.main .thong-tin-khac .tong_tien h7').text(tongtienChuoi);
                    $('.main .thong-tin-khac .thongtin_chiphi .tt  h7').text(tongtienChuoi);
                    $('.main .thong-tin-khac .so_tien_thanh_toan h7').text(tongtienChuoi);
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
                        UpdateGioHang_2();
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
                        UpdateGioHang_2();
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
    UpdateGioHang_2();
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