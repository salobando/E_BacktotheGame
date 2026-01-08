-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-01-2026 a las 20:47:14
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `backtothegame`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'consolas', 'Categoría dedicada a consolas de videojuegos de sobremesa y portátiles, incluyendo modelos actuales de marcas como PlayStation, Xbox y Nintendo.'),
(2, 'consolas retro', 'Consolas clásicas y reediciones retro para coleccionistas y amantes de los videojuegos, incluyendo sistemas emblemáticos de los años 80, 90 y 2000.'),
(3, 'videojuegos', 'Juegos físicos y digitales para diferentes plataformas, incluyendo títulos nuevos, clásicos y ediciones especiales.'),
(4, 'accesorios', 'Accesorios para consolas como controles, cables, soportes, cargadores y fundas de protección.'),
(5, 'sillas gamer', 'Sillas ergonómicas diseñadas para videojuegos y uso prolongado, con soporte lumbar, reposabrazos ajustables y materiales de alta calidad.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contraseña` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellido`, `email`, `contraseña`, `telefono`) VALUES
(1, 'Rodolfo', 'Ruidiaz', 'rodolforuidia@gmail.com', 'rodolf453', '3134543212'),
(2, 'Erika', 'Niviayo', 'eriNivi29@gmail.com', 'eri3434', '3134337622'),
(3, 'Sebastian', 'Leon', 'sebasti73@gmail.com', 'leon7878', '3108885432'),
(4, 'David', 'Rodriguez', 'david2025@gmail.com', 'dada3232', '3157843455'),
(5, 'Danna', 'Salamanca', 'dssalamancao@gmail.com', 'danna9564', '3008833632');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE IF NOT EXISTS `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `cantidadP` int NOT NULL,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `id_cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id_compra`, `cantidadP`, `id_cliente`) VALUES
(1, 2800000, 1),
(2, 2700000, 2),
(3, 1800000, 3),
(4, 1600000, 4),
(5, 1900000, 5),
(6, 650000, 1),
(7, 750000, 2),
(8, 800000, 3),
(9, 550000, 4),
(10, 2000000, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

DROP TABLE IF EXISTS `orden`;
CREATE TABLE IF NOT EXISTS `orden` (
  `id_orden` int NOT NULL AUTO_INCREMENT,
  `id_compra` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_orden`),
  KEY `id_compra` (`id_compra`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`id_orden`, `id_compra`, `id_producto`) VALUES
(101, 1, 1),
(102, 1, 3),
(103, 2, 6),
(104, 3, 5),
(105, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_categoria`) VALUES
(1, 'PlayStation 5', 'Consola Sony PlayStation 5 con SSD ultra rápido y soporte 4K', 2800000, 10, 1),
(2, 'Xbox Series X', 'Consola Xbox Series X con alto rendimiento y gráficos en 4K', 2700000, 8, 1),
(3, 'Xbox Series S', 'Consola Xbox Series S versión digital compacta', 1800000, 12, 1),
(4, 'Nintendo Switch', 'Consola Nintendo Switch híbrida portátil y de sobremesa', 1600000, 15, 1),
(5, 'PlayStation 4 Slim', 'Consola PlayStation 4 Slim con diseño compacto', 1900000, 6, 1),
(6, 'Nintendo Switch OLED', 'Consola Nintendo Switch con pantalla OLED de 7 pulgadas', 2000000, 9, 1),
(7, 'Nintendo NES', 'Consola clásica de Nintendo con cartuchos y juegos retro de los años 80', 650000, 5, 2),
(8, 'Super Nintendo SNES', 'Consola Super Nintendo con gráficos 16 bits y juegos clásicos', 750000, 4, 2),
(9, 'Sega Genesis', 'Consola Sega Genesis con títulos clásicos como Sonic y Street of Rage', 700000, 3, 2),
(10, 'PlayStation 1', 'Primera consola de Sony con juegos en CD y gráficos 3D clásicos', 800000, 6, 2),
(11, 'Atari 2600', 'Consola Atari 2600 con cartuchos clásicos y estilo retro', 550000, 2, 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `id_compra` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
