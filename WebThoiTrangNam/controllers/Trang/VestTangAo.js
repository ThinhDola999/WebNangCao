const AoNam = require('../../models/AoNam');


const Data = async (req, res) => {
    try {
        const dataAo = await AoNam.find();

        let AoQuanData = [...dataAo];

        let LoaiDataVest = LocDuLieuSanPhamVest(AoQuanData);

        // const sortOrderQuery = req.query.sortOrder;

        const sortOrderBody = req.body.sortOrder; // Lấy sortOrder từ dữ liệu POST


        LoaiDataVest = sapxep(sortOrderBody, LoaiDataVest);



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
        LoaiDataVest.forEach(item => {
            addColor(item, item["loại áo"], item["form"], item["thiết kế"]);
        })

        // Lọc dữ liệu và thêm màu cho các loại quần


        const dataBoLoc = req.body.dataBoLoc;

        // const dataBoLoc = [
        //     { 'data-item': 'giá tiền', 'text': '1.331.700 ₫ - 1.331.700 ₫' },
        // { 'data-item': 'Áo', 'text': 'Áo Nam' },

        //     //     { 'data-item': 'màu sắc', 'text': 'BLACK' }
        //     //     // { 'data-item': 'Quần', text: 'q' },
        // ];
        function locLoaiAoQuan(dataBoLoc, LoaiDataVest) {


            let Data = [];
            let DataVest = [];
            let form = [];
            let thietKe = [];
            let mauSac = [];
            let size = [];


            Data = [...LoaiDataVest];

            form = filterUniqueProducts(Data, "form");
            thietKe = filterUniqueProducts(Data, "thiết kế");
            mauSac = filterUniqueProducts(Data, "màu sắc");
            size = filterUniqueProducts(Data, "size");


            Data = locDuLieu(Data, dataBoLoc);

            DataVest = LocDuLieuSanPhamAo(Data);


            DataVest = sapxep(sortOrderBody, DataVest);


            const Data2 = {}


            Data2["loại"] = DataVest;
            Data2["màu"] = colorsData;
            Data2["form"] = form;
            Data2["thietKe"] = thietKe;
            Data2["mauSac"] = mauSac;
            Data2["size"] = size;

            return Data2;


        }



        if (!dataBoLoc || dataBoLoc.length === 0) {

            // Không có dữ liệu truyền vào hoặc mảng rỗng
            const form = filterUniqueProducts(LoaiDataVest, "form");
            const thietKe = filterUniqueProducts(LoaiDataVest, "thiết kế");
            const mauSac = filterUniqueProducts(LoaiDataVest, "màu sắc");
            const size = filterUniqueProducts(LoaiDataVest, "size");


            const Data = {}

            Data["loại"] = LoaiDataVest;

            Data["màu"] = colorsData;
            Data["form"] = form;
            Data["thietKe"] = thietKe;
            Data["mauSac"] = mauSac;
            Data["size"] = size;

            res.json(Data);




        } else {



            LoaiDataVest = locLoaiAoQuan(dataBoLoc, LoaiDataVest);


            if (LoaiDataVest['loại'].length === 0) {
                res.json({ message: 'Không tìm thấy dữ liệu phù hợp' });
            } else {

                res.json(LoaiDataVest);
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



                if (item['data-item'] === "Áo" || item['data-item'] === "Quần") {

                    filteredData = AoQuanData;
                    continue;
                }

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




function LocDuLieuSanPhamAo(DuLieu) {


    const seenItems = {}; // Để theo dõi các mục đã xuất hiện
    const duLieuDaLoc = [];

    DuLieu.forEach(item => {

        const loaiAo = item["loại áo"];
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

function LocDuLieuSanPhamVest(DuLieu) {


    const duLieuDaLoc = [];

    DuLieu.forEach(item => {

        if (item["loại áo"] === "Áo Vest") {

            duLieuDaLoc.push(item);
        }


    });

    return duLieuDaLoc;

}








module.exports = {
    Data
};
