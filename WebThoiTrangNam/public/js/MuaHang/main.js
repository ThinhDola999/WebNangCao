$(document).ready(function () {

    click_soluong();


    function click_huongDanChonSisze() {


        $('.info .chonsize .huongdan').on('click', function () {

            $('.phan-huong-dan-chon-size-cho-khach').show();
        });
    }
    function click_soluong() {
        const plus = $(".plus");
        const minus = $(".minus");
        const num = $(".num");

        let a = 1;

        plus.on("click", function () {
            a++;

            num.text(a);
            $('.soluong p h7').text(a);
            console.log(a);
        });

        minus.on("click", function () {
            if (a > 1) {
                a--;

                num.text(a);
                $('.soluong p h7').text(a);
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



    LoadGioHang();

    function click_MuaNgay() {

        $('.main .info .chonsoluong .buttonMua .muangay').off('click');
        $('.main .info .chonsoluong .buttonMua .muangay').on('click', function () {

            const productId = $(this).data('id');
            const loai = $(this).data('loai');

            $.ajax({
                url: '/lay-du-lieu-gio-hang',
                method: 'GET',
                dataType: 'json',
                success: function (data) {

                    //THEM GIO HANG PHIEN TAIKHOAN
                    if (data.isAuthenticated) {

                        luuVaoDatabase(productId, data.user.userId);

                    }
                    //THEM GIO HANG PHIEN  0 TAIKHOAN
                    else {

                        luuVaoSession(loai, productId);

                    }

                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });


        });
        function luuVaoSession(loai, productid) {



            const imgSanPham = $('.mainimage img').attr('src');
            const tenSanPham = $('.info .ten-gia h3').text();
            const giaSanPham = $('.info .ten-gia h2').text();
            // const giaSanPham = parseInt(giaSanPhamText.replace(/\D/g, ''), 10);
            const mauSanPham = $('.tenMau p h7').text();
            const sizeSanPham = $('.chonsize p h7').text();
            const soluongSp = $('.soluong p h7').text();

            $.ajax({
                url: 'them-vao-gio',
                method: 'POST',
                dataType: 'json',
                data: {
                    img: imgSanPham,
                    ten: tenSanPham,
                    gia: giaSanPham,
                    mauSac: mauSanPham,
                    size: sizeSanPham,
                    soLuong: soluongSp,
                    loai: loai,
                    productid: productid
                },
                success: function (data) {

                    if (data.success) {


                        UpdateGioHang();

                        console.log(data.data1)
                    } else {
                        console.log(data.data1)
                    }

                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });

        }
        function luuVaoDatabase(productId, userId) {


            // alert(productId)
            const mauSac = $('.info .tenMau p h7').text();
            const size = $('.info .chonsize p h7').text();
            const soLuong = $('.info .soluong p h7').text();
            const imgSanPham = $('.mainimage img').attr('src');
            $.ajax({
                url: 'them_gio_hang_tk',
                method: 'POST',
                dataType: 'json',
                data: {
                    userId: userId,
                    productId: productId,
                    mauSac: mauSac,
                    size: size,
                    soLuong: soLuong,
                    img: imgSanPham



                },
                success: function (data) {

                    if (data.success) {


                        UpdateGioHang();

                        // console.log(data.data1)
                    } else {
                        // console.log(data.data1)
                    }

                },
                error: function (err) {
                    console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
                }
            });


        }

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




    const params = new URLSearchParams(window.location.search);
    const productId = params.get('sanpham');
    const loai = params.get('loai');
    const mauSP = params.get('mau');
    const sizeSP = params.get('size');
    var isbool = false;
    if (mauSP !== null && sizeSP !== null) {
        // Có dữ liệu truyền vào cho 'mau' và 'size'
        // console.log(`Màu: ${mau}, Size: ${size}`);
        isbool = true;

    } else {
        // Không có dữ liệu hoặc một trong hai là null
        // console.log('Không có dữ liệu cho màu hoặc size.');
        isbool = false;
    }


    function UpdateMuaHang(data) {


        $('.buttonMua').empty();
        var buttonMua = $('<p class="muangay" data-id="' + productId + '" data-loai="' + loai + '">MUA NGAY</p>');
        $('.buttonMua').append(buttonMua);

        $('.yeuthich_tym').empty();
        var yeuthich = $('<img class="tym"  id="tym" data-id="' + productId + '" src="anh/heart.png">')
        $('.yeuthich_tym').append(yeuthich);
        click_yeuthich();


        $('.ten-gia').empty();

        var tensp = $('<h3>' + data[0]["tên sản phẩm"] + '</h3>');
        var giasp = $('<h2>' + data[0]["giá tiền"] + '</h2>');

        $('.ten-gia').append(tensp, giasp);


        $('.danhSachSize').empty();
        $('.chonsize').empty();
        $('.tenMau').empty();
        $('.danhSachMau').empty();

        $('.dacdiem .thongtin1').empty();
        $('.dacdiem .thongtin2').empty();

        $('.mainimage').empty();



        data.forEach(function (item) {



            if (item["_id"] === productId) {



                var changeimg = $(' <div class="changeimg active" data-mau="' + item['màu sắc'] + '" data-productid="' + item["_id"] + '"></div>');
                var img = $('<img src="' + item["ảnh sản phẩm"] + '">');
                changeimg.append(img);
                $('.danhSachMau').append(changeimg);



                var mainImg = $('<img src="' + item["ảnh sản phẩm"] + '">');
                $('.mainimage').append(mainImg);

                var mau = $('<h7>' + item['màu sắc'] + '</h7>')
                var chonMauSac = $('<p>Chọn màu sắc: </p>')
                chonMauSac.append(mau);
                $('.tenMau').append(chonMauSac);

                var form = $('<li>Form : ' + item["form"] + '</li>');
                var thietke = $('<li>Thiết kế : ' + item["thiết kế"] + '</li>');
                var loai = "";
                if (item["loại quần"]) {
                    loai = item["loại quần"];
                } else if (item["loại áo"]) {
                    loai = item["loại áo"];
                }
                var nhomsanpham = $('<li>Nhóm sản phẩm : ' + loai + '</li>');
                $('.dacdiem .thongtin1').append(form, thietke, nhomsanpham);


                var chatlieu = $('<li>Chất liệu : ' + item["chất liệu"] + '</li>');
                var gioitinh = $('<li>Giới tính : Nam</li>');
                $('.dacdiem .thongtin2').append(chatlieu, gioitinh)



                item["size"].forEach(function (itemSize) {


                    if (itemSize === item["sizeSanPham"]) {

                        var button = $('<button class="button1 active">' + itemSize + '</button>')
                        $('.danhSachSize').append(button);

                        var size = $('<h7>' + itemSize + '</h7>')
                        var chonsize = $('<p>Chọn size: </p>')
                        var huongdan = $(' <p class="huongdan">Hướng dẫn chọn size</p>');
                        chonsize.append(size);
                        $('.chonsize').append(chonsize, huongdan);

                    } else {
                        var button = $('<button class="button1">' + itemSize + '</button>')
                        $('.danhSachSize').append(button);
                    }


                });
            } else {

                var changeimg = $('<div class="changeimg" data-mau="' + item['màu sắc'] + '" data-productid="' + item["_id"] + '"></div>');
                var img = $('<img src="' + item["ảnh sản phẩm"] + '">');
                changeimg.append(img);
                $('.danhSachMau').append(changeimg);

            }
            click_huongDanChonSisze();



        });

        if (isbool) {

            $('.changeimg').each(function () {
                var dataMau = $(this).data('mau');

                if (dataMau === mauSP) {
                    // Nếu "data-mau" giống với "BLACK", thì thêm lớp "active"
                    $(this).addClass('active');

                    var img = $(this).find('img').attr('src');
                    $('.mainimage img').attr('src', img);
                } else {
                    // Nếu không khớp, loại bỏ lớp "active"
                    $(this).removeClass('active');
                }


            });

            $('.button1').each(function () {
                var dataS = $(this).text();

                if (dataS === sizeSP) {
                    // Nếu "data-mau" giống với "BLACK", thì thêm lớp "active"
                    $(this).addClass('active');

                } else {
                    // Nếu không khớp, loại bỏ lớp "active"
                    $(this).removeClass('active');
                }


            });
        }
        click_AnhChonMau();
        click_ChonSize();
        click_MuaNgay();

    }

    function LayDuLieu(productId, loai) {


        $.ajax({
            url: 'mua-san-pham',
            method: 'POST',
            dataType: 'json',
            data: {
                productId: productId,
                loaiSanPham: loai

            },
            success: function (data) {
                // Cập nhật dữ liệu trên trang

                if (data.thongbao) {

                    console.log(data.error);


                } else {

                    UpdateMuaHang(data);



                }

            },
            error: function (error) {
                console.error('Lỗi khi sắp xếp dữ liệu3:', error);
            }
        });


    }

    LayDuLieu(productId, loai);



    function click_AnhChonMau() {

        $('.changeimg').off('click');
        $('.changeimg').on('click', function () {

            var mau = $(this).data('mau');
            $('.tenMau p h7').text(mau);

            var src = $(this).find('img').attr('src');
            var imgElement = $('.mainimage img');
            // Cập nhật thuộc tính src của phần tử img
            imgElement.attr('src', src);

            $('.changeimg').removeClass('active');
            $(this).addClass('active');

            const productid = $(this).data('productid');
            $('.info .chonsoluong .yeuthich_tym #tym').data('id', productid);
        })

    }

    function click_ChonSize() {
        $('.danhSachSize .button1').off('click');
        $('.danhSachSize .button1').on('click', function () {

            var size = $(this).text();
            $('.chonsize p h7').text(size);

            $('.danhSachSize .button1').removeClass('active');
            $(this).addClass('active');


        })
    }

});


function click_yeuthich() {

    function guidulieu(userId, productId) {
        $.ajax({
            url: '/yeu-thich',
            method: 'POST',
            dataType: 'json',
            data: {
                userId: userId,
                productId: productId
            },
            success: function (data) {
                console.log(data.success);
                loadDataYeuThich();
                alert(data.success);
            },
            error: function (error) {
                console.error('Lỗi khi sắp xếp dữ liệu5:', error);
            }
        });
    }
    $('.info .chonsoluong .yeuthich_tym .tym').off('click');
    $('.info .chonsoluong .yeuthich_tym .tym').on('click', function () {
        var clickedIcon = $(this); // Lưu giá trị 'this' tại đây
        $.ajax({
            type: 'GET',
            url: '/check-auth',
            success: function (data) {
                if (data.isAuthenticated) {
                    const productId = clickedIcon.data('id');
                    guidulieu(data.user.userId, productId);

                    // window.location.href = '/yeu-thich?productId=' + productId + '&userId=' + data.userId;
                } else {
                    var form = $('.FormDangNhap');
                    if (form.is(":visible")) {
                        form.hide();
                    } else {
                        form.show();
                    }
                }
            }
        });
    });


    function updateYeuThich(data) {

        $('.header .ĐanhSachYeuThich').empty();
        var favoriteList = $('.header .ĐanhSachYeuThich');

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

            var loai = "";
            if (item.productId['loại áo']) {
                loai = "loại áo"
            } else if (item.productId['loại quần']) {
                loai = "loại quần"
            }
            itemElement.attr('data-loai', loai);
            // Create a remove button
            var addButton = $('<div class="button-gio-hang"><p>Thêm vào giỏ hàng</p></div>');
            var removeButton = $('<div class="button-xoa-item-sp_yeu_thich"><i class="fas fa-times"></i></div>');

            // Append the elements to the item
            itemThongTin.append(itemName, itemPrice, addButton);
            itemElement.append(itemImage, itemThongTin, removeButton);

            // Append the item to the favorite list
            favoriteList.append(itemElement);
        });

        click_ImgYeuThich();
        click_xoaYeuThich();

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
                    $('.header .sanphamyeuthich .canhbao').show();
                    $('.header .sanphamyeuthich .ĐanhSachYeuThich').hide();

                } else {
                    updateYeuThich(data);
                    $('.header .sanphamyeuthich .canhbao').hide();
                    $('.header .sanphamyeuthich .ĐanhSachYeuThich').show();
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

    function click_ImgYeuThich() {
        $('.ItemYeuThich .anhItem img').on('click', function () {

            var productId = $(this).closest('.ItemYeuThich ').data('productid');
            var loai = $(this).closest('.ItemYeuThich').data('loai');

            window.location.href = '/mua-san-pham?loai=' + loai + '&sanpham=' + productId;

        })
    }

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
}

