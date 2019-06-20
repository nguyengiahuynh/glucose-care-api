-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2019 at 06:31 AM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glucose_care`
--

-- --------------------------------------------------------

--
-- Table structure for table `bac_si`
--

CREATE TABLE `bac_si` (
  `MaBacSi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Avatar` longtext,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `GioiTinh` bit(1) DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `BenhVien` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `ChuyenMon` longtext CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IsDeleted` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `benh_nhan`
--

CREATE TABLE `benh_nhan` (
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `HoTen` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `CMND` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `GioiTinh` bit(1) DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `NhomMau` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `DiUngThuoc` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `IsDeleted` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `bua_an`
--

CREATE TABLE `bua_an` (
  `Id` int(11) NOT NULL,
  `MaBenhNhan` varchar(10) DEFAULT NULL,
  `Buoi` int(11) DEFAULT NULL,
  `Ngay` date DEFAULT NULL,
  `MonAn` varchar(100) DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `MaDoanChat` bigint(255) NOT NULL,
  `MaNguoiGui` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LoaiNguoiGui` tinyint(255) DEFAULT NULL,
  `MaNguoiNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LoaiNguoiNhan` tinyint(255) DEFAULT NULL,
  `NoiDung` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `NgayGioGui` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `chi_so`
--

CREATE TABLE `chi_so` (
  `MaKetQua` bigint(255) NOT NULL,
  `MaBenhNhan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `Loai` double(255,1) DEFAULT NULL,
  `ChiSo` double(255,2) DEFAULT NULL,
  `NgayNhap` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `theo_doi`
--

CREATE TABLE `theo_doi` (
  `Id` bigint(255) NOT NULL,
  `NguoiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LoaiNguoiTheoDoi` tinyint(1) DEFAULT NULL,
  `NguoiBiTheoDoi` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LoaiNguoiBiTheoDoi` tinyint(1) DEFAULT NULL,
  `IsRequest` tinyint(1) DEFAULT NULL,
  `IsFollow` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `thong_bao`
--

CREATE TABLE `thong_bao` (
  `Id` int(11) NOT NULL,
  `MaTaiKhoanChinh` varchar(10) DEFAULT NULL,
  `LoaiNguoiChinh` int(11) DEFAULT NULL,
  `MaTaiKhoanLienQuan` varchar(10) DEFAULT NULL,
  `TenNguoiLienQuan` varchar(100) DEFAULT NULL,
  `AvatarNguoiLienQuan` text,
  `LoaiNguoiLienQuan` int(11) DEFAULT NULL,
  `LoaiThongBao` int(11) DEFAULT NULL,
  `DaXem` tinyint(4) DEFAULT '0',
  `ThoiGian` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tinh_trang_chat`
--

CREATE TABLE `tinh_trang_chat` (
  `MaTaiKhoan` varchar(10) NOT NULL,
  `LoaiTaiKhoan` int(11) NOT NULL,
  `MaTaiKhoanLienQuan` varchar(10) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `LoaiTaiKhoanLienQuan` int(11) NOT NULL,
  `DangXem` tinyint(4) DEFAULT NULL,
  `DaXem` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tinh_trang_thong_bao`
--

CREATE TABLE `tinh_trang_thong_bao` (
  `MaTaiKhoan` varchar(10) NOT NULL,
  `LoaiTaiKhoan` int(11) NOT NULL,
  `SoLuong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bac_si`
--
ALTER TABLE `bac_si`
  ADD PRIMARY KEY (`MaBacSi`) USING BTREE;

--
-- Indexes for table `benh_nhan`
--
ALTER TABLE `benh_nhan`
  ADD PRIMARY KEY (`MaBenhNhan`) USING BTREE;

--
-- Indexes for table `bua_an`
--
ALTER TABLE `bua_an`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`MaDoanChat`) USING BTREE;

--
-- Indexes for table `chi_so`
--
ALTER TABLE `chi_so`
  ADD PRIMARY KEY (`MaKetQua`) USING BTREE;

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`) USING BTREE;

--
-- Indexes for table `theo_doi`
--
ALTER TABLE `theo_doi`
  ADD PRIMARY KEY (`Id`) USING BTREE,
  ADD KEY `theo_doi_ibfk_2` (`NguoiTheoDoi`) USING BTREE,
  ADD KEY `NguoiBiTheoDoi` (`NguoiBiTheoDoi`) USING BTREE;

--
-- Indexes for table `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tinh_trang_chat`
--
ALTER TABLE `tinh_trang_chat`
  ADD PRIMARY KEY (`MaTaiKhoan`,`LoaiTaiKhoan`,`MaTaiKhoanLienQuan`,`LoaiTaiKhoanLienQuan`);

--
-- Indexes for table `tinh_trang_thong_bao`
--
ALTER TABLE `tinh_trang_thong_bao`
  ADD PRIMARY KEY (`MaTaiKhoan`,`LoaiTaiKhoan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bua_an`
--
ALTER TABLE `bua_an`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `MaDoanChat` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chi_so`
--
ALTER TABLE `chi_so`
  MODIFY `MaKetQua` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theo_doi`
--
ALTER TABLE `theo_doi`
  MODIFY `Id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thong_bao`
--
ALTER TABLE `thong_bao`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
