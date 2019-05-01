/*
 Navicat Premium Data Transfer

 Source Server         : Test
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : glucose_care

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 01/05/2019 08:17:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bac_si
-- ----------------------------
DROP TABLE IF EXISTS `bac_si`;
CREATE TABLE `bac_si`  (
  `MaBacSi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `NgaySinh` date NULL DEFAULT NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `TrinhDoChuyenMon` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBacSi`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bac_si
-- ----------------------------
INSERT INTO `bac_si` VALUES ('0941430622', '329f44354267705eeefe8321bb5bff5caabe25e34654855cce1306fca2262868', 'Mai', b'1', '2015-10-28', '12345698', 'Rạch Giá', 'huynh@gmail.com', 'Bác sĩ');
INSERT INTO `bac_si` VALUES ('1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bac_si` VALUES ('4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for benh_nhan
-- ----------------------------
DROP TABLE IF EXISTS `benh_nhan`;
CREATE TABLE `benh_nhan`  (
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBenhNhan`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of benh_nhan
-- ----------------------------
INSERT INTO `benh_nhan` VALUES ('0982860738', '3d62a7944d93e03bfeb42cb44bf9b597ef85f39435afdca2bab55dfd1595f2d6', 'Huỳnh');
INSERT INTO `benh_nhan` VALUES ('11111111', '532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25', 'null');
INSERT INTO `benh_nhan` VALUES ('123546', '3a38f42cfb8f4ad7419c4c4a5bdbbf2f447ebf05d6dce5de5daa670469dc0e56', 'undefined');
INSERT INTO `benh_nhan` VALUES ('tuyet', '1a08b6ac36bf48fcfd9f9344c0fc2d33a3a298dfcf7ac8536f671f656498a61e', 'null');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `MaDoanChat` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaNguoiGui` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `MaNguoiNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NoiDung` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgayGioGui` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaDoanChat`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (1, '0941430622', '0982861197', 'OK đã gửi được', '2019-06-30 14:35:41');
INSERT INTO `chat` VALUES (2, '0941430622', '0982861197', 'OKKK', '2019-04-09 11:48:38');
INSERT INTO `chat` VALUES (3, '0982861197', '0941430622', 'Replied', '2019-05-01 07:51:32');

-- ----------------------------
-- Table structure for ket_qua_theo_doi
-- ----------------------------
DROP TABLE IF EXISTS `ket_qua_theo_doi`;
CREATE TABLE `ket_qua_theo_doi`  (
  `MaKetQua` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `ChieuCao` int(255) NULL DEFAULT NULL,
  `CanNang` double(255, 2) NULL DEFAULT NULL,
  `HuyetAp` float(255, 1) NULL DEFAULT NULL,
  `DuongHuyet` float(255, 0) NULL DEFAULT NULL,
  `NgayLap` datetime(0) NULL DEFAULT NULL,
  `NgayHenTaiKham` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaKetQua`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ket_qua_theo_doi
-- ----------------------------
INSERT INTO `ket_qua_theo_doi` VALUES (1, '0941430622', 167, 65.50, 110.5, 100, '2019-06-28 14:35:41', '2019-06-30 14:35:41');
INSERT INTO `ket_qua_theo_doi` VALUES (2, '0982861197', 167, 15.80, 115.5, 100, '2019-06-28 14:35:41', '2019-06-30 14:35:41');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('_-RI_2V2mYy3i2jNDDiBHvpPmf0_Yz9T', 1559124595, '{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2019-05-29T10:09:54.942Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"IsDoctorLogged\":true,\"Doctor\":{\"MaBacSi\":\"0941430622\",\"Password\":\"329f44354267705eeefe8321bb5bff5caabe25e34654855cce1306fca2262868\",\"HoTen\":\"Mai\",\"GioiTinh\":{\"type\":\"Buffer\",\"data\":[1]},\"NgaySinh\":\"2015-10-27T17:00:00.000Z\",\"CMND\":\"12345698\",\"DiaChi\":\"Rạch Giá\",\"Email\":\"huynh@gmail.com\",\"TrinhDoChuyenMon\":\"Bác sĩ\"},\"IsPatientLogged\":true,\"Patient\":{\"MaBenhNhan\":\"11111111\",\"Password\":\"532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25\",\"HoTen\":null,\"GioiTinh\":null,\"NgaySinh\":null,\"CMND\":null,\"DiaChi\":null,\"Email\":null,\"NgheNghiep\":null,\"NhomMau\":null,\"DiUngThuoc\":null,\"TinhTrangBenh\":null}}');

SET FOREIGN_KEY_CHECKS = 1;
