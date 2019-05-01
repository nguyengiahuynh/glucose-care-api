var db = require('../fn/db');
var constants = require('../constants')

exports.getChat = (MaNguoiGui, MaNguoiNhan, offset) => {
    var sql = `select * from chat where (MaNguoiGui = "${MaNguoiGui}" and MaNguoiNhan = "${MaNguoiNhan}") or (MaNguoiGui = "${MaNguoiNhan}" and MaNguoiNhan = "${MaNguoiGui}") ORDER BY MaDoanChat DESC limit ${constants.CHATS_PER_PAGE} offset ${offset}`
    return db.load(sql);
}

exports.countChats = (MaNguoiGui, MaNguoiNhan) => {
    var sql = `select count(*) as total from chat where (MaNguoiGui = "${MaNguoiGui}" and MaNguoiNhan = "${MaNguoiNhan}") or (MaNguoiGui = "${MaNguoiNhan}" and MaNguoiNhan = "${MaNguoiGui}")`;
    return db.load(sql);
}

exports.addChat = (chat) => {
    var sql = `insert into chat(MaNguoiGui, MaNguoiNhan, NoiDung, NgayGioGui) values('${chat.MaNguoiGui}', '${chat.MaNguoiNhan}', '${chat.NoiDung}', '${chat.NgayGioGui}')`;
    return db.save(sql);
}