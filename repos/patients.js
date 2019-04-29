var db = require('../fn/db');
var constants = require('../constants')

exports.loadAllPatients = (offset) => {
    var sql = `select * from benh_nhan ORDER BY MaBenhNhan ASC limit ${constants.PATIENTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countPatients = () => {
    var sql = `select count(*) as total from benh_nhan`
    return db.load(sql);
}

exports.logInPatient = (patient) => {
    var sql = `select * from benh_nhan where MaBenhNhan = '${patient.MaBenhNhan}' and Password = '${patient.Password}'`;
    return db.load(sql);
}

exports.signUpPatient = (patient) => {
    var sql = `insert into benh_nhan(MaBenhNhan, Password, HoTen, GioiTinh, NgaySinh, CMND, DiaChi, Email, NgheNghiep, NhomMau, DiUngThuoc, TinhTrangBenh) values('${patient.MaBenhNhan}', '${patient.Password}', '${patient.HoTen}', '${patient.GioiTinh}', '${patient.NgaySinh}', '${patient.CMND}', '${patient.DiaChi}', '${patient.Email}', '${patient.NgheNghiep}', '${patient.NhomMau}', '${patient.DiUngThuoc}', '${patient.TinhTrangBenh}')`;
    return db.save(sql);
}

exports.existPatient = (patient) => {
    var sql = `select * from benh_nhan where MaBenhNhan = '${patient.MaBenhNhan}'`;
    return db.load(sql);
}

exports.typeInfo = (patient) => {
    var sql = `insert into ket_qua_theo_doi(MaBenhNhan, ChieuCao, CanNang, HuyetAp, DuongHuyet, NgayLap, NgayHenTaiKham) values('${patient.MaBenhNhan}', '${patient.ChieuCao}', '${patient.CanNang}', '${patient.HuyetAp}', '${patient.DuongHuyet}', '${patient.NgayLap}', '${patient.NgayHenTaiKham}')`;
    return db.save(sql);
}

exports.findPatient = (MaBenhNhan) => {
    var sql = `select * from benh_nhan where MaBenhNhan = '${MaBenhNhan}'`
    return db.load(sql);
}