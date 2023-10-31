const AoNam = require('../../models/AoNam');

const Data = async (req, res) => {
    try {
        const dataAo = await AoNam.find();

        let AoQuanData = [...dataAo];


        const LoaiDataForm = LocDuLieuTheoForm(AoQuanData, "loại áo");
        const LoaiDataThietKe = LocDuLieuTheoThietKe(AoQuanData, "loại áo");

        let LoaiData = [...LoaiDataForm, ...LoaiDataThietKe];

        LoaiData = LocDuLieuSanPham(LoaiData);





        // const sortOrderQuery = req.query.sortOrder;

        const sortOrderBody = req.body.sortOrder; // Lấy sortOrder từ dữ liệu POST


        LoaiData = sapxep(sortOrderBody, LoaiData);


        const LoaiDataBoLoc = filterUniqueProducts(AoQuanData, "loại áo")

        const colorsData = {};

        function addColor(item, productType, form, design) {
            if (!colorsData[productType]) {
                colorsData[productType] = {};
            }
            if (!colorsData[productType][form]) {
                colorsData[productType][form] = {};
            }
            if (!colorsData[productType][form][design]) {
                colorsData[productType][form][design] = [];
            }

            if (!colorsData[productType][form][design].includes(item["ảnh sản phẩm"])) {
                colorsData[productType][form][design].push(item["ảnh sản phẩm"]);
            }
        }

        // Lọc dữ liệu và thêm màu cho các loại áo, form, và thiết kế
        dataAo.forEach(item => {
            addColor(item, item["loại áo"], item["form"], item["thiết kế"]);
        })



        const dataBoLoc = req.body.dataBoLoc;

        // const dataBoLoc = [
        //     { 'data-item': 'giá tiền', 'text': '1.331.700 ₫ - 1.331.700 ₫' },
        // { 'data-item': 'Áo', 'text': 'Áo Nam' },

        //     //     { 'data-item': 'màu sắc', 'text': 'BLACK' }
        //     //     // { 'data-item': 'Quần', text: 'q' },
        // ];
        function locLoaiAoQuan(dataBoLoc, AoQuanData, LoaiDataBoLoc) {


            let Data = [];
            let loaiData2 = [];

            let form = [];
            let thietKe = [];
            let mauSac = [];
            let size = [];
            let chatLieu = [];

            Data = AoQuanData;

            form = filterUniqueProducts(Data, "form");
            thietKe = filterUniqueProducts(Data, "thiết kế");
            mauSac = filterUniqueProducts(Data, "màu sắc");
            size = filterUniqueProducts(Data, "size");
            chatLieu = filterUniqueProducts(Data, "chất liệu");

            Data = locDuLieu(Data, dataBoLoc);

            loaiData2 = LocDuLieuSanPham(Data);

            loaiData2 = sapxep(sortOrderBody, loaiData2)



            const Data2 = {}


            Data2["loại"] = loaiData2;
            Data2["loaiBoLoc"] = LoaiDataBoLoc;//nhom san pham bo loc
            Data2["màu"] = colorsData;
            Data2["form"] = form;
            Data2["thietKe"] = thietKe;
            Data2["mauSac"] = mauSac;
            Data2["size"] = size;
            Data2["chatLieu"] = chatLieu;

            return Data2;


        }



        if (!dataBoLoc || dataBoLoc.length === 0) {

            // Không có dữ liệu truyền vào hoặc mảng rỗng
            const form = filterUniqueProducts(AoQuanData, "form");
            const thietKe = filterUniqueProducts(AoQuanData, "thiết kế");
            const mauSac = filterUniqueProducts(AoQuanData, "màu sắc");
            const size = filterUniqueProducts(AoQuanData, "size");
            const chatLieu = filterUniqueProducts(AoQuanData, "chất liệu");

            const Data = {}

            Data["loại"] = LoaiData;
            Data["loaiBoLoc"] = LoaiDataBoLoc;
            Data["màu"] = colorsData;
            Data["form"] = form;
            Data["thietKe"] = thietKe;
            Data["mauSac"] = mauSac;
            Data["size"] = size;
            Data["chatLieu"] = chatLieu;
            res.json(Data);




        } else {



            AoQuanData = locLoaiAoQuan(dataBoLoc, AoQuanData, LoaiDataBoLoc);


            if (AoQuanData['loại'].length === 0) {
                res.json({ message: 'Không tìm thấy dữ liệu phù hợp' });
            } else {

                res.json(AoQuanData);
            }

        }



    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
    }


};


function locDuLieu(AoQuanData, dataBoLoc) {

    var groupedData = {};
    for (let i = 0; i < dataBoLoc.length; i++) {
        var dataItem = dataBoLoc[i]['data-item'];

        // Kiểm tra xem thuộc tính 'data-item' đã tồn tại trong groupedData hay chưa
        if (!groupedData[dataItem]) {
            groupedData[dataItem] = [];
        }

        groupedData[dataItem].push(dataBoLoc[i]);
    }

    Object.keys(groupedData).forEach(function (key) {

        var filteredData = [];

        if (key === 'giá tiền') {
            var priceRange = groupedData[key][0]['text'].split(' - ');
            var minPrice = parseInt(priceRange[0].replace(/\D/g, ''));
            var maxPrice = parseInt(priceRange[1].replace(/\D/g, ''));

            AoQuanData.forEach(data => {
                var itemPrice = parseInt(data['giá tiền'].replace(/\D/g, ''));
                if (itemPrice >= minPrice && itemPrice <= maxPrice) {
                    filteredData.push(data);
                }
            });

        } else {
            for (let j = 0; j < groupedData[key].length; j++) {

                const item = groupedData[key][j];


                AoQuanData.forEach(data => {
                    if (data[item['data-item']] === item['text']) {

                        filteredData.push(data);
                    }
                });



            }

        }
        AoQuanData = [...filteredData];
        filteredData.length = 0;







    });


    return AoQuanData;



}


function sapxep(sortOrderBody, LoaiData) {

    if (sortOrderBody === 'price_asc') {
        // Sắp xếp mảng LoaiData theo giá tăng dần
        LoaiData.sort((a, b) => {
            const priceA = parseInt(a['giá tiền'].replace(/\D/g, ''));
            const priceB = parseInt(b['giá tiền'].replace(/\D/g, ''));
            return priceA - priceB;
        });
    } else if (sortOrderBody === 'price_desc') {
        // Sắp xếp mảng LoaiData theo giá giảm dần
        LoaiData.sort((a, b) => {
            const priceA = parseInt(a['giá tiền'].replace(/\D/g, ''));
            const priceB = parseInt(b['giá tiền'].replace(/\D/g, ''));
            return priceB - priceA;
        });
    }

    return LoaiData;

}


//loc cac loai ao hoac quan khac nhau
function filterUniqueProducts(data, key) {
    const uniqueProducts = [];
    const uniqueKeys = new Set();

    data.forEach(item => {
        if (!uniqueKeys.has(item[key])) {
            uniqueKeys.add(item[key]);
            uniqueProducts.push(item);
        }
    });

    return uniqueProducts;
};


function LocDuLieuTheoForm(AoQuanData, key) {

    const loaiAoData = {};
    const uniqueProducts = [];
    AoQuanData.forEach(item => {
        const loaiAo = item[key];
        const form = item['form'];

        if (!loaiAoData[loaiAo]) {
            loaiAoData[loaiAo] = [];
        }

        if (!loaiAoData[loaiAo].includes(form)) {
            loaiAoData[loaiAo].push(form);
            uniqueProducts.push(item);
        }
    });


    return uniqueProducts;

}


function LocDuLieuTheoThietKe(AoQuanData, key) {

    const loaiAoData = {};
    const uniqueProducts = [];
    AoQuanData.forEach(item => {
        const loaiAo = item[key];
        const form = item['thiết kế'];

        if (!loaiAoData[loaiAo]) {
            loaiAoData[loaiAo] = [];
        }

        if (!loaiAoData[loaiAo].includes(form)) {
            loaiAoData[loaiAo].push(form);
            uniqueProducts.push(item);
        }
    });


    return uniqueProducts;

}


function LocDuLieuSanPham(DuLieu) {


    const seenItems = {}; // Để theo dõi các mục đã xuất hiện
    const duLieuDaLoc = [];

    DuLieu.forEach(item => {

        const loaiAo = item['loại áo'];
        const form = item['form'];
        const thietKe = item['thiết kế'];

        const key = loaiAo + '-' + form + '-' + thietKe;

        // Kiểm tra xem mục này đã xuất hiện trước đó chưa
        if (!seenItems[key]) {
            seenItems[key] = true;
            duLieuDaLoc.push(item); // Nếu chưa xuất hiện, thêm vào danh sách đã lọc
        }


    });

    return duLieuDaLoc;

}
module.exports = {
    Data
};
