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
    var sql = `insert into bac_si(MaBacSi, Password, HoTen, GioiTinh, NgaySinh, CMND, DiaChi, Email, TrinhDoChuyenMon) values('${doctor.MaBacSi}', '${doctor.Password}', '${doctor.HoTen}', '${doctor.GioiTinh}', '${doctor.NgaySinh}', '${doctor.CMND}', '${doctor.DiaChi}', '${doctor.Email}', '${doctor.TrinhDoChuyenMon}')`;
    return db.save(sql);
}

exports.existDoctor = (doctor) => {
    var sql = `select * from bac_si where MaBacSi = '${doctor.MaBacSi}'`;
    return db.load(sql);
}

exports.findDoctorById = (MaBacSi) => {
    var sql = `select * from bac_si where MaBacSi like '%${MaBacSi}%'`
    return db.load(sql);
}

exports.findDoctorByName = (HoTen) => {
    var sql = `select * from bac_si where HoTen like '%${HoTen}%'`
    return db.load(sql);
}

exports.changePassword = (doctor) => {
    var sql = `update bac_si set Password = '${doctor.Password}' where MaBacSi = '${doctor.MaBacSi}'`
    return db.save(sql)
}