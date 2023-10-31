$(document).ready(function () {
    // Sử dụng AJAX để gửi yêu cầu đến máy chủ và lấy dữ liệu từ cơ sở dữ liệu

    LoadData();

    function UpdateData(data1, data2) {

        // Xóa dữ liệu cũ trong .AoQuan
        $('.AoQuan').empty();
        // console.log(data1)
        // Dữ liệu đã được lấy từ cơ sở dữ liệu
        // Lặp qua dữ liệu và thêm vào .AoQuan
        data1.forEach(function (item) {
            var loai = "";
            if (item['loại áo']) {
                loai = "loại áo";
            } else if (item['loại quần']) {
                loai = "loại quần";
            }
            var productDiv = $('<div class="ItemAoQuan" data-id="' + item["_id"] + '" data-loai="' + loai + '"></div>');
            var productImg = $('<img src="' + item["ảnh sản phẩm"] + '">');
            var productContent = $('<div class="contentItem"></div>');
            var productName = $('<p class="tenSanPham">' + item["tên sản phẩm"] + '</p>');
            var productIcon = $('<i class="fa-regular fa-heart"></i>');
            var productPrice = $('<p class="gia">' + item['giá tiền'] + '</p>');

            if (data2[item['loại áo']]) {
                i = 0;

                var mauSacDiv = $('<div class="MauSac"></div>');
                data2[item['loại áo']][item['form']][item['thiết kế']].forEach(function (mau) {
                    i++
                    if (i <= 4) {
                        var mauSacSpan = $('<div class="AnhMauSac"><img src="' + mau + '"></div>');
                        mauSacDiv.append(mauSacSpan);
                    }

                });

            }

            if (data2[item['loại quần']]) {
                i = 0;
                var mauSacDiv = $('<div class="MauSac"></div>');
                data2[item['loại quần']][item['form']][item['thiết kế']].forEach(function (mau) {
                    i++
                    if (i <= 4) {
                        var mauSacSpan = $('<div class="AnhMauSac"><img src="' + mau + '"></div>');
                        mauSacDiv.append(mauSacSpan);
                    }

                });

            }

            productContent.append(productName, productIcon);
            productDiv.append(productImg, productContent, productPrice, mauSacDiv);

            $('.AoQuan').append(productDiv);
        });

        click_yeuthich();
        click_img();

    }


    function UpdatePhanTrang(data1) {

        var soLuongSanPham = data1.length;

        $('.soLuongSanPham').text(soLuongSanPham + ' sản phẩm');


        PhanTrang(soLuongSanPham);
    }


    function LoadData() {



        const DataBoLoc = LayDuLieuDanhSachLuaChon();
        var tuKhoa = $('#searchInput').val();
        var order = $('.SapXep #sorter').val();
        $.ajax({
            url: 'TimKiem',
            method: 'POST',
            dataType: 'json',
            data: {

                tuKhoa: tuKhoa,
                sortOrder: order,
                dataBoLoc: DataBoLoc
            },
            success: function (data) {


                UpdatePhanTrang(data['loại'])

                var dataLoai = data["loại"].slice(0, 12);
                var dataMau = data["màu"];

                // var dataMoi = {
                //     "loại": dataLoai,
                //     "màu": dataMau
                // };

                UpdateData(dataLoai, dataMau);



            },
            error: function (err) {
                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 1:', err);
            }
        });
    }

    function PhanTrang(TongDuLieu) {

        TongSoTrang = Math.ceil(TongDuLieu / 12);

        var paginationDiv = $(".PhanTrang");
        paginationDiv.empty();
        var iconLeft = $("<i></i>").addClass("fas fa-chevron-left");
        var iconRight = $("<i></i>").addClass("fas fa-chevron-right");

        var buttonLeft = $("<button></button>")
            .addClass('previous')
            .append(iconLeft);

        var buttonRight = $("<button></button>")
            .addClass('next')
            .append(iconRight);


        paginationDiv.prepend(buttonLeft);

        for (var i = 1; i <= TongSoTrang; i++) {
            var linkClass = (i === 1) ? "trang trang-hien-tai" : "trang";
            var linkId = "trang_" + i;
            var linkDataTrang = i;

            var link = $("<a></a>")
                .addClass(linkClass)
                .attr("id", linkId)
                .attr("data-trang", linkDataTrang)
                .text(i);

            paginationDiv.append(link);
        }

        paginationDiv.append(buttonRight);


    }
    function LoadTrang(so) {

        const DataBoLoc = LayDuLieuDanhSachLuaChon();
        var tuKhoa = $('#searchInput').val();
        var order = $('.SapXep #sorter').val();
        $.ajax({
            url: 'TimKiem',
            method: 'POST',
            dataType: 'json',
            data: {

                tuKhoa: tuKhoa,
                sortOrder: order,
                dataBoLoc: DataBoLoc
            },
            success: function (data) {


                var startIndex = (so - 1) * 12;
                var endIndex = startIndex + 12;

                // Lấy 12 dòng dữ liệu từ vị trí startIndex đến endIndex
                var dataLoai = data["loại"].slice(startIndex, endIndex);
                var dataMau = data["màu"];

                // var dataMoi = {
                //     "loại": dataLoai,
                //     "màu": dataMau
                // };

                UpdateData(dataLoai, dataMau);


            },
            error: function (err) {
                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu2:', err);
            }
        });
    }


    $(document).on("click", ".next", function () {



        var trang = $(".trang-hien-tai").data("trang");
        if (parseInt(trang) > 0 && parseInt(trang) < parseInt(TongSoTrang)) {

            id = trang + 1;
            $(".trang-hien-tai").removeClass("trang-hien-tai");
            $("#trang_" + id).addClass("trang-hien-tai");
            LoadTrang(id);



        }


    });


    $(document).on("click", ".previous", function () {



        var trang = $(".trang-hien-tai").data("trang");
        if (parseInt(trang) > 1 && parseInt(trang) <= parseInt(TongSoTrang)) {

            id = trang - 1;
            $(".trang-hien-tai").removeClass("trang-hien-tai");
            $("#trang_" + id).addClass("trang-hien-tai");
            LoadTrang(id);

        }



    });


    $(document).on("click", ".trang", function () {

        var trang = $(this).data("trang");
        $(".trang-hien-tai").removeClass("trang-hien-tai");
        $(this).addClass("trang-hien-tai");
        LoadTrang(trang);

    });


    $(document).ready(function () {
        // Sử dụng jQuery để nghe sự kiện thay đổi của phần tử select
        $('.SapXep #sorter').change(function () {
            var selectedValue = $(this).val(); // Lấy giá trị được chọn

            // Gọi hàm sortData với giá trị đã chọn
            sortData(selectedValue);
        });
    });

    function sortData(order) {


        const DataBoLoc = LayDuLieuDanhSachLuaChon();
        var tuKhoa = $('#searchInput').val();
        var order = $('.SapXep #sorter').val();
        $.ajax({
            url: 'TimKiem',
            method: 'POST',
            dataType: 'json',
            data: {

                tuKhoa: tuKhoa,
                sortOrder: order,
                dataBoLoc: DataBoLoc
            },
            success: function (data) {
                // Cập nhật dữ liệu trên trang

                UpdatePhanTrang(data['loại']);

                var dataLoai = data["loại"].slice(0, 12);
                var dataMau = data["màu"];

                // var dataMoi = {
                //     "loại": dataLoai,
                //     "màu": dataMau
                // };

                UpdateData(dataLoai, dataMau);

            },
            error: function (error) {
                console.error('Lỗi khi sắp xếp dữ liệu3:', error);
            }
        });
    }



    //boloc
    // $(document).ready(function () {


    function LoadDataBoLoc() {


        $.ajax({
            url: 'TimKiem', // Đường dẫn API để lấy dữ liệu
            method: 'GET',
            dataType: 'json',
            success: function (data) {


                MauSac(data)
                Size(data)

                ClickCheckBox();
                ClickSize();

            },
            error: function (err) {
                console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu4:', err);
            }
        });
    }


    LoadDataBoLoc();


    function MauSac(data) {

        $('.MauSac .MenuItem').empty();


        data["mauSac"].forEach(function (item) {
            // Tạo các phần tử và thêm chúng vào ItemDiv trong vòng lặp
            var mau = item["màu sắc"]
            var ItemDiv = $('<div class="Item"></div>');
            var ItemInput = $('<input type="checkbox" data-item="màu sắc" value="' + mau + '"></input>');
            var ItemP = $('<p>' + mau + '</p>');

            ItemDiv.append(ItemInput, ItemP);

            // Thêm ItemDiv vào .MenuItem trong vòng lặp
            $('.MauSac .MenuItem').append(ItemDiv);
        });



    }

    function Size(data) {

        $('.Size .MenuItem').empty();

        var ItemDiv = $('<div class="ItemSize"></div>');
        data["size"].forEach(function (item) {
            // Tạo các phần tử và thêm chúng vào ItemDiv trong vòng lặp
            var size = item["size"]

            var ItemP = $('<p class="pSize" data-item="size">' + size + '</p>');

            ItemDiv.append(ItemP);

            // Thêm ItemDiv vào .MenuItem trong vòng lặp
            $('.Size .MenuItem').append(ItemDiv);
        });



    }



    function LayDuLieuDanhSachLuaChon() {

        var selectedData = [];
        $('.DanhSachLuaChon p').each(function () {
            var dataItem = $(this).data('item');
            var text = $(this).text();
            selectedData.push({
                'data-item': dataItem,
                'text': text
            });
        });

        return selectedData;
    }

    function GuiDuLieuBoLoc(DataBoLoc) {

        var tuKhoa = $('#searchInput').val();
        var order = $('.SapXep #sorter').val();
        $.ajax({
            url: 'TimKiem',
            method: 'POST',
            dataType: 'json',
            data: {

                tuKhoa: tuKhoa,
                sortOrder: order,
                dataBoLoc: DataBoLoc
            },
            success: function (data) {


                if (data['loại'].length === 0) {
                    // Xử lý trường hợp mảng rỗng
                    // $('.thongBao').show();

                    $('.DanhSachSanPham .thongBao').text("Không tìm thấy dữ liệu phù hợp");
                    $('.soLuongSanPham').text(0 + ' sản phẩm');

                    $('.DanhSachSanPham .AoQuan').hide();
                    $('.PhanTrang').hide();

                    $('.DanhSachSanPham .thongBao').show();



                } else {
                    // Xử lý dữ liệu khi có kết quả
                    $('.DanhSachSanPham .AoQuan').show();
                    $('.DanhSachSanPham .PhanTrang').show();
                    $('.DanhSachSanPham .thongBao').hide();


                    MauSac(data);
                    Size(data);

                    ClickSize();
                    ClickCheckBox();


                    // Lấy danh sách các mục đã chọn
                    var selectedData = LayDuLieuDanhSachLuaChon();

                    // Lặp qua danh sách checkbox trong .MenuItem
                    $('.MenuItem input[type="checkbox"]').each(function () {
                        var checkbox = $(this);
                        var checkboxDataItem = checkbox.data('item');
                        var checkboxValue = checkbox.val();

                        // Kiểm tra xem checkboxDataItem có khớp với bất kỳ mục nào trong selectedData không
                        for (var i = 0; i < selectedData.length; i++) {
                            var selectedItem = selectedData[i];
                            if (selectedItem['data-item'] === checkboxDataItem && selectedItem['text'] === checkboxValue) {
                                // Nếu có sự khớp, đặt checked thành true và thoát khỏi vòng lặp
                                checkbox.prop('checked', true);
                                break;
                            }
                        }
                    });

                    $('.Size .MenuItem .pSize').each(function () {

                        var pSize = $(this);
                        var sizeDataItem = pSize.data('item');
                        var sizeText = pSize.text();

                        for (var i = 0; i < selectedData.length; i++) {
                            var selectedItem = selectedData[i];
                            if (selectedItem['data-item'] === sizeDataItem && selectedItem['text'] === sizeText) {
                                // Nếu có sự khớp, đặt checked thành true và thoát khỏi vòng lặp
                                pSize.addClass("activeSize");
                                break;
                            }
                        }

                    });


                    UpdatePhanTrang(data["loại"])

                    UpdateData(data["loại"], data["màu"]);





                }

            },
            error: function (error) {
                console.error('Lỗi khi sắp xếp dữ liệu5:', error);
            }
        });
    }

    function ClickCheckBox() {


        $('.MenuItem input[type="checkbox"]').off('click');
        $('.MenuItem input[type="checkbox"]').on('click', function () {
            var isChecked = $(this).prop('checked'); // Kiểm tra trạng thái của checkbox
            var value = $(this).val(); // Lấy giá trị của checkbox
            var dataItem = $(this).data('item');
            var danhSachLuaChon = $('.DanhSachLuaChon');
            if (isChecked == true) {
                var divButton = $('<div class="button"></div>');
                var p = $('<p data-item="' + dataItem + '" >' + value + '</p>');
                var i = $('<i class="fas fa-times"></i>');
                divButton.append(p, i);
                danhSachLuaChon.append(divButton);


                DataBoLoc = LayDuLieuDanhSachLuaChon();

                GuiDuLieuBoLoc(DataBoLoc);





            } else {


                danhSachLuaChon.find(".button p:contains('" + value + "')").closest('.button').remove();


                DataBoLoc = LayDuLieuDanhSachLuaChon();

                GuiDuLieuBoLoc(DataBoLoc);

            }

        });

        $('.DanhSachLuaChon').on('click', '.button', function () {
            // var value = $(this).find('p').text();
            // var checkbox = $('.MenuItem input[type="checkbox"][value="' + value + '"]');
            // checkbox.prop('checked', false); // Đặt trạng thái checkbox về false
            $(this).remove();

            DataBoLoc = LayDuLieuDanhSachLuaChon();
            // console.log(DataBoLoc)

            GuiDuLieuBoLoc(DataBoLoc);


        });

    }



    function ClickSize() {

        $('.Size .MenuItem .pSize').off('click');
        $('.Size .MenuItem .pSize').on('click', function () {
            // Lấy giá trị 'size' của phần tử được click
            var selectedSize = $(this).text();
            var dataItem = $(this).data('item');
            var danhSachLuaChon = $('.DanhSachLuaChon');
            var divButton = $('<div class="button"></div>');
            var p = $('<p data-item="' + dataItem + '" >' + selectedSize + '</p>');
            var i = $('<i class="fas fa-times"></i>');

            if ($(this).hasClass('activeSize')) {
                // Nếu đã có, thực hiện các thao tác khi đã có lớp 'activeSize'
                // console.log('Phần tử đã có lớp activeSize.');

                $(this).removeClass("activeSize");
                // danhSachLuaChon.find(".button p:contains('" + selectedSize + "')").closest('.button').remove();
                $('.DanhSachLuaChon .button p').filter(function () {
                    return $(this).text() === selectedSize;
                }).closest('.button').remove();

                DataBoLoc = LayDuLieuDanhSachLuaChon();
                GuiDuLieuBoLoc(DataBoLoc);

            } else {


                divButton.append(p, i);
                danhSachLuaChon.append(divButton);
                DataBoLoc = LayDuLieuDanhSachLuaChon();
                GuiDuLieuBoLoc(DataBoLoc);
                // Nếu chưa có, thêm lớp 'activeSize' vào phần tử
                // $(this).addClass('activeSize');
                // console.log('Đã thêm lớp activeSize vào phần tử.');
            }
            // $(this).addClass("activeSize");
        });


        // $('.DanhSachLuaChon').on('click', '.button', function () {

        //     var value = $(this).find('p').text();
        //     var pSize = $('.Size .MenuItem .ItemSize p[data-item = "' + value + '"]');
        //     pSize.removeClass("activeSize");

        //     $(this).remove();

        //     DataBoLoc = LayDuLieuDanhSachLuaChon();
        //     // console.log(DataBoLoc)

        //     GuiDuLieuBoLoc(DataBoLoc);


        // });

    }

    ClickSize();


    function TimKiem() {
        // Lắng nghe sự kiện khi người dùng gõ vào ô tìm kiếm
        $('#searchInput').on('keydown', function (e) {
            if (e.keyCode === 13) {
                // const searchText = $(this).val();
                // searchProducts(searchText);
                DataBoLoc = LayDuLieuDanhSachLuaChon();
                GuiDuLieuBoLoc(DataBoLoc);
            }
        });


        $(document).ready(function () {
            // Đợi tải trang hoàn thành
            const searchText = '<%= searchText %>';
            if (searchText) {
                // Kiểm tra xem có giá trị searchText hay không
                // Nếu có, thực hiện các bước bạn muốn
                DataBoLoc = LayDuLieuDanhSachLuaChon();
                GuiDuLieuBoLoc(DataBoLoc);
            }
        });





    };

    TimKiem();


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
                    alert(data.success);
                },
                error: function (error) {
                    console.error('Lỗi khi sắp xếp dữ liệu5:', error);
                }
            });
        }
        $('.main .DanhSachSanPham .AoQuan .ItemAoQuan .contentItem i').off('click');
        $(".main .DanhSachSanPham .AoQuan .ItemAoQuan .contentItem i").on('click', function () {
            var clickedIcon = $(this); // Lưu giá trị 'this' tại đây
            $.ajax({
                type: 'GET',
                url: '/check-auth',
                success: function (data) {
                    if (data.isAuthenticated) {
                        const productId = clickedIcon.closest('.ItemAoQuan').data('id');
                        guidulieu(data.user.userId, productId);
                        loadDataYeuThich();
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

                if (item.productId['loại áo']) {
                    itemElement.attr('data-loai', "loại áo");

                } else if (item.productId['loại áo']) {
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

    }



    // });

    function click_img() {
        $('.ItemAoQuan img').on('click', function () {

            var productId = $(this).closest('.ItemAoQuan').data('id');
            var loai = $(this).closest('.ItemAoQuan').data('loai');

            window.location.href = '/mua-san-pham?loai=' + loai + '&sanpham=' + productId;

        })
    }


});

$(document).ready(function () {
    var aoQuan = $(".AoQuan");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        // Add the "scrolling" class when the user scrolls beyond the .AoQuan element
        if (scroll > 150) {
            aoQuan.addClass("scrolling");
        } else {
            // Remove the "scrolling" class if the user scrolls back up
            aoQuan.removeClass("scrolling");
        }
    });
});


$(document).ready(function () {

    $(".TieuDe").click(function () {

        $(this).siblings(".MenuItem").slideToggle();

        $(this).find("i").toggleClass("fas fa-chevron-up fas fa-chevron-down");
    });


});
$(document).ready(function () {
    $(".TieuDeGia").click(function () {


        $(".MenuItemGia").slideToggle();
        $('.TieuDeGia').find("i").toggleClass("fas fa-chevron-down fas fa-chevron-up");
    });
});















