var db = require('../fn/db');
var constants = require('../constants')

exports.loadAll = (info, offset) => {
  var sql = `select * from thong_bao where MaTaiKhoanChinh = '${info.MaTaiKhoan}' and LoaiNguoiChinh = '${info.LoaiNguoiChinh}' ORDER BY ThoiGian DESC limit ${constants.NOTIFICATIONS_PER_PAGE} offset ${offset}`;
  return db.load(sql);
};

exports.countNotifications = (info) => {
  var sql = `select count(*) as total from thong_bao where MaTaiKhoanChinh = '${info.MaTaiKhoan}' and LoaiNguoiChinh = '${info.LoaiNguoiChinh}'`
  return db.load(sql);
};

exports.countNotificationsNotSeen = (info) => {
  var sql = `select * from tinh_trang_thong_bao where MaTaiKhoan = '${info.MaTaiKhoan}' and LoaiTaiKhoan = '${info.LoaiTaiKhoan}'`
  return db.load(sql);
};

exports.createNewNotification = (info) => {
  var sql = `insert into thong_bao(MaTaiKhoanChinh, LoaiNguoiChinh, MaTaiKhoanLienQuan, LoaiNguoiLienQuan, TenNguoiLienQuan, AvatarNguoiLienQuan, LoaiThongBao, ThoiGian) values('${info.MaTaiKhoan}', '${info.LoaiNguoiChinh}', '${info.MaTaiKhoanLienQuan}', '${info.LoaiNguoiLienQuan}', '${info.TenNguoiLienQuan}', '${info.AvatarNguoiLienQuan}', '${info.LoaiThongBao}', '${info.ThoiGian}')`;
  return db.load(sql);
};

exports.increaseNotificationNotSeen = (info) => {
  var sql = `insert into tinh_trang_thong_bao(MaTaiKhoan, LoaiTaiKhoan, SoLuong) values('${info.MaTaiKhoan}', '${info.LoaiTaiKhoan}', 1) ON DUPLICATE KEY UPDATE SoLuong = SoLuong + 1`;
  return db.load(sql);
};

exports.seenNotifications = (info) => {
  var sql = `update tinh_trang_thong_bao set SoLuong = 0 where MaTaiKhoan = '${info.MaTaiKhoan}' and LoaiTaiKhoan = '${info.LoaiTaiKhoan}'`
  return db.load(sql);
};

exports.seenThisNotification = (info) => {
  var sql = `update thong_bao set DaXem = 1 where MaTaiKhoanChinh = '${info.MaTaiKhoan}'  and LoaiNguoiChinh = '${info.LoaiNguoiChinh}' and Id = ${info.Id}`
  return db.load(sql);
};