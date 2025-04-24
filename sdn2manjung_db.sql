-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2025 at 02:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdn2manjung_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_berita`
--

CREATE TABLE `data_berita` (
  `id` int(11) NOT NULL,
  `kategori` enum('berita','prestasi') NOT NULL,
  `title` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_berita`
--

INSERT INTO `data_berita` (`id`, `kategori`, `title`, `deskripsi`, `img`, `createdAt`, `updatedAt`) VALUES
(4, 'berita', 'KARAWITAN', 'Karawitan adalah warisan budaya yang harus dilestarikan.', 'uploads/1744794968961-390443071-20241017_085416.jpg', '2025-04-16 09:16:09', '2025-04-16 09:16:09'),
(5, 'berita', 'PRAMUKA', 'Sekolah menggelar ekstrakurikuler Pramuka.', 'uploads/1744795068991-738945099-IMG-20230814-WA0014.jpg', '2025-04-16 09:17:48', '2025-04-16 09:17:48'),
(6, 'berita', 'SHOLAT BERJAMAAH', 'Siswa menunaikan ibadah Sholat luhur', 'uploads/1744795144914-753625407-IMG-20230414-WA0017.jpg', '2025-04-16 09:19:04', '2025-04-16 09:19:04'),
(7, 'berita', 'UJIAN AKHIR SEMESTER', 'Hari ini siswa siswi SD Negeri 2 Manjung Wonogiri sedang menjalani UAS.', 'uploads/1744795272428-564028970-20241029_073117.jpg', '2025-04-16 09:21:12', '2025-04-16 09:21:12'),
(9, 'berita', 'KEGIATAN KEBERSIHAN ', 'Sekolah mengadakan kegiatan gotong royong membersihkan lingkungan.', 'uploads/1744795620038-955835445-WhatsApp Image 2023-10-13 at 07.58.04.jpeg', '2025-04-16 09:27:00', '2025-04-16 09:27:00'),
(10, 'berita', 'HUT RI', 'Guru dan Siswa melaksanakan upacara dalam rangka HUT RI.', 'uploads/1744795809314-144310845-WhatsApp Image 2025-04-16 at 16.28.35.jpeg', '2025-04-16 09:30:09', '2025-04-16 09:30:09'),
(12, 'berita', 'FOTO SISWA MENDAPATKAN PIALA KEJUARAAN', 'Dokumentasi Foto siswa meraih kejuaraan dalam berbagai lomba tingkat Sekolah Dasar se kabupaten wonogiri', 'uploads/1744796001379-447534510-WhatsApp Image 2025-04-16 at 16.28.35 (1).jpeg', '2025-04-16 09:33:21', '2025-04-16 09:33:21'),
(13, 'prestasi', 'JUARA 1 TILAWAH AL-QUR\'AN', 'Salah satu siswa memenangkan juara 1 lomba Tilawah AL-QUR\'AN ', 'uploads/1744796209560-554777649-WhatsApp Image 2025-04-16 at 16.28.33.jpeg', '2025-04-16 09:36:49', '2025-04-16 09:36:49'),
(14, 'prestasi', 'JUARA 1 MAPSI REBANA', 'Tim siswa siswi SD Negeri 2 Manjung Wonogiri dalam lomba rebana dan meraih juara 1.', 'uploads/1744796318227-768748667-WhatsApp Image 2025-04-16 at 16.28.33 (1).jpeg', '2025-04-16 09:38:38', '2025-04-16 09:38:38'),
(15, 'prestasi', 'JUARA 1 FTBI', 'Dalam ajang festival lomba Tunas Bahasa Indonesia (FTBI) meraih juara 1.', 'uploads/1744796428431-534249754-WhatsApp Image 2025-04-16 at 16.28.31.jpeg', '2025-04-16 09:40:28', '2025-04-16 09:40:28'),
(16, 'prestasi', 'FOTO BERSAMA PENYERAHAN PIALA KEJUARAAN', 'Dalam ajang semua kategori perlombaan.', 'uploads/1744796494663-254069454-WhatsApp Image 2025-04-16 at 16.28.35 (1).jpeg', '2025-04-16 09:41:34', '2025-04-16 09:41:34'),
(17, 'prestasi', 'FOTO PIALA KEJUARAAN SD NEGERI 2 MANJUNG WONOGIRI', 'Piala kejuaraan dari berbagai lomba.', 'uploads/1744796548813-993771817-WhatsApp Image 2025-04-16 at 16.28.36.jpeg', '2025-04-16 09:42:28', '2025-04-16 09:42:28'),
(18, 'prestasi', 'JUARA 3 LOMBA VOLI', 'Dalam acara turnamen voli di SD Negeri 2 Manjung Wonogiri.', 'uploads/1744796649286-916040222-20240516_141812.jpg', '2025-04-16 09:44:09', '2025-04-16 09:44:09');

-- --------------------------------------------------------

--
-- Table structure for table `data_gambar`
--

CREATE TABLE `data_gambar` (
  `id` int(11) NOT NULL,
  `kategori` enum('gallery','fasilitas') NOT NULL,
  `title` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_gambar`
--

INSERT INTO `data_gambar` (`id`, `kategori`, `title`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'fasilitas', 'Perpustakaan', 'uploads/1744184588173-403424318-perpus.jpg', '2025-04-09 07:43:08', '2025-04-09 07:43:08'),
(2, 'fasilitas', 'Lapangan Upacara', 'uploads/1744184635453-644304320-Lapangan Upacara.jpg', '2025-04-09 07:43:55', '2025-04-09 07:43:55'),
(3, 'fasilitas', 'Ruang Kelas', 'uploads/1744184686321-729155358-RuangKelas.jpg', '2025-04-09 07:44:46', '2025-04-09 07:44:46'),
(4, 'fasilitas', 'Taman', 'uploads/1744184733718-912681695-Taman Sekoolah.jpg', '2025-04-09 07:45:33', '2025-04-09 07:45:33'),
(5, 'fasilitas', 'Masjid', 'uploads/1744184843785-834432784-masjid.jpg', '2025-04-09 07:47:23', '2025-04-09 07:47:23'),
(6, 'fasilitas', 'Ruang Guru', 'uploads/1744184890928-591366252-Ruang Guru.jpg', '2025-04-09 07:48:10', '2025-04-09 07:48:10'),
(9, 'gallery', 'Siswa Berprestasi', 'uploads/1744185061225-848286885-Gambar WhatsApp 2025-04-08 pukul 18.43.59_590f3c11.jpg', '2025-04-09 07:51:01', '2025-04-09 07:51:01'),
(10, 'gallery', 'FOTO PIALA KEJUARAAN SD NEGERI 2 MANJUNG WONOGIRI', 'uploads/1744796729921-67941787-WhatsApp Image 2025-04-16 at 16.28.32.jpeg', '2025-04-16 09:45:29', '2025-04-16 09:45:29'),
(11, 'gallery', 'FOTO GURU SD NEGERI 2 MANJUNG WONOGIRI', 'uploads/1744796768500-359440286-20240517_100835.jpg', '2025-04-16 09:46:08', '2025-04-16 09:46:08'),
(12, 'gallery', 'FOTO KEGIATAN SENAM SEHAT HARI JUMAT.', 'uploads/1744796795301-950654476-20240824_071650.jpg', '2025-04-16 09:46:35', '2025-04-16 09:46:35'),
(13, 'gallery', 'FOTO SISWA KEJUARAAN LOMBA BERSAMA KELAS 6', 'uploads/1744796842234-30410607-20241001_075147.jpg', '2025-04-16 09:47:22', '2025-04-16 09:47:22'),
(14, 'gallery', 'VOLI', 'uploads/1744796934377-257186367-20240516_114614.jpg', '2025-04-16 09:48:54', '2025-04-16 09:48:54'),
(15, 'gallery', 'GOTONG ROYONG', 'uploads/1744796953616-335449314-WhatsApp Image 2023-10-13 at 07.58.04.jpeg', '2025-04-16 09:49:13', '2025-04-16 09:49:13'),
(16, 'gallery', 'FOTO HALAMAN SD NEGERI 2 MANJUNG WONOGIRI', 'uploads/1744796998022-882931347-20240521_080131.jpg', '2025-04-16 09:49:58', '2025-04-16 09:49:58'),
(17, 'gallery', 'FOTO LOGO SD NEGERI 2 MANJUNG WONOGIRI', 'uploads/1744797020145-743483667-logo-sekolah.png', '2025-04-16 09:50:20', '2025-04-16 09:50:20');

-- --------------------------------------------------------

--
-- Table structure for table `data_guru`
--

CREATE TABLE `data_guru` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_guru`
--

INSERT INTO `data_guru` (`id`, `nama`, `nip`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'Edi Susilo, S.Pd', '198005152008011016', 'uploads/1744183334992-567998409-Pak Edy.jpg', '2025-04-09 07:22:14', '2025-04-09 07:22:14'),
(2, 'Endang Siswanti, S.Pd.SD', '196512081982012003', 'uploads/1744183425386-766622452-Bu Endang.jpg', '2025-04-09 07:23:45', '2025-04-16 10:07:09'),
(3, 'Sri Dadi, S.Pd', '196704282000031003', 'uploads/1744183489476-931867687-Pak Sridadi.jpg', '2025-04-09 07:24:49', '2025-04-09 07:24:49'),
(4, 'Vietry Nur Pramita, S.Pd.SD', '198706142009032002', 'uploads/1744183572435-152248865-Bu Vietry.jpg', '2025-04-09 07:26:12', '2025-04-09 07:26:12'),
(5, 'Muhajirin Aziz, S.Pd', '199406282020121001', 'uploads/1744183753657-689728555-Pak Muhajirin.jpg', '2025-04-09 07:29:13', '2025-04-16 10:08:38'),
(6, 'Cahyaning Fitria Prihutami,M.Pd', '198705232011012010', 'uploads/1744183841840-351594066-Bu Fitria.jpg', '2025-04-09 07:30:41', '2025-04-16 13:05:27'),
(7, 'Solikin', '198706142009032002', 'uploads/1744183939774-997504721-pak Solikin.jpg', '2025-04-09 07:32:19', '2025-04-16 13:06:49'),
(8, 'Lestari, S.Pd', '198205272022212013', 'uploads/1744184052185-985423249-Bu Lestari.jpg', '2025-04-09 07:34:12', '2025-04-09 07:34:23'),
(9, 'Afindian Bela F, S.Pd', '199309062022212015', 'uploads/1744184109846-127545254-Bu Afindian.jpg', '2025-04-09 07:35:09', '2025-04-16 10:10:37'),
(10, 'Nining Amin Hidayati S.Pd.I', '198303022022212017', 'uploads/1744184204711-553041734-Bu Nining.jpg', '2025-04-09 07:36:44', '2025-04-16 10:11:19'),
(11, 'Yuli Lindawati, S.kom', '-', 'uploads/1744184262945-610135817-Bu Yuli.jpg', '2025-04-09 07:37:42', '2025-04-09 07:37:42');

-- --------------------------------------------------------

--
-- Table structure for table `detail_sekolah`
--

CREATE TABLE `detail_sekolah` (
  `id` int(11) NOT NULL,
  `noPendirian` varchar(255) NOT NULL,
  `noSertif` varchar(255) NOT NULL,
  `noStatistik` varchar(255) DEFAULT NULL,
  `npsn` varchar(255) NOT NULL,
  `jenjangAkreditas` varchar(255) NOT NULL,
  `thDidirikan` varchar(255) NOT NULL,
  `thOperasional` varchar(255) NOT NULL,
  `statusTanah` varchar(255) NOT NULL,
  `luasTanah` varchar(255) DEFAULT NULL,
  `statusBangunan` varchar(255) NOT NULL,
  `luasBangunan` varchar(255) DEFAULT NULL,
  `totalLahan` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_sekolah`
--

INSERT INTO `detail_sekolah` (`id`, `noPendirian`, `noSertif`, `noStatistik`, `npsn`, `jenjangAkreditas`, `thDidirikan`, `thOperasional`, `statusTanah`, `luasTanah`, `statusBangunan`, `luasBangunan`, `totalLahan`, `createdAt`, `updatedAt`) VALUES
(1, '132433543366', '421.2/016/1/55/84', '-', '203407524', 'B', '1984', '1984', 'Hak Milik', '-', 'Pemerintah', '-', '-', '2025-04-09 07:16:35', '2025-04-09 07:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `img_slide`
--

CREATE TABLE `img_slide` (
  `id` int(11) NOT NULL,
  `profilSekolahId` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `img_slide`
--

INSERT INTO `img_slide` (`id`, `profilSekolahId`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'uploads/1744182521681-969287624-foto gurubersama.jpg', '2025-04-09 07:08:41', '2025-04-09 07:08:41'),
(3, 1, 'uploads/1744794458086-903352670-20240517_100835.jpg', '2025-04-16 09:07:38', '2025-04-16 09:07:38'),
(4, 1, 'uploads/1744794539883-157321204-20240521_080131.jpg', '2025-04-16 09:08:59', '2025-04-16 09:08:59'),
(6, 1, 'uploads/1744794601984-522042202-20241021_074733.jpg', '2025-04-16 09:10:02', '2025-04-16 09:10:02'),
(8, 1, 'uploads/1744794627206-910735535-20240824_071650.jpg', '2025-04-16 09:10:27', '2025-04-16 09:10:27'),
(9, 1, 'uploads/1744794654684-112242101-20240521_080011.jpg', '2025-04-16 09:10:54', '2025-04-16 09:10:54'),
(12, 1, 'uploads/1744794694259-1085764-WhatsApp Image 2023-11-10 at 07.37.43.jpeg', '2025-04-16 09:11:34', '2025-04-16 09:11:34'),
(14, 1, 'uploads/1744794737107-655802469-20240909_073502.jpg', '2025-04-16 09:12:17', '2025-04-16 09:12:17'),
(15, 1, 'uploads/1744794758966-103942251-20241021_074733.jpg', '2025-04-16 09:12:38', '2025-04-16 09:12:38');

-- --------------------------------------------------------

--
-- Table structure for table `kontak_sekolah`
--

CREATE TABLE `kontak_sekolah` (
  `id` int(11) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `linkMaps` text NOT NULL,
  `telepon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `linkFacebook` varchar(255) DEFAULT NULL,
  `linkTwitter` varchar(255) DEFAULT NULL,
  `linkInstagram` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `linkPpdb` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kontak_sekolah`
--

INSERT INTO `kontak_sekolah` (`id`, `alamat`, `linkMaps`, `telepon`, `email`, `linkFacebook`, `linkTwitter`, `linkInstagram`, `createdAt`, `updatedAt`, `linkPpdb`) VALUES
(1, 'JL. Sawojajar, No. II, Manjung Kulon, RT 1 RW 4, Manjung, Wonogiri, Jawa Tengah 57651.', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.5369192627954!2d110.96060108853132!3d-7.7819959980594176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a2e3a0eb50b89%3A0x8e0cb5f7e76ec872!2sSD%20Negeri%202%20Manjung!5e0!3m2!1sid!2sid!4v1744183118238!5m2!1sid!2sid', '+62-0992-3334', 'sdnegeri2manjung@gmail.com', 'https://www.facebook.com/sdn2manjung', 'https://twitter.com/sdn2manjung', 'https://www.instagram.com/sdn2manjung', '2025-04-09 07:19:58', '2025-04-22 09:29:04', 'https://spmb.id/');

-- --------------------------------------------------------

--
-- Table structure for table `misi`
--

CREATE TABLE `misi` (
  `id` int(11) NOT NULL,
  `profilSekolahId` int(11) NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `misi`
--

INSERT INTO `misi` (`id`, `profilSekolahId`, `text`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Memanfaatkan TIK sesuai SNP.', '2025-04-09 07:10:27', '2025-04-09 07:10:27'),
(2, 1, 'Membudayakjan 5s (Senyum, Salam, Sapa, Sopan, dan Santun).', '2025-04-09 07:11:29', '2025-04-09 07:11:29'),
(3, 1, 'Membangun Kekeluargaan', '2025-04-09 07:11:41', '2025-04-09 07:11:41'),
(4, 1, 'Meningkatkan pembelajaran, kemandirian, kedisiplinan, keimanan, dan cinta lingkungan.', '2025-04-09 07:12:11', '2025-04-09 07:12:11');

-- --------------------------------------------------------

--
-- Table structure for table `profil_sekolah`
--

CREATE TABLE `profil_sekolah` (
  `id` int(11) NOT NULL,
  `namaSekolah` varchar(255) NOT NULL,
  `motto` text NOT NULL,
  `kepalaSekolah` varchar(255) NOT NULL,
  `tentang` text NOT NULL,
  `tujuan` text NOT NULL,
  `strategi` text NOT NULL,
  `visi` text NOT NULL,
  `strukturImg` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profil_sekolah`
--

INSERT INTO `profil_sekolah` (`id`, `namaSekolah`, `motto`, `kepalaSekolah`, `tentang`, `tujuan`, `strategi`, `visi`, `strukturImg`, `createdAt`, `updatedAt`) VALUES
(1, 'SD NEGERI 2 MANJUNG WONOGIRI', '\"Terwujudnya insan yang berakhlak mulia, cerdas, berprestasi, mandiri, terampil serta cinta lingkungan hidup berdasarkan IMTAQ”.', 'Edi Susilo, S.Pd.', 'SD Negeri 2 Manjung Wonogiri merupakan salah satu sekolah terbaik yang berkomitmen dalam memberikan pendidikan berkualitas bagi siswa. Dengan fasilitas modern dan guru-guru berpengalaman, kami selalu berupaya membangun generasi yang cerdas dan berakhlak.', 'SD Negeri 2 Manjung berkomitmen mencetak generasi unggul yang berakhlak mulia, berprestasi, dan peduli lingkungan hidup berdasarkan nilai-nilai IMTAQ. Dengan mengacu pada kebijakan nasional seperti UU Nomor 20 Tahun 2003 dan standar kompetensi peserta didik, sekolah ini mengembangkan pendidikan yang berorientasi pada Profil Pelajar Pancasila. Melalui pembelajaran aktif, kreatif, dan berbasis TIK, serta penguatan karakter dengan budaya 5S dan cinta lingkungan, sekolah berupaya menciptakan suasana kekeluargaan dan mendorong tumbuhnya kemandirian, kedisiplinan, dan kompetensi peserta didik secara optimal untuk menghadapi tantangan global.', 'Tiada kekayaan yang paling utama daripada kekayaan jiwa, tiada kepapaan yang paling menyedihkan daripada kebodohan, dan tiada warisan yang paling baik daripada pendidikan.', 'SD Negeri 2 Manjung berkomitmen mencetak generasi unggul yang berakhlak mulia, berprestasi, dan peduli lingkungan hidup berdasarkan nilai-nilai IMTAQ dengan mengacu pada kebijakan nasional seperti UU Nomor 20 Tahun 2003 dan standar kompetensi peserta didik yang berorientasi pada Profil Pelajar Pancasila.', 'uploads/1744182266992-187180367-strukturorganisasi.png', '2025-04-09 07:04:27', '2025-04-16 10:03:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(1, 'adminsdn2manjung', 'admin@gmail.com', '$2b$10$oDQBzFeBN/t/jI3uVDgsuOgJI9uN10MmzeoX/pA8hL6mBMSE7QAjK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbnNkbjJtYW5qdW5nIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDUzMTg4NzMsImV4cCI6MTc0NTQwNTI3M30.-vX_iSN5TrMBlIZ2JJj7pVJuNz_qRWX6TgKMq1jpf8M', '2025-04-09 07:02:18', '2025-04-22 10:47:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_berita`
--
ALTER TABLE `data_berita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_gambar`
--
ALTER TABLE `data_gambar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_guru`
--
ALTER TABLE `data_guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_sekolah`
--
ALTER TABLE `detail_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `img_slide`
--
ALTER TABLE `img_slide`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profilSekolahId` (`profilSekolahId`);

--
-- Indexes for table `kontak_sekolah`
--
ALTER TABLE `kontak_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `misi`
--
ALTER TABLE `misi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profilSekolahId` (`profilSekolahId`);

--
-- Indexes for table `profil_sekolah`
--
ALTER TABLE `profil_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_berita`
--
ALTER TABLE `data_berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `data_gambar`
--
ALTER TABLE `data_gambar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `data_guru`
--
ALTER TABLE `data_guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `detail_sekolah`
--
ALTER TABLE `detail_sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `img_slide`
--
ALTER TABLE `img_slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kontak_sekolah`
--
ALTER TABLE `kontak_sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `misi`
--
ALTER TABLE `misi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `profil_sekolah`
--
ALTER TABLE `profil_sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `img_slide`
--
ALTER TABLE `img_slide`
  ADD CONSTRAINT `img_slide_ibfk_1` FOREIGN KEY (`profilSekolahId`) REFERENCES `profil_sekolah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `misi`
--
ALTER TABLE `misi`
  ADD CONSTRAINT `misi_ibfk_1` FOREIGN KEY (`profilSekolahId`) REFERENCES `profil_sekolah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
