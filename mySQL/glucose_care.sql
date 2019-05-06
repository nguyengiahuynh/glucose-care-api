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

 Date: 06/05/2019 16:08:34
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
  `Avatar` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `BenhVien` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NULL DEFAULT NULL,
  `Khoa` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBacSi`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bac_si
-- ----------------------------
INSERT INTO `bac_si` VALUES ('0941430622', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Nguyễn Gia Huỳnh', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for benh_nhan
-- ----------------------------
DROP TABLE IF EXISTS `benh_nhan`;
CREATE TABLE `benh_nhan`  (
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `GioiTinh` bit(1) NULL DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NgaySinh` date NULL DEFAULT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NhomMau` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `DiUngThuoc` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaBenhNhan`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of benh_nhan
-- ----------------------------
INSERT INTO `benh_nhan` VALUES ('0941430622', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Nguyễn Gia Huỳnh', NULL, NULL, b'1', NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Table structure for chi_so
-- ----------------------------
DROP TABLE IF EXISTS `chi_so`;
CREATE TABLE `chi_so`  (
  `MaKetQua` bigint(255) NOT NULL AUTO_INCREMENT,
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `Loai` tinyint(255) NULL DEFAULT NULL,
  `ChiSo` double(255, 2) NULL DEFAULT NULL,
  `NgayNhap` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`MaKetQua`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chi_so
-- ----------------------------
INSERT INTO `chi_so` VALUES (3, '0941430622', 1, 23.50, '2019-06-20 14:35:41');
INSERT INTO `chi_so` VALUES (4, '0941430622', 2, 50.00, '2019-06-20 14:40:41');
INSERT INTO `chi_so` VALUES (5, '0941430622', 3, 90.00, '2019-06-15 14:40:41');
INSERT INTO `chi_so` VALUES (6, '0941430622', 2, 180.00, '2019-06-10 14:40:41');

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
INSERT INTO `sessions` VALUES ('_-RI_2V2mYy3i2jNDDiBHvpPmf0_Yz9T', 1559725574, '{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2019-06-05T07:33:14.592Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"IsDoctorLogged\":true,\"Doctor\":{\"MaBacSi\":\"0941430622\",\"Password\":\"6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b\",\"HoTen\":\"Nguyễn Gia Huỳnh\"},\"IsPatientLogged\":true,\"Patient\":{\"MaBenhNhan\":\"0941430622\",\"Password\":\"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08\",\"HoTen\":\"Nguyễn Gia Huỳnh\"}}');

-- ----------------------------
-- Table structure for theo_doi
-- ----------------------------
DROP TABLE IF EXISTS `theo_doi`;
CREATE TABLE `theo_doi`  (
  `Id` bigint(255) NOT NULL AUTO_INCREMENT,
  `NguoiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `NguoiBiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NULL DEFAULT NULL,
  `IsRequest` tinyint(1) NULL DEFAULT NULL,
  `IsFollow` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of theo_doi
-- ----------------------------
INSERT INTO `theo_doi` VALUES (4, 'null', 'null', 1, 0);
INSERT INTO `theo_doi` VALUES (5, '0941430622', '0982860738', 1, -1);

SET FOREIGN_KEY_CHECKS = 1;
