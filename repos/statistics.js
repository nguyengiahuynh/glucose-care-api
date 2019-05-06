var db = require('../fn/db');
var constants = require('../constants')

exports.loadAllStatistics = (offset, Loai, MaBenhNhan) => {
    var sql = `select * from chi_so where (Loai = ${Loai} and MaBenhNhan = '${MaBenhNhan}') ORDER BY NgayNhap DESC limit ${constants.STATISTICS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countStatistics = (Loai, MaBenhNhan) => {
    var sql = `select count(*) as total from chi_so where (Loai = ${Loai} and MaBenhNhan = '${MaBenhNhan}')`;
    return db.load(sql);
}

exports.addStatistic = (patient) => {
    var sql = `insert into chi_so(MaBenhNhan, Loai, ChiSo, NgayNhap) values('${patient.MaBenhNhan}', '${patient.Loai}', '${patient.ChiSo}', '${patient.NgayNhap}')`;
    return db.save(sql);
}