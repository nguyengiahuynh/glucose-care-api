var db = require('../fn/db');
var constants = require('../constants')

exports.loadAllDoctors = (offset) => {
    var sql = `select * from bac_si ORDER BY MaBacSi ASC limit ${constants.DOCTORS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countDoctors = () => {
    var sql = `select count(*) as total from bac_si`;
    return db.load(sql);
}

exports.logInDoctor = (doctor) => {
    var sql = `select * from bac_si where MaBacSi = '${doctor.MaBacSi}' and Password = '${doctor.Password}'`;
    return db.load(sql);
}

exports.signUpDoctor = (doctor) => {
    console.log(doctor);
    var sql = `insert into bac_si(MaBacSi, Password, HoTen) values('${doctor.MaBacSi}', '${doctor.Password}', '${doctor.HoTen}')`;
    return db.save(sql);
}

exports.existDoctor = (doctor) => {
    var sql = `select * from bac_si where MaBacSi = '${doctor.MaBacSi}'`;
    return db.load(sql);
}

exports.findDoctorById = (MaBacSi) => {
    var sql = `select * from bac_si where MaBacSi like '%${MaBacSi}%'`;
    return db.load(sql);
}

exports.findDoctorByName = (HoTen) => {
    var sql = `select * from bac_si where HoTen like '%${HoTen}%'`;
    return db.load(sql);
}

exports.changePassword = (doctor) => {
    var sql = `update bac_si set Password = '${doctor.Password}' where MaBacSi = '${doctor.MaBacSi}'`
    return db.save(sql);
}

exports.updateProfile = (doctor) => {
    var sql = `update bac_si set HoTen = ${doctor.HoTen ? `'${doctor.HoTen}'` : null}, Avatar = ${doctor.Avatar ? `'${doctor.Avatar}'` : null}, CMND = ${doctor.CMND ? `'${doctor.CMND}'` : null}, GioiTinh = ${doctor.GioiTinh ? `${doctor.GioiTinh}` : null}, Email = ${doctor.Email ? `'${doctor.Email}'` : null}, BenhVien = ${doctor.BenhVien ? `'${doctor.BenhVien}'` : null}, Khoa = ${doctor.Khoa ? `'${doctor.Khoa}'` : null} where MaBenhNhan = '${doctor.MaBacSi}'`
    return db.save(sql);
}