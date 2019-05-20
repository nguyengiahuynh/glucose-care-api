var db = require('../fn/db');
var constants = require('../constants')

exports.waitAccept = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `insert into theo_doi(NguoiTheoDoi, NguoiBiTheoDoi, Loai, IsRequest, IsFollow) values('${NguoiTheoDoi}', '${NguoiBiTheoDoi}', ${Loai}, 1, 0)`;
    return db.save(sql);
}

exports.updateWaitAccept = (NguoiTheoDoi, NguoiBiTheoDoi) => {
    var sql = `update theo_doi set IsRequest = 1, IsFollow = 0 where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}'`;
    return db.save(sql);
}

exports.followed = (NguoiTheoDoi, NguoiBiTheoDoi) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 1 where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}'`;
    return db.save(sql);
}

exports.unfollowed = (NguoiTheoDoi, NguoiBiTheoDoi) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 0 where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}'`;
    return db.save(sql);
}

exports.existConnection = (NguoiTheoDoi, NguoiBiTheoDoi) => {
    var sql = `select * from theo_doi where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}'`;
    return db.load(sql);
}

exports.getListDoctorsOfPatient = (MaBenhNhan) => {
    var sql = `select td.Loai, bs.MaBacSi, bs.HoTen, bs.Avatar, bs.CMND, bs.GioiTinh, bs.Email, bs.BenhVien from bac_si bs, theo_doi td where bs.MaBacSi = td.NguoiTheoDoi and IsFollow = 1 and NguoiBiTheoDoi = '${MaBenhNhan}' and bs.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListRelationsOfPatient = (MaBenhNhan) => {
    var sql = `select bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc from benh_nhan bn, theo_doi td where bn.MaBenhNhan = td.NguoiTheoDoi and IsFollow = 1 and NguoiBiTheoDoi = '${MaBenhNhan}' and bn.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListDoctorFollowing = (MaBacSi) => {
    var sql = `select bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc from benh_nhan bn, theo_doi td where bn.MaBenhNhan = td.NguoiBiTheoDoi and IsFollow = 1 and NguoiTheoDoi = '${MaBacSi}' and bn.IsDeleted = 0`;
    return db.load(sql);
}