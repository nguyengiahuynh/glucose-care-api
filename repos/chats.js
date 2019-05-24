var db = require('../fn/db');
var constants = require('../constants')

exports.getChat = (NguoiGui, NguoiNhan, offset) => {
    var sql = `select * from chat where ((MaNguoiGui = '${NguoiGui.MaNguoiGui}' and LoaiNguoiGui = ${NguoiGui.LoaiNguoiGui}) and (MaNguoiNhan = '${NguoiNhan.MaNguoiNhan}' and LoaiNguoiNhan = ${NguoiNhan.LoaiNguoiNhan})) or ((MaNguoiGui = '${NguoiNhan.MaNguoiNhan}' and LoaiNguoiGui = ${NguoiNhan.LoaiNguoiNhan}) and (MaNguoiNhan = '${NguoiGui.MaNguoiGui}' and LoaiNguoiNhan = ${NguoiGui.LoaiNguoiGui})) ORDER BY NgayGioGui DESC, MaDoanChat DESC limit ${constants.CHATS_PER_PAGE} offset ${offset}`
    return db.load(sql);
}

exports.countChats = (NguoiGui, NguoiNhan) => {
    var sql = `select count(*) as total from chat where ((MaNguoiGui = '${NguoiGui.MaNguoiGui}' and LoaiNguoiGui = ${NguoiGui.LoaiNguoiGui}) and (MaNguoiNhan = '${NguoiNhan.MaNguoiNhan}' and LoaiNguoiNhan = ${NguoiNhan.LoaiNguoiNhan})) or ((MaNguoiGui = '${NguoiNhan.MaNguoiNhan}' and LoaiNguoiGui = ${NguoiNhan.LoaiNguoiNhan}) and (MaNguoiNhan = '${NguoiGui.MaNguoiGui}' and LoaiNguoiNhan = ${NguoiGui.LoaiNguoiGui}))`;
    return db.load(sql);
}

exports.addChat = (chat) => {
    var sql = `insert into chat(MaNguoiGui, LoaiNguoiGui, MaNguoiNhan, LoaiNguoiNhan, NoiDung, NgayGioGui) values('${chat.MaNguoiGui}', ${chat.LoaiNguoiGui}, '${chat.MaNguoiNhan}', ${chat.LoaiNguoiNhan}, '${chat.NoiDung}', '${chat.NgayGioGui}')`;
    return db.save(sql);
}