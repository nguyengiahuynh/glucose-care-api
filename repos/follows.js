var db = require('../fn/db');
var constants = require('../constants')

exports.waitAccept = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `insert into theo_doi(NguoiTheoDoi, NguoiBiTheoDoi, Loai, IsRequest, IsFollow) values('${NguoiTheoDoi}', '${NguoiBiTheoDoi}', ${Loai}, 1, 0)`;
    return db.save(sql);
}

exports.updateWaitAccept = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `update theo_doi set IsRequest = 1, IsFollow = 0 where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}' and Loai = '${Loai}'`;
    return db.save(sql);
}

exports.followed = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 1 where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}' and Loai = '${Loai}'`;
    return db.save(sql);
}

exports.unfollowed = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 0 where ((NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}') or (NguoiTheoDoi = '${NguoiBiTheoDoi}' and NguoiBiTheoDoi = '${NguoiTheoDoi}')) and Loai = '${Loai}'`;
    return db.save(sql);
}

exports.existConnection = (NguoiTheoDoi, NguoiBiTheoDoi, Loai) => {
    var sql = `select * from theo_doi where NguoiTheoDoi = '${NguoiTheoDoi}' and NguoiBiTheoDoi = '${NguoiBiTheoDoi}' and Loai = '${Loai}'`;
    return db.load(sql);
}

exports.getListDoctorsOfPatient = (MaBenhNhan) => {
    var sql = `select DISTINCT td.Loai, bs.MaBacSi, bs.HoTen, bs.Avatar, bs.CMND, bs.GioiTinh, bs.Email, bs.BenhVien from bac_si bs, theo_doi td where bs.MaBacSi = td.NguoiTheoDoi and IsFollow = 1 and NguoiBiTheoDoi = '${MaBenhNhan}' and bs.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListRelationsOfPatient = (MaBenhNhan) => {
    var sql = `select DISTINCT bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc from benh_nhan bn, theo_doi td where 
	((bn.MaBenhNhan = td.NguoiTheoDoi and NguoiBiTheoDoi = '${MaBenhNhan}') or (bn.MaBenhNhan = td.NguoiBiTheoDoi and NguoiTheoDoi = '${MaBenhNhan}'))
	and IsFollow = 1 and bn.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListPatientFollowed = (MaBenhNhan) => {
    var sql = `select bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc from benh_nhan bn, theo_doi td where bn.MaBenhNhan = td.NguoiBiTheoDoi and IsFollow = 1 and NguoiTheoDoi = '${MaBenhNhan}' and bn.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListDoctorFollowing = (MaBacSi) => {
    var sql = `select bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc from benh_nhan bn, theo_doi td where bn.MaBenhNhan = td.NguoiBiTheoDoi and IsFollow = 1 and NguoiTheoDoi = '${MaBacSi}' and bn.IsDeleted = 0`;
    return db.load(sql);
}

exports.getInforPatientFollowingByDoctor = (MaBenhNhan) => {
    var sql = `select bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.DiaChi, bn.NgaySinh, kq.ChieuCao, kq.CanNang, kq.HuyetAp, kq.DuongHuyet from benh_nhan bn, ket_qua_theo_doi kq where bn.MaBenhNhan = ${MaBenhNhan} and kq.MaBenhNhan=${MaBenhNhan}`;
    return db.load(sql);
}

exports.check_isFollowOfPatient = (MaBenhNhan1, MaBenhNhan2) => {
    var sql = `select * from theo_doi where ((NguoiTheoDoi='${MaBenhNhan1}' and NguoiBiTheoDoi='${MaBenhNhan2}')
    or (NguoiTheoDoi='${MaBenhNhan2}' and NguoiBiTheoDoi='${MaBenhNhan1}')) and IsFollow=1 and Loai=1`;
    return db.load(sql);
}

exports.check_isRequestOfPatient = (MaBenhNhan1, MaBenhNhan2) => {
    var sql = `select * from theo_doi where ((NguoiTheoDoi='${MaBenhNhan1}' and NguoiBiTheoDoi='${MaBenhNhan2}')
    or (NguoiTheoDoi='${MaBenhNhan2}' and NguoiBiTheoDoi='${MaBenhNhan1}')) and IsRequest=1 and Loai=1`;
    return db.load(sql);
}

exports.isFollow_PatientDoctor = (MaBenhNhan, MaBacSi) => {
    var sql = `select * from theo_doi where NguoiTheoDoi='${MaBacSi}' and NguoiBiTheoDoi='${MaBenhNhan}' and IsFollow=1 and Loai>1`;
    return db.load(sql);
}

exports.isRequestFromDoctor = (MaBenhNhan, MaBacSi) => {
    var sql = `select * from theo_doi where NguoiTheoDoi='${MaBacSi}' and NguoiBiTheoDoi='${MaBenhNhan}' and IsRequest=1 and Loai>1`;
    return db.load(sql);
}