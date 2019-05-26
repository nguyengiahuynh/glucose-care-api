var db = require('../fn/db');
var constants = require('../constants')

exports.create = (info) => {
    var sql = `insert into tinh_trang_chat(MaTaiKhoan, LoaiTaiKhoan, MaTaiKhoanLienQuan, LoaiTaiKhoanLienQuan, DangXem, DaXem) values('${info.MaTaiKhoan}', ${info.LoaiTaiKhoan}, '${info.MaTaiKhoanLienQuan}', ${info.LoaiTaiKhoanLienQuan}, 0, 0)`
    return db.load(sql);
}

exports.updateSeeingSeen = (info) => {
    var sql = `update tinh_trang_chat set DangXem=1, DaXem=1 where MaTaiKhoan='${info.MaTaiKhoan}' and LoaiTaiKhoan='${info.LoaiTaiKhoan}' and MaTaiKhoanLienQuan='${info.MaTaiKhoanLienQuan}' and LoaiTaiKhoanLienQuan='${info.LoaiTaiKhoanLienQuan}'`;
    return db.load(sql);
}

exports.updateSeeing = (info) => {
    var sql = `update tinh_trang_chat set DangXem=0 where MaTaiKhoan='${info.MaTaiKhoan}' and LoaiTaiKhoan='${info.LoaiTaiKhoan}' and MaTaiKhoanLienQuan='${info.MaTaiKhoanLienQuan}' and LoaiTaiKhoanLienQuan='${info.LoaiTaiKhoanLienQuan}'`;
    return db.load(sql);
}

exports.updateSeen = (info) => {
    var sql = `update tinh_trang_chat set DaXem=DangXem where MaTaiKhoan='${info.MaTaiKhoan}' and LoaiTaiKhoan='${info.LoaiTaiKhoan}' and MaTaiKhoanLienQuan='${info.MaTaiKhoanLienQuan}' and LoaiTaiKhoanLienQuan='${info.LoaiTaiKhoanLienQuan}'`;
    return db.load(sql);
}