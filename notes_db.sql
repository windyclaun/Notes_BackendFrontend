-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 11:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(3, 'windy', 'cantik', '2025-03-04 06:53:15', '2025-03-04 13:27:41'),
(4, 'windy', 'windy', '2025-03-04 08:23:23', '2025-03-04 10:28:22'),
(6, 'Add your name in the body', 'INI CONTENT', '2025-03-04 10:04:06', '2025-03-04 10:04:06'),
(8, 'ini apa ya', 'ini catatan', '2025-03-04 10:30:14', '2025-03-04 10:30:14'),
(10, 'semoga', 'bisa', '2025-03-04 10:36:00', '2025-03-04 10:36:00'),
(14, 'w', 'w', '2025-03-04 10:43:36', '2025-03-04 10:43:42'),
(15, 'd', 'd', '2025-03-04 13:32:39', '2025-03-04 13:32:39'),
(16, 'uhuy', 'angjai', '2025-05-20 15:20:37', '2025-05-20 15:23:04'),
(20, 'aaa', 'aaaa', '2025-05-21 08:20:29', '2025-05-21 08:20:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@example.com', '$2b$10$lnY6eVNdN7XMmsIEKLjTwODFm/MPitw.owJBLue0FH6Yo//ndSBW2', NULL, '2025-05-20 13:55:24', '2025-05-20 13:55:24'),
(2, 'windy', 'aa@ss.com', '$2b$10$y0FYYQv4x99h5X0lK9kyCuN4M4Kqo3TxIxPheM7j3ThPOXs2Sgb96', NULL, '2025-05-20 13:56:07', '2025-05-21 09:01:57'),
(3, 'abc', 'abc.com', '$2b$10$b5CilP5PpIYRVqnjPozM.ujUCLXuCPrkJlBsFs4qoYX6AjTermKj6', NULL, '2025-05-20 14:16:00', '2025-05-20 14:16:00'),
(4, 'a', 'aaaaaaaaaaa@aa', '$2b$10$nk/c0GhsYRm1RisnFKp1Ve0tvhxLe7tu29.MEGU5dXMnnYMr5x0/u', NULL, '2025-05-20 14:22:44', '2025-05-20 14:22:44'),
(5, 'b', 'b@b', '$2b$10$LmlsBcXzJimb6Qmm.I.R1erckHiAbohaK61FjkSt/UJNZ7TjqrgD6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJiIiwiZW1haWwiOiJiQGIiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA1LTIwVDE0OjIzOjI1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA1LTIwVDE0OjIzOjI1LjAwMFoiLCJpYXQiOjE3NDc3NTEwNDgsImV4cCI6MTc0ODM1NTg0OH0.b9QmCQuz0a-aj_cmdkjBhr857Kg279GDCT7TXMiFFNU', '2025-05-20 14:23:25', '2025-05-20 14:24:08'),
(6, 'c', 'c@c', '$2b$10$Enac0jpPMXDX.AxM6ODkjegBqcOhK/V0czRQWsjHXCW/1TvB2TSv6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJjIiwiZW1haWwiOiJjQGMiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA1LTIwVDE0OjMzOjE1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA1LTIwVDE0OjMzOjE1LjAwMFoiLCJpYXQiOjE3NDc3NTE2NDUsImV4cCI6MTc0ODM1NjQ0NX0.-QHWbEHEVdGdNHvicWUkpa-sEs6ZymQmNAu3v6vhHAg', '2025-05-20 14:33:15', '2025-05-20 14:34:05'),
(7, 'krisna', 'krisna@jelek', '$2b$10$UFtHBIMD.Idwb8m5Z3ARgOSRW6PdDbYxyFVOD0QC8Gin0SVptdd2i', NULL, '2025-05-21 03:32:55', '2025-05-21 03:34:55'),
(8, 'kris', 'aa.com', '$2b$10$kD2YQjlRXSAWvY.U6yArV.hUbE1uO1j61yuTn13Bs0Ppdm/fvlABq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJrcmlzIiwiZW1haWwiOiJhYS5jb20iLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2T0N3aWRYTmxjbTVoYldVaU9pSnJjbWx6SWl3aVpXMWhhV3dpT2lKaFlTNWpiMjBpTENKeVpXWnlaWE5vWDNSdmEyVnVJanB1ZFd4c0xDSmpjbVZoZEdWa1FYUWlPaUl5TURJMUxUQTFMVEl4VkRBME9qRXpPak0zTGpBd01Gb2lMQ0oxY0dSaGRHVmtRWFFpT2lJeU1ESTFMVEExTFRJeFZEQTBPakV6T2pNM0xqQXdNRm9pTENKcFlYUWlPakUzTkRjNE1EQTRNamdzSW1WNGNDSTZNVGMwT0RRd05UWXlPSDAuQm5uN2RhRXZ5T19fbXJucDM0dFlzRG1ETkRUeDlVY3dzUW9QQjZQNUN2cyIsImNyZWF0ZWRBdCI6IjIwMjUtMDUtMjFUMDQ6MTM6MzcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDUtMjFUMDQ6MTM6NDguMDAwWiIsImlhdCI6MTc0NzgwMTMzNSwiZXhwIjoxNzQ4NDA2MTM1fQ.4akAEzW6m6Ee5KByuVLsMjuVdIfDlwsEYCmyLXjPRUk', '2025-05-21 04:13:37', '2025-05-21 04:22:15'),
(9, 'krisssss', 'aa', '$2b$10$qBbnF4h7utBs1wRl.Fr1v.3aS2IGC6yy8gWqQF35brAdOmJYOXCWq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJrcmlzc3NzcyIsImVtYWlsIjoiYWEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA1LTIxVDA0OjQ2OjU2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA1LTIxVDA0OjQ2OjU2LjAwMFoiLCJpYXQiOjE3NDc4MDU3MzAsImV4cCI6MTc0ODQxMDUzMH0.3_J-ByO4Wr_z7ZHCtpv6Zvs1i5OwomkvKOmlzCnI6Zg', '2025-05-21 04:46:56', '2025-05-21 05:35:30'),
(10, 'himatifup', 'himatifupnyk10@gmail.com', '$2b$10$e/JhNGNWLUlPbj8ZybnYI.KWr5pk93LPGOC5jthC.8N3x96.yRgq.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoiaGltYXRpZnVwIiwiZW1haWwiOiJoaW1hdGlmdXBueWsxMEBnbWFpbC5jb20iLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA1LTIxVDA5OjA1OjI2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA1LTIxVDA5OjA1OjI2LjAwMFoiLCJpYXQiOjE3NDc4MTgzNDMsImV4cCI6MTc0ODQyMzE0M30.SzWoYPfhI0br84gVir-i8kEdIii66xcphfKJg5Rx3oI', '2025-05-21 09:05:26', '2025-05-21 09:05:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
