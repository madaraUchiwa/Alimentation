-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 29 mars 2019 à 01:12
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `livrerecette`
--

-- --------------------------------------------------------

--
-- Structure de la table `repas`
--

DROP TABLE IF EXISTS `repas`;
CREATE TABLE IF NOT EXISTS `repas` (
  `idRepas` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idTypeRepas` int(10) UNSIGNED NOT NULL,
  `libelleRepas` varchar(100) DEFAULT NULL,
  `imageRepas` varchar(255) DEFAULT NULL,
  `ingredient` text,
  `recette` text,
  PRIMARY KEY (`idRepas`),
  KEY `Repas_FKIndex1` (`idTypeRepas`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `repas`
--

INSERT INTO `repas` (`idRepas`, `idTypeRepas`, `libelleRepas`, `imageRepas`, `ingredient`, `recette`) VALUES
(1, 1, 'gâteau au chocolat', 'gateau-au-chocolat.jpg', '180g de chocolats.\r\n50g de beurre.\r\n1 sachet de sucre vanié.\r\n1/2 sachet de levure.\r\n1 verre de sucre.\r\n1 verre de farine.\r\n5 œufs', 'Dans un saladier, mélanger les oeufs et le sucre.\r\nAjouter la farine puis mélanger.\r\nAjouter la levure, le sucre vanillé et mélanger.\r\nDans une casserole faire fondre le beurre avec le chocolat.\r\nVerser le chocolat et le beurre avec le mélange.\r\nVerser dans un moule, ne pas le remplir tout à fait car le gâteau va gonfler.\r\nEnfourner dans le four à 180°C pendant 30 minutes'),
(2, 3, 'Grillade Saint Gilloise', 'GrilladeSaintGilloise.jpg', '1 pot de câpres.\r\n1 petite brique de crème fraîche\r\n1 pot de filets d\'anchois.\r\n2 oignons.\r\n3 gousses d\'ail\r\nPersil.\r\n8 tranches de paleron .', 'Verser un fond d\'huile dans une cocotte.\r\nMettre une couche de viande.\r\nParsemer d\'ail haché, d\'oignon émincé, de persil haché et de câpres.\r\nMettre deux filets d\'anchoix par tranche de viande.\r\nDisposer une nouvelle couche de viande et parsemer de garniture.\r\nProcéder ainsi jusqu\'à épuisement de la viande. Finir par une couche de garniture.\r\nCuire à couvert, à feu très doux pendant 2 heures.\r\nSéparer la viande de la garniture\r\nMixer cette dernière avec la crème fraîche.\r\nVerser la sauce obtenue sur la viande et servir aussitôt.\r\n'),
(4, 8, 'Virgin Mojito à la fraise', 'imageType-1553766610001.jpg', '20 cl d\"eau gazeuse\r\n10 feuilles de menthe.\r\n8 glaçons.\r\n6 fraises.\r\n½ citron vert.\r\n2 c à c de sirop de sucre de canne ou de sirop à la fraise                           ', 'Mettre 5 feuilles de menthe dans chaque verre.\r\nAjouter dans chaque verre, le sucre de canne, les fraises coupées en 4 et le citron coupé en petits dés.\r\nPiller à l\'aide d\'un pillon et ajouter les glaçons broyés en glace pillée jusqu\'en haut du verre.\r\nAjouter l\'eau gazeuse, décorer d\'une fraise coupée en deux, quelques feuilles de menthe et une paille');

-- --------------------------------------------------------

--
-- Structure de la table `typerepas`
--

DROP TABLE IF EXISTS `typerepas`;
CREATE TABLE IF NOT EXISTS `typerepas` (
  `idTypeRepas` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelleType` varchar(50) DEFAULT NULL,
  `imageType` varchar(255) DEFAULT NULL,
  `iconType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idTypeRepas`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `typerepas`
--

INSERT INTO `typerepas` (`idTypeRepas`, `libelleType`, `imageType`, `iconType`) VALUES
(1, 'Désserts', 'dessert.jpg', NULL),
(2, 'Soupes', 'soupes.jpg', NULL),
(3, 'Grillades', 'grillades.png', 'pizza'),
(4, 'Salades', 'salades.jpeg', NULL),
(7, 'Entrées', 'imageType-1553741332644.jpg', ''),
(8, 'Cocktails', 'imageType-1553741919773.jpeg', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `idProfile` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `email`, `password`, `idProfile`) VALUES
(1, 'omael', 'beriz', 'omaelberiz@gmail.com', '123456789', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
