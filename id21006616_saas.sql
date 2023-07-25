-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-07-2023 a las 14:47:59
-- Versión del servidor: 10.5.20-MariaDB
-- Versión de PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id21006616_saas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(4) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `id_tipo` int(2) NOT NULL,
  `cantidad` int(4) NOT NULL,
  `fecha_vencimiento` varchar(45) NOT NULL,
  `imagen` varchar(10000) NOT NULL,
  `id_farmaceuta` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `nombre`, `id_tipo`, `cantidad`, `fecha_vencimiento`, `imagen`, `id_farmaceuta`) VALUES
(1, 'Acetaminofen', 1, 45, '14/04/2025', 'https://farmavicena.com/wp-content/uploads/2023/02/Acetaminofen-500mg-genericos.jpg', 1),
(2, 'Ibuprofeno', 1, 17, '20/07/2025', 'https://lh3.googleusercontent.com/sfih5__k4bO2SFVfdLOQkvdKiA2iZq71dyKA5-rez65elPrU7tOueJRg0G6iB54kmLnV1dD2RSkhgpZFKDYlRHcazgqN-cVkMANxrrFTPPSvGMoP', 1),
(13, 'Loratadina', 7, 62, '20/07/2025', 'https://calox.com/wp-content/uploads/2022/12/LORATADINA.jpg', 1),
(15, 'Amoxicilina', 8, 15, '20/07/2025', 'https://www.lasanteca.com/userfiles/2018/12/AMOXICILINA-500MG-CAJA-POR-50-CAPSULAS-INCLINADO.jpg', 1),
(16, 'Atamel Forte', 1, 44, '2035-06-07', 'https://farmaprime.com.ve/wp-content/uploads/2022/06/3689-FAMACIA-MARACAIBO.jpg', 3),
(17, 'Valeriana', 9, 20, '2036-11-21', 'https://m.media-amazon.com/images/I/71bOYa9+g8L._SX569_.jpg', 4),
(18, 'Aleve', 1, 80, '2034-11-02', 'https://m.media-amazon.com/images/I/81M8Sxfy1rL.jpg', 4),
(19, 'Ketoprofeno', 1, 5, '2030-10-17', 'https://representacionland.com/wp-content/uploads/2023/03/Ketoprofeno-Ampolla-40mg-x-ml-LAND.jpg', 1),
(20, 'Lisomucin', 10, 8, '2027-07-15', 'https://farmacianovadamaia.pt/38006-large_default/lisomucin-16mgml-syrup-200ml.jpg', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(4) NOT NULL,
  `id_producto` int(4) NOT NULL,
  `cantidad_producto` int(4) NOT NULL,
  `id_tipo` int(2) NOT NULL,
  `fecha_vencimiento_producto` varchar(45) NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `lote` varchar(12) NOT NULL,
  `id_proveedor` int(3) NOT NULL,
  `id_empleado` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `id_producto`, `cantidad_producto`, `id_tipo`, `fecha_vencimiento_producto`, `fecha_compra`, `lote`, `id_proveedor`, `id_empleado`) VALUES
(1, 1, 5, 1, '14/04/2025', '0000-00-00 00:00:00', '45152648m', 1, 1),
(9, 2, 4, 1, '10/05/2026', '0000-00-00 00:00:00', '122335465m', 1, 1),
(10, 1, 3, 1, '10/05/2026', '0000-00-00 00:00:00', '122335465m', 1, 1),
(11, 2, 1, 1, '10/05/2026', '0000-00-00 00:00:00', '122335465m', 1, 1),
(12, 16, 10, 1, '2035-07-23', '2023-07-23 00:00:00', '122355465m', 1, 1),
(13, 16, 5, 1, '2035-07-23', '2023-07-23 00:00:00', '12465m', 1, 1),
(14, 17, 5, 9, '2030-11-21', '2023-07-23 00:00:00', '1253335465m', 1, 1),
(15, 1, 9, 1, '2033-10-12', '2023-07-24 00:00:00', '1452788526m', 1, 1),
(16, 17, 5, 9, '2038-11-18', '2023-07-24 00:00:00', '1574128215m', 3, 2),
(17, 17, 3, 9, '2035-07-19', '2023-07-24 00:00:00', '125335555m', 3, 2),
(18, 18, 5, 1, '2037-10-07', '2023-07-24 00:00:00', '456325372564', 3, 2),
(19, 18, 5, 1, '2037-10-07', '2023-07-24 00:00:00', '456325372564', 3, 2),
(20, 1, 10, 1, '2035-10-10', '2023-07-24 00:00:00', '1555355465m', 1, 1),
(21, 16, 17, 1, '2033-10-12', '2023-07-24 00:00:00', '12235554255m', 2, 1),
(22, 1, 11, 1, '2027-11-18', '2023-07-24 00:00:00', '122335111m', 3, 1),
(23, 13, 7, 7, '2029-10-24', '2023-07-24 00:00:00', '124645455455', 1, 2),
(24, 15, 7, 8, '2033-10-11', '2023-07-24 00:00:00', '122555555465', 2, 2),
(25, 16, 5, 1, '2030-10-09', '2023-07-24 00:00:00', '1223222465m', 3, 2),
(26, 15, 1, 8, '2029-10-17', '2023-07-24 00:00:00', '12333465m', 2, 2),
(27, 2, 5, 1, '2029-06-08', '2023-07-24 00:00:00', '122333465m', 2, 2),
(28, 2, 2, 1, '2033-10-05', '2023-07-24 00:00:00', '111111465m', 2, 1),
(29, 13, 5, 7, '2034-10-03', '2023-07-24 00:00:00', '122222265m', 3, 2),
(30, 16, 2, 1, '2030-10-16', '2023-07-24 00:00:00', '15455641515m', 2, 2),
(31, 20, 5, 10, '2030-03-07', '2023-07-24 00:00:00', '12255555465m', 3, 3);

--
-- Disparadores `compras`
--
DELIMITER $$
CREATE TRIGGER `actualizar cantidad` AFTER INSERT ON `compras` FOR EACH ROW UPDATE articulos SET cantidad = cantidad + NEW.cantidad_producto WHERE id = NEW.id_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(3) NOT NULL,
  `nombre_emp` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `cedula` int(9) NOT NULL,
  `telefono_emp` varchar(15) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre_emp`, `apellido`, `cedula`, `telefono_emp`, `direccion`) VALUES
(1, 'Jose', 'Perez', 214567589, '+584246587897', 'Urbanizacion San Francisco'),
(2, 'Jesus', 'Pacheco', 13590661, '+584143649153', 'Maracaibo'),
(3, 'Ruben', 'Gonzalez', 27896987, '04246725408', 'Maracaibo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `farmaceuta`
--

CREATE TABLE `farmaceuta` (
  `id` int(3) NOT NULL,
  `nombre_doc` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `farmaceuta`
--

INSERT INTO `farmaceuta` (`id`, `nombre_doc`) VALUES
(1, 'Dr. Rafael Belloso'),
(3, 'Dr. Juan Carlos'),
(4, 'Dr. Jose Portillo'),
(5, 'Dr. Lisandro Veranueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(3) NOT NULL,
  `nombre_pro` varchar(45) NOT NULL,
  `rif` varchar(25) NOT NULL,
  `telefono_pro` varchar(15) NOT NULL,
  `correo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre_pro`, `rif`, `telefono_pro`, `correo`) VALUES
(1, 'Laboratorio Mercedez', 'j5002547860', '+572458578968', 'mercedezlab@gmail.com'),
(2, 'Laboratorio Nueva Vista', 'j500478995200', '+584246725408', 'nuevavista@gmail.com'),
(3, 'Farmacia YA!', 'j50024748200', '+584126589782', 'famaciaya@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_productos`
--

CREATE TABLE `tipos_productos` (
  `id` int(2) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_productos`
--

INSERT INTO `tipos_productos` (`id`, `tipo`) VALUES
(1, 'Analgesico'),
(7, 'Antialergico'),
(8, 'Antibiotico'),
(9, 'Neurotonicos'),
(10, 'Antigripal');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipos_productos_id_tipo_articulos` (`id_tipo`),
  ADD KEY `farmaceuta_id_farmaceuta_articulosarticulos` (`id_farmaceuta`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foranea articulo` (`id_producto`),
  ADD KEY `foranea tipo` (`id_tipo`),
  ADD KEY `foranea proveedor` (`id_proveedor`),
  ADD KEY `foranea empleados` (`id_empleado`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `farmaceuta`
--
ALTER TABLE `farmaceuta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_productos`
--
ALTER TABLE `tipos_productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `farmaceuta`
--
ALTER TABLE `farmaceuta`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipos_productos`
--
ALTER TABLE `tipos_productos`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `farmaceuta_id_farmaceuta_articulosarticulos` FOREIGN KEY (`id_farmaceuta`) REFERENCES `farmaceuta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tipos_productos_id_tipo_articulos` FOREIGN KEY (`id_tipo`) REFERENCES `tipos_productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `foranea articulo` FOREIGN KEY (`id_producto`) REFERENCES `articulos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foranea empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foranea proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foranea tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipos_productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
