var db = require('../fn/db');
var constants = require('../constants')

exports.waitAccept = (data) => {
    var sql = `insert into theo_doi(NguoiTheoDoi, NguoiBiTheoDoi, LoaiNguoiTheoDoi, LoaiNguoiBiTheoDoi, IsRequest, IsFollow) values('${data.NguoiTheoDoi}', '${data.NguoiBiTheoDoi}', ${data.LoaiNguoiTheoDoi}, ${data.LoaiNguoiBiTheoDoi}, 1, 0)`;
    return db.save(sql);
}

exports.updateWaitAccept = (data) => {
    var sql = `update theo_doi set IsRequest = 1, IsFollow = 0 
    where NguoiTheoDoi = '${data.NguoiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiBiTheoDoi}' 
        and LoaiNguoiTheoDoi = '${data.LoaiNguoiTheoDoi}' and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiBiTheoDoi}'`;
    return db.save(sql);
}

exports.followed = (data) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 1 
    where ((NguoiTheoDoi = '${data.NguoiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiBiTheoDoi}' 
        and LoaiNguoiTheoDoi = '${data.LoaiNguoiTheoDoi}' and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiBiTheoDoi}')
        or (NguoiTheoDoi = '${data.NguoiBiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiTheoDoi}' 
        and LoaiNguoiTheoDoi = '${data.LoaiNguoiBiTheoDoi}' and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiTheoDoi}'))`;
    return db.save(sql);
}

exports.unfollowed = (data) => {
    var sql = `update theo_doi set IsRequest = 0, IsFollow = 0 
    where ((NguoiTheoDoi = '${data.NguoiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiBiTheoDoi}' and LoaiNguoiTheoDoi = '${data.LoaiNguoiTheoDoi}'and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiBiTheoDoi}') 
        or (NguoiTheoDoi = '${data.NguoiBiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiTheoDoi}' and LoaiNguoiTheoDoi = '${data.LoaiNguoiBiTheoDoi}'and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiTheoDoi}')) `;
    return db.save(sql);
}

exports.existConnection = (data) => {
    var sql = `select * from theo_doi 
    where NguoiTheoDoi = '${data.NguoiTheoDoi}' and NguoiBiTheoDoi = '${data.NguoiBiTheoDoi}' 
        and LoaiNguoiTheoDoi = '${data.LoaiNguoiTheoDoi}' and LoaiNguoiBiTheoDoi = '${data.LoaiNguoiBiTheoDoi}'`;
    return db.load(sql);
}

exports.getListDoctorsOfPatient = (MaBenhNhan) => {
    var sql = `select DISTINCT bs.MaBacSi, bs.HoTen, bs.Avatar, bs.CMND, bs.GioiTinh, bs.Email, bs.BenhVien, ttc.DaXem  
    from bac_si bs, theo_doi td, tinh_trang_chat ttc 
    where ((bs.MaBacSi = td.NguoiTheoDoi and NguoiBiTheoDoi = '${MaBenhNhan}' and LoaiNguoiTheoDoi = 2 and LoaiNguoiBiTheoDoi = 1) 
        or (bs.MaBacSi = td.NguoiBiTheoDoi and NguoiTheoDoi = '${MaBenhNhan}' and LoaiNguoiTheoDoi = 1 and LoaiNguoiBiTheoDoi = 2))
        and ttc.MaTaiKhoan='${MaBenhNhan}' and ttc.LoaiTaiKhoan=1 and ttc.MaTaiKhoanLienQuan=bs.MaBacSi and ttc.LoaiTaiKhoanLienQuan=2
        and IsFollow = 1 and bs.IsDeleted = 0`;
    return db.load(sql);
}

exports.getListRelationsOfPatient = (MaBenhNhan) => {
    var sql = `select DISTINCT bn.MaBenhNhan, bn.HoTen, bn.Avatar, bn.CMND, bn.GioiTinh, bn.DiaChi, bn.Email, bn.NgaySinh, bn.NgheNghiep, bn.NhomMau, bn.DiUngThuoc, ttc.DaXem 
    from benh_nhan bn, theo_doi td, tinh_trang_chat ttc 
    where ((bn.MaBenhNhan = td.NguoiTheoDoi and NguoiBiTheoDoi = '${MaBenhNhan}') 
        or (bn.MaBenhNhan = td.NguoiBiTheoDoi and NguoiTheoDoi = '${MaBenhNhan}'))
        and ttc.MaTaiKhoan='${MaBenhNhan}' and ttc.LoaiTaiKhoan=1 and ttc.MaTaiKhoanLienQuan=bn.MaBenhNhan and ttc.LoaiTaiKhoanLienQuan=1
	    and LoaiNguoiTheoDoi = 1 and LoaiNguoiBiTheoDoi = 1 and IsFollow = 1 and bn.IsDeleted = 0`;
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
    or (NguoiTheoDoi='${MaBenhNhan2}' and NguoiBiTheoDoi='${MaBenhNhan1}')) and IsFollow=1 and LoaiNguoiTheoDoi=1 and LoaiNguoiBiTheoDoi=1`;
    return db.load(sql);
}

exports.check_isRequestOfPatient = (MaBenhNhan1, MaBenhNhan2) => {
    var sql = `select * from theo_doi where ((NguoiTheoDoi='${MaBenhNhan1}' and NguoiBiTheoDoi='${MaBenhNhan2}')
    or (NguoiTheoDoi='${MaBenhNhan2}' and NguoiBiTheoDoi='${MaBenhNhan1}')) and IsRequest=1 and LoaiNguoiTheoDoi=1 and LoaiNguoiBiTheoDoi=1`;
    return db.load(sql);
}

exports.isFollow_PatientDoctor = (MaBenhNhan, MaBacSi) => {
    var sql = `select * from theo_doi where ((NguoiTheoDoi='${MaBenhNhan}' and NguoiBiTheoDoi='${MaBacSi}' and LoaiNguoiTheoDoi=1 and LoaiNguoiBiTheoDoi=2)
    or (NguoiTheoDoi='${MaBacSi}' and NguoiBiTheoDoi='${MaBenhNhan}' and LoaiNguoiTheoDoi=2 and LoaiNguoiBiTheoDoi=1)) and IsFollow=1`;
    return db.load(sql);
}

exports.isRequest_PatientDoctor = (MaBenhNhan, MaBacSi) => {
    var sql = `select * from theo_doi where ((NguoiTheoDoi='${MaBenhNhan}' and NguoiBiTheoDoi='${MaBacSi}' and LoaiNguoiTheoDoi=1 and LoaiNguoiBiTheoDoi=2)
    or (NguoiTheoDoi='${MaBacSi}' and NguoiBiTheoDoi='${MaBenhNhan}' and LoaiNguoiTheoDoi=2 and LoaiNguoiBiTheoDoi=1)) and IsRequest=1`;
    return db.load(sql);
}