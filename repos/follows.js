var db = require('../fn/db');
var constants = require('../constants')

exports.waitAccept = (NguoiTheoDoi, NguoiBiTheoDoi) => {
    var sql = `insert into theo_doi(NguoiTheoDoi, NguoiBiTheoDoi, IsRequest, IsFollow) values('${NguoiTheoDoi}', '${NguoiBiTheoDoi}', 1, 0)`;
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

exports.getListPatientFollower = (NguoiBiTheoDoi) => {
    var sql = `select bs.MaBacSi, bs.HoTen, bs.Avatar, bs.CMND, bs.GioiTinh, bs.Email, bs.BenhVien, bs.Khoa from bac_si bs, theo_doi td where bs.MaBacSi = td.NguoiTheoDoi and IsFollow = 1 and NguoiBiTheoDoi = '${NguoiBiTheoDoi}' and bs.IsDeleted = 0`;
    return db.load(sql);
}