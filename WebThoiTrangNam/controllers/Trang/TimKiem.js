const AoNam = require('../../models/AoNam');
const QuanNam = require('../../models/QuanNam')
const unidecode = require('unidecode')

const Data = async (req, res) => {
    try {
        const dataAo = await AoNam.find();
        const dataQuan = await QuanNam.find();

        let Ao = [...dataAo];
        let Quan = [...dataQuan];

        let AoQuanData = [...dataAo, ...dataQuan];

        let AoQuanData2 = [...dataAo, ...dataQuan];

        const tuKhoaTimKiem = req.body.tuKhoa;

        if (tuKhoaTimKiem && tuKhoaTimKiem !== "") {


            AoQuanData = timKiemDuLieu(AoQuanData, tuKhoaTimKiem);

            Ao = locloai2(AoQuanData, "loại áo");
            Quan = locloai2(AoQuanData, "loại quần");


        }
        // else {
        //     AoQuanData = timKiemDuLieu(AoQuanData, "ppp");

        //     Ao = locloai2(AoQuanData, "loại áo");
        //     Quan = locloai2(AoQuanData, "loại quần");
        // }


        const LoaiDataFormAo = LocDuLieuTheoForm(Ao, "loại áo");
        const LoaiDataThietKeAo = LocDuLieuTheoThietKe(Ao, "loại áo");


        const LoaiDataFormQuan = LocDuLieuTheoForm(Quan, "loại quần");
        const LoaiDataThietKeQuan = LocDuLieuTheoThietKe(Quan, "loại quần");

        let LoaiDataAox = [...LoaiDataFormAo, ...LoaiDataThietKeAo];
        LoaiDataAox = LocDuLieuSanPhamAo(LoaiDataAox);

        let LoaiDataQuanx = [...LoaiDataFormQuan, ...LoaiDataThietKeQuan];
        LoaiDataQuanx = LocDuLieuSanPhamQuan(LoaiDataQuanx);

        // const sortOrderQuery = req.query.sortOrder;

        const sortOrderBody = req.body.sortOrder; // Lấy sortOrder từ dữ liệu POST

        let LoaiData = [...LoaiDataAox, ...LoaiDataQuanx];

        LoaiData = sapxep(sortOrderBody, LoaiData);



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

        // Lọc dữ liệu và thêm màu cho các loại quần
        dataQuan.forEach(item => {
            addColor(item, item["loại quần"], item["form"], item["thiết kế"]);
        })



        const dataBoLoc = req.body.dataBoLoc;

        // const dataBoLoc = [
        //     { 'data-item': 'giá tiền', 'text': '1.331.700 ₫ - 1.331.700 ₫' },
        // { 'data-item': 'Áo', 'text': 'Áo Nam' },

        //     //     { 'data-item': 'màu sắc', 'text': 'BLACK' }
        //     //     // { 'data-item': 'Quần', text: 'q' },
        // ];
        function locLoaiAoQuan(dataBoLoc, AoQuanData, AoQuanData2) {


            let Data = [];
            let loaiData2 = [];
            let mauSac = [];
            let size = [];

            Data = [...AoQuanData];
            mauSac = filterUniqueProducts(AoQuanData2, "màu sắc");
            size = filterUniqueProducts(AoQuanData2, "size");
            Data = locDuLieu(Data, dataBoLoc);

            const DataQuan = [];

            const DataAo = [];

            for (let i = 0; i < Data.length; i++) {
                if (Data[i]["loại quần"]) {

                    DataQuan.push(Data[i]);

                }
            }

            for (let i = 0; i < Data.length; i++) {
                if (Data[i]["loại áo"]) {

                    DataAo.push(Data[i]);

                }
            }

            const FormAo = LocDuLieuTheoForm(DataAo, "loại áo");
            const ThietKeAo = LocDuLieuTheoThietKe(DataAo, "loại áo");


            const FormQuan = LocDuLieuTheoForm(DataQuan, "loại quần");
            const ThietKeQuan = LocDuLieuTheoThietKe(DataQuan, "loại quần");

            let LDataAo = [...FormAo, ...ThietKeAo];
            LDataAo = LocDuLieuSanPhamAo(LDataAo);

            let LDataQuan = [...FormQuan, ...ThietKeQuan];
            LDataQuan = LocDuLieuSanPhamQuan(LDataQuan);



            if (LDataAo.length > 0 && LDataQuan.length === 0) {
                loaiData2 = LDataAo;
            } else if (LDataQuan.length > 0 && LDataAo.length === 0) {
                loaiData2 = LDataQuan;
            } else if (LDataAo.length > 0 && LDataQuan.length > 0) {
                loaiData2 = [...LDataAo, ...LDataQuan];
            }

            loaiData2 = sapxep(sortOrderBody, loaiData2);



            const Data2 = {}

            Data2["loại"] = loaiData2;
            Data2["màu"] = colorsData;
            Data2["mauSac"] = mauSac;
            Data2["size"] = size;


            return Data2;


        }



        if (!dataBoLoc || dataBoLoc.length === 0) {

            // Không có dữ liệu truyền vào hoặc mảng rỗng

            const mauSac = filterUniqueProducts(AoQuanData2, "màu sắc");
            const size = filterUniqueProducts(AoQuanData2, "size");

            const Data = {}

            Data["loại"] = LoaiData;

            Data["màu"] = colorsData;
            Data["size"] = size;
            Data["mauSac"] = mauSac;

            res.json(Data);




        } else {



            AoQuanData = locLoaiAoQuan(dataBoLoc, AoQuanData, AoQuanData2);


            // if (!AoQuanData['loại']) {
            //     res.json({ message: 'Không tìm thấy dữ liệu phù hợp' });
            // } else {

            res.json(AoQuanData);
            // }

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


function LocDuLieuSanPhamQuan(DuLieu) {


    const seenItems = {}; // Để theo dõi các mục đã xuất hiện
    const duLieuDaLoc = [];

    DuLieu.forEach(item => {

        const loaiAo = item["loại quần"];
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

function timKiemDuLieu(duLieu, tuKhoa) {
    tuKhoa = unidecode(tuKhoa).toLowerCase().trim();// Chuyển đổi từ khóa sang chữ thường và không dấu
    const tuKhoaTach = tuKhoa.split(" ");
    // const regExp = new RegExp(tuKhoa, 'i');
    const ketQuaTimKiem = [];

    duLieu.forEach(item => {
        const tenSanPham = unidecode(item["tên sản phẩm"]).toLowerCase();
        const form = unidecode(item["form"]).toLowerCase();
        const thietKe = unidecode(item["thiết kế"]).toLowerCase();
        const mauSac = unidecode(item["màu sắc"]).toLowerCase();
        const chatLieu = unidecode(item["chất liệu"]).toLowerCase();

        // Kiểm tra xem từ khóa xuất hiện trong bất kỳ trường nào
        if (
            tuKhoaTach.some(keyword => {// tuKhoaTach.every(keyword => {
                return (
                    tenSanPham.includes(keyword) ||
                    form.includes(keyword) ||
                    thietKe.includes(keyword) ||
                    mauSac.includes(keyword) ||
                    chatLieu.includes(keyword)
                );
            })
        ) {
            ketQuaTimKiem.push(item); // Nếu có phù hợp, thêm mục vào mảng kết quả
        }
    });

    return ketQuaTimKiem;
}
function locloai2(AoQuanData, khoa) {
    const Data = [];

    AoQuanData.forEach(item => {
        if (item[khoa]) {
            Data.push(item);
        }
    });

    return Data;

}
module.exports = {
    Data
};
