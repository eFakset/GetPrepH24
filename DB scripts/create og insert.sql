/* CREATE SCHEMA `gp24` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_danish_ci ; */

USE gp24;

DROP TABLE IF EXISTS vare;
DROP TABLE IF EXISTS varegruppe;
DROP TABLE IF EXISTS kunde;
DROP TABLE IF EXISTS kommune;
DROP TABLE IF EXISTS fylke;

/****** Object:  Table fylke ******/
CREATE TABLE fylke (
  fylke_nr char(2) NOT NULL,
  fylke_nv varchar(255) NOT NULL,
  PRIMARY KEY (fylke_nr)
);

/****** Object:  Table kommune ******/
CREATE TABLE kommune(
	kommune_nr char(4) NOT NULL,
	kommune_nv varchar(255) NOT NULL,
	fylke_nr char(2) NOT NULL,
PRIMARY KEY (kommune_nr)
);

ALTER TABLE kommune
 ADD CONSTRAINT FK_kommune_fylke FOREIGN KEY FK_kommune_fylke (fylke_nr)
    REFERENCES fylke (fylke_nr)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

/****** Object:  Table kunde ******/
CREATE TABLE kunde (
	kunde_nr SMALLINT NOT NULL DEFAULT 0,
	kunde_nv varchar(255) NOT NULL,
	kommune_nr char(4) NOT NULL,
 PRIMARY KEY (kunde_nr)
);

ALTER TABLE kunde
 ADD CONSTRAINT FK_kunde_kommune FOREIGN KEY FK_kunde_kommune (kommune_nr)
    REFERENCES kommune (kommune_nr)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;
    
/****** Object:  Table varegruppe ******/
CREATE TABLE varegruppe (
	varegruppe_nr SMALLINT NOT NULL DEFAULT 0,
	varegruppe_nv varchar(255) NOT NULL,
	mvasats_pct tinyint NULL,
 PRIMARY KEY (varegruppe_nr)
);

/****** Object:  Table vare  ******/
CREATE TABLE vare (
	vare_nr SMALLINT NOT NULL DEFAULT 0,
	vare_nv varchar(255) NOT NULL,
	varegruppe_nr SMALLINT NOT NULL DEFAULT 0,
 PRIMARY KEY (vare_nr)
);

ALTER TABLE vare
 ADD CONSTRAINT FK_vare_varegruppe FOREIGN KEY FK_vare_varegruppe (varegruppe_nr)
    REFERENCES varegruppe (varegruppe_nr)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

insert into fylke values ('00', 'Ikke oppgitt');
insert into fylke (fylke_nr, fylke_nv) values ('39', 'Vestfold');
insert into fylke (fylke_nr, fylke_nv) values ('40', 'Telemark');
insert into kommune values ('3901', 'Horten', '39');
insert into kommune values ('3903', 'Holmestrand', '39');
insert into kommune values ('3905', 'Tønsberg', '39');
insert into kommune values ('3907', 'Sandefjord', '39');
insert into kommune values ('3909', 'Larvik', '39');
insert into kommune values ('3911', 'Færder', '39');

insert into kommune values 
('0000', 'Ikke oppgitt', '00'),
('4001', 'Porsgrunn', '40'),
('4003', 'Skien', '40'),
('4005', 'Notodden', '40'),
('4012', 'Bamble', '40'),
('4014', 'Kragerø', '40'),
('4016', 'Drangedal', '40');

insert into varegruppe values(1, 'Pålegg', 15);
insert into varegruppe values(2, 'Ferdigmat', 15);
insert into varegruppe values(3, 'Frukt og bær', 15);
insert into varegruppe values(4, 'Grønnsaker', 15);
insert into varegruppe values(5, 'Kjøtt', 15);
insert into varegruppe values(6, 'Sjømat', 15);
insert into varegruppe values(7, 'Hermetiske og tørkede grønnsaker', 15);
insert into varegruppe values(8, 'Egg', 15);
insert into varegruppe values(9, 'Meieri', 15);
insert into varegruppe values(10, 'Dessert', 15);
insert into varegruppe values(11, 'Pant', 0);
insert into varegruppe values(12, 'Kjøtthermetikk og halvfabrikata', 15);
insert into varegruppe values(13, 'Fiskehermetikk og halvfabrikata', 15);
insert into varegruppe values(14, 'Snacks', 15);
insert into varegruppe values(15, 'Juice og smoothie', 15);
insert into varegruppe values(16, 'Tobakksvarer', 25);
insert into varegruppe values(17, 'Bakevarer og -råvarer', 15);
insert into varegruppe values(18, 'Saft', 15);
insert into varegruppe values(19, 'Alkoholholdige drikker', 25);
insert into varegruppe values(20, 'Pasta og ris', 15);
insert into varegruppe values(21, 'Krydder og smakstilsetning', 15);
insert into varegruppe values(22, 'Kaffe og te', 15);
insert into varegruppe values(23, 'Sauser, oljer og margarin', 15);
insert into varegruppe values(24, 'Helsekost', 15);
insert into varegruppe values(44, 'Apotekvarer', 15);
insert into varegruppe values(34, 'Ost', 15);
insert into varegruppe values(35, 'Hermetisk frukt og bær', 15);
insert into varegruppe values(36, 'Brødvarer', 15);
insert into varegruppe values(37, 'Syltetøy', 15);
insert into varegruppe values(38, 'Lomper etc.', 15);
insert into varegruppe values(39, 'Bæreposer', 25);
insert into varegruppe values(40, 'Grønnsakssalater', 15);
insert into varegruppe values(41, 'Belgfrukter', 15);
insert into varegruppe values(42, 'Middagstilbehør', 15);
insert into varegruppe values(43, 'Iskrem', 15);
insert into varegruppe values(45, 'Pizza', 15);
insert into varegruppe values(46, 'Tørket frukt & nøtter', 15);
insert into varegruppe values(26, 'Bøker og blader', 25);
insert into varegruppe values(27, 'Toalettartikler', 25);
insert into varegruppe values(28, 'Poteter', 15);
insert into varegruppe values(29, 'Ferdigsmurt bakeri', 15);
insert into varegruppe values(30, 'Brus og alkoholfritt', 15);
insert into varegruppe values(31, 'Vaskemidler', 15);
insert into varegruppe values(32, 'Sjokolade', 15);
insert into varegruppe values(33, 'Hus og hjem', 25);

insert into vare values(2, 'Abba fiskebullar', 13);
insert into vare values(3, 'Agurk stk', 4);
insert into vare values(6, 'Agurker skivede Nora', 7);
insert into vare values(7, 'Alaska pollock 1kg', 6);
insert into vare values(8, 'Ananas biter 3x227g', 35);
insert into vare values(9, 'Ananas stk bendit', 3);
insert into vare values(10, 'Andeconfit gratinert', 2);
insert into vare values(12, 'Appelsin juice 1 l Cevita', 15);
insert into vare values(13, 'Appelsiner', 3);
insert into vare values(14, 'Appelsingele 125g Freia', 10);
insert into vare values(15, 'Appelsinjuice 1,5l', 15);
insert into vare values(24, 'Asparges cut&tip 226g', 7);
insert into vare values(28, 'Aubergin stk', 4);
insert into vare values(29, 'Avfallsposer m/håndtak', 33);
insert into vare values(31, 'Babybel mini 120g', 34);
insert into vare values(32, 'Baconost mager 200g', 34);
insert into vare values(33, 'Baguette fin m/ost&skinke', 29);
insert into vare values(34, 'Baguette flerkorn', 36);
insert into vare values(36, 'Baguette m/reker og egg', 29);
insert into vare values(37, 'Bake kakao 250g Regia', 17);
insert into vare values(39, 'Balsamico', 23);
insert into vare values(40, 'Bama ost&skinkesalat 255g', 40);
insert into vare values(41, 'Bambusskudd', 7);
insert into vare values(42, 'Bananer', 3);
insert into vare values(43, 'Basilikum 12g glass Hindu', 21);
insert into vare values(44, 'Batterier 2pk 2032 electr', 33);
insert into vare values(48, 'Biff stroganoff 455g', 2);
insert into vare values(49, 'Biffgryte 450g', 2);
insert into vare values(50, 'Bjerke bøkerøkt skinke', 1);
insert into vare values(51, 'Blenda sensitive flytende', 31);
insert into vare values(52, 'Blenda sensitive hvitt', 31);
insert into vare values(53, 'Blenda sensitive refill', 31);
insert into vare values(54, 'Blenda tøymykner sensitiv', 31);
insert into vare values(55, 'Blå java 200g Jacobs', 22);
insert into vare values(56, 'Blå poser plastemballasje', 33);
insert into vare values(57, 'Blåbær 300g Eldorado', 3);
insert into vare values(58, 'Blåbær 400g First price', 3);
insert into vare values(59, 'Blåbærgele 125g', 10);
insert into vare values(60, 'Bogskinke 325g Terina', 12);
insert into vare values(62, 'Bomull 100g sano', 27);
insert into vare values(63, 'Bomullspinner papp 200stk', 27);
insert into vare values(65, 'Bondebrød', 36);
insert into vare values(67, 'Brie de paris', 34);
insert into vare values(68, 'Bringebær 300g Gartner', 3);
insert into vare values(69, 'Bringebær 400g Eldorado', 3);
insert into vare values(70, 'Bringebær norsk 300g', 3);
insert into vare values(71, 'Bringebærgele 125g Freia', 10);
insert into vare values(72, 'Bringebærsaus 0,5l Piano', 10);
insert into vare values(73, 'Bringebærsylt.400g Nora', 37);
insert into vare values(74, 'Brokkoli', 4);
insert into vare values(76, 'Buer speltlomper 8pk', 38);
insert into vare values(77, 'Buljongterning 16stk Toro', 21);
insert into vare values(78, 'Burgerbrød reale grove', 38);
insert into vare values(80, 'Bærepose', 39);
insert into vare values(82, 'Bønner brune 500g eldorad', 41);
insert into vare values(83, 'Bønner hvite økol. 380g', 41);
insert into vare values(84, 'Bønner sorte tørkede 500g', 41);
insert into vare values(86, 'Champignon', 4);
insert into vare values(87, 'Champignon sk.1/4bx eldo', 7);
insert into vare values(88, 'Cheeseburger 8x100g', 5);
insert into vare values(89, 'Cherrytomater røde', 4);
insert into vare values(91, 'Chili con carne 440g', 2);
insert into vare values(92, 'Chili powder 46g gl Hindu', 21);
insert into vare values(93, 'Chili saus m/garlic 200ml', 23);
insert into vare values(95, 'Chunky salsa hot 350g san', 42);
insert into vare values(96, 'Clausthaler 0,33l bx', 30);
insert into vare values(98, 'Clausthaler 0,5l bx', 30);
insert into vare values(102, 'Coconut milk light 400g', 42);
insert into vare values(103, 'Corona extra 0,36l', 19);
insert into vare values(105, 'Crabsticks 250g fiskem.', 6);
insert into vare values(106, 'Creme chocolat lys', 43);
insert into vare values(107, 'Creme fraiche 300g q', 9);
insert into vare values(108, 'Creme karamell 110ml', 43);
insert into vare values(109, 'Creme melke- sjokolade', 43);
insert into vare values(110, 'Creme melkesjokolade', 43);
insert into vare values(111, 'Creme premium karamell', 43);
insert into vare values(112, 'Crispisalat flow pk 150g', 40);
insert into vare values(113, 'Crispy duck kit m/pannek.', 12);
insert into vare values(114, 'Curry paste red 110g', 21);
insert into vare values(117, 'Dagbladet hverdag', 26);
insert into vare values(118, 'Daim singel 29g Freia', 32);
insert into vare values(120, 'Dent salt lakris 24g', 14);
insert into vare values(121, 'Dijon sennep 215g maille', 42);
insert into vare values(122, 'Domestos  fresh 7,5dl', 33);
insert into vare values(123, 'Dr.greve dusjgele parfyme', 27);
insert into vare values(125, 'Dream brownies karamell', 43);
insert into vare values(126, 'Druer grønne', 3);
insert into vare values(127, 'Earl grey te 200g twining', 22);
insert into vare values(130, 'Edet torky', 33);
insert into vare values(131, 'Egg frittgående m/l 6pk', 8);
insert into vare values(136, 'Eggnudler 250g premium', 42);
insert into vare values(138, 'Eldorado erter/gulrø', 7);
insert into vare values(139, 'Elgkarbonader mors', 5);
insert into vare values(141, 'Energizer lithium cr2032', 33);
insert into vare values(142, 'Eple røde pr.kg', 3);
insert into vare values(143, 'Eplejuice 3l gravensten', 15);
insert into vare values(144, 'Eplejuice premium 1l eldo', 15);
insert into vare values(145, 'Epler grønne', 3);
insert into vare values(148, 'Epler røde kg', 3);
insert into vare values(149, 'Erter gule 500g Eldorado', 41);
insert into vare values(150, 'Erter husholdning 410g', 7);
insert into vare values(151, 'Erter tørrede 410g', 7);
insert into vare values(152, 'Erter&gulrøtter 410g eldo', 7);
insert into vare values(153, 'Erter,kjøtt&flesk 800g', 12);
insert into vare values(154, 'Ertesuppe gul', 2);
insert into vare values(155, 'Evergood filter dark 250g', 22);
insert into vare values(156, 'Evergood filterposer nr.4', 33);
insert into vare values(157, 'Evergood juleblanding', 22);
insert into vare values(160, 'Extra salty licorice 14g', 14);
insert into vare values(162, 'Familieskinke 70g gilde', 1);
insert into vare values(163, 'Farin 1kg Eldorado', 17);
insert into vare values(164, 'Farris bris', 30);
insert into vare values(165, 'Ferske reker', 6);
insert into vare values(166, 'Fersken stk', 3);
insert into vare values(167, 'Filterposer nr.4 100stk', 33);
insert into vare values(168, 'Fiskeboller 1/1', 13);
insert into vare values(170, 'Fiskeboller 400g', 13);
insert into vare values(173, 'Fiskeburger grov', 6);
insert into vare values(177, 'Fiskefond 180ml touch t', 21);
insert into vare values(180, 'Fiskegrateng 540g', 2);
insert into vare values(183, 'Fiskekaker 470g', 2);
insert into vare values(184, 'Fiskesuppe 350g', 2);
insert into vare values(186, 'Fløtegratinert potet 400g', 42);
insert into vare values(189, 'Fond du chef fisk knorr', 21);
insert into vare values(190, 'Fond du chef kjøtt knorr', 21);
insert into vare values(191, 'Fransk baguette 2x280g', 36);
insert into vare values(192, 'Friele cafe noir filter', 22);
insert into vare values(193, 'Frisk eucalyptus new', 14);
insert into vare values(194, 'Fryseposer 4l 40stk unil', 33);
insert into vare values(195, 'Fun light bringebær/lime', 18);
insert into vare values(196, 'Fun light husholdningss.', 18);
insert into vare values(197, 'Fun light ice tea mynte', 18);
insert into vare values(200, 'Fun light wild berries', 18);
insert into vare values(202, 'Fusilli fullkorn 500g', 42);
insert into vare values(203, 'Fårikål m/poteter 565g', 2);
insert into vare values(205, 'Gele bringebær 125g Freia', 10);
insert into vare values(207, 'Gjenbrukspose', 33);
insert into vare values(208, 'Gjær fersk 50g', 17);
insert into vare values(211, 'Go mager leverpostei 150g', 1);
insert into vare values(212, 'Go og mager  servelat', 1);
insert into vare values(213, 'Gourmet garden chili', 21);
insert into vare values(214, 'Gourmet garden hvitløk', 21);
insert into vare values(215, 'Gourmet garden ingefær', 21);
insert into vare values(216, 'Gourmet garden koreander', 21);
insert into vare values(217, 'Grapefrukt juice premium', 15);
insert into vare values(218, 'Gressløk 80g st.maria', 21);
insert into vare values(219, 'Grevens cider citrus 0,5l', 19);
insert into vare values(220, 'Grevens cider fruktsmak', 19);
insert into vare values(221, 'Grevens cider skogsbær', 19);
insert into vare values(223, 'Grillburger fisk', 6);
insert into vare values(224, 'Grovbakst 1kg Møllerens', 17);
insert into vare values(225, 'Grovbrød naturlig sunt', 36);
insert into vare values(228, 'Grønn te sitron 25pos', 22);
insert into vare values(229, 'Grønne poser matavfall', 33);
insert into vare values(230, 'Grønnkål 150g vasket', 4);
insert into vare values(231, 'Grønnsaksjuice 250ml cevi', 15);
insert into vare values(233, 'Gudbrand.ost skivet 130g', 34);
insert into vare values(234, 'Gudbrandsdalsost 1kg', 34);
insert into vare values(239, 'Gullbrød 65g', 32);
insert into vare values(240, 'Gullhøne stor', 5);
insert into vare values(241, 'Gulost 1kg synnøve', 34);
insert into vare values(243, 'Gulrot 750g Gartner', 4);
insert into vare values(245, 'Gulrot bunt', 4);
insert into vare values(249, 'Gulvklut mikrofiber 45x45', 33);
insert into vare values(250, 'Halogenpære classic', 33);
insert into vare values(251, 'Halogenpære reflektor', 33);
insert into vare values(252, 'Hamburger 2x150g', 5);
insert into vare values(253, 'Hamburger 8x100g', 5);
insert into vare values(254, 'Hamburgerrygg 100g gilde', 1);
insert into vare values(257, 'Hansa pilsner lite 0,5l', 19);
insert into vare values(258, 'Havrebrød naturlig sunt', 36);
insert into vare values(259, 'Havrefusilli fullkorn', 20);
insert into vare values(260, 'Havrelomper store 8stk', 38);
insert into vare values(261, 'Havsalt grovt 500g jozo', 21);
insert into vare values(264, 'Hjertesalat 2pk', 4);
insert into vare values(265, 'H-melk 1/2l', 9);
insert into vare values(266, 'Hobby kryss', 26);
insert into vare values(267, 'Hodekål', 4);
insert into vare values(269, 'Honning ekte norsk 350g', 1);
insert into vare values(271, 'Hot chili burger 4stk', 5);
insert into vare values(272, 'Hush.salt m/jod', 21);
insert into vare values(273, 'Husholdningserter 410g un', 7);
insert into vare values(274, 'Husholdningssalt m/jod', 21);
insert into vare values(275, 'Hvete sammalt fin 1kg', 17);
insert into vare values(276, 'Hvetemel 2kg Møllerens', 17);
insert into vare values(277, 'Hvetemel siktet 1kg', 17);
insert into vare values(279, 'Hvitløk', 4);
insert into vare values(285, 'Indrefilet storfe', 5);
insert into vare values(286, 'Ingefær', 4);
insert into vare values(287, 'Ingefær malt 10g Hindu', 21);
insert into vare values(289, 'Isberg mix 250g', 40);
insert into vare values(291, 'Isbergsalat', 4);
insert into vare values(297, 'Jalapeno ost 175g kavli', 34);
insert into vare values(298, 'Jalapenos 215g old elpaso', 42);
insert into vare values(299, 'Japp duo 82g Freia', 32);
insert into vare values(302, 'Jasmin ris 1kg', 20);
insert into vare values(304, 'Jif baderom 500ml spray', 33);
insert into vare values(305, 'Jif engangsvåtmopp', 33);
insert into vare values(306, 'Jif skurekrem sitron', 33);
insert into vare values(307, 'Jif tørrmopp 15stk', 33);
insert into vare values(308, 'Jif wc power gel u/klor', 33);
insert into vare values(309, 'Jordan tanntråd easyslide', 27);
insert into vare values(313, 'Jordbær kurv 500g', 3);
insert into vare values(317, 'Jordbær/rabarbra dessert', 10);
insert into vare values(319, 'Julepølse kokt 350g', 5);
insert into vare values(322, 'Juletallerken 610g', 2);
insert into vare values(323, 'Kalkun filet naturell', 1);
insert into vare values(324, 'Kalkun karbonader 130g', 5);
insert into vare values(325, 'Kalkunbacon 120g vac.bjer', 5);
insert into vare values(327, 'Kalkunfilet ca 1,5kg meny', 5);
insert into vare values(328, 'Kalkunkjøttdeig u/salt', 5);
insert into vare values(332, 'Kanel malt 14g pose Hindu', 21);
insert into vare values(334, 'Karamellpudding m/saus', 10);
insert into vare values(336, 'Karbonadedeig', 5);
insert into vare values(340, 'Kardemomme malt 8g Hindu', 21);
insert into vare values(341, 'Karri malt 34g gl Hindu', 21);
insert into vare values(342, 'Karrikylling 460g', 2);
insert into vare values(343, 'Kerrs pink 2kg', 28);
insert into vare values(344, 'Kikerter bonduelle', 7);
insert into vare values(348, 'Kjøkkenklut mikrofiber', 33);
insert into vare values(350, 'Kjøttboller i tomatsaus', 2);
insert into vare values(352, 'Kjøttboller kylling 400g', 12);
insert into vare values(355, 'Kjøttdeig 400g av svin', 5);
insert into vare values(356, 'Kjøttdeig storfe', 5);
insert into vare values(357, 'Kjøttkaker m/ertestuing', 2);
insert into vare values(361, 'Kleenex original 88stk', 27);
insert into vare values(363, 'Klementiner', 3);
insert into vare values(365, 'Klorin 750ml', 33);
insert into vare values(366, 'Kneipprundstykke 70g', 36);
insert into vare values(370, 'Kokesjokolade 70% 100g', 17);
insert into vare values(373, 'Kokosmelk lett 400ml', 7);
insert into vare values(374, 'Kokosolje økol. 240ml', 7);
insert into vare values(376, 'Kokt skinke 110g', 1);
insert into vare values(381, 'Krabbeskjell fylt', 6);
insert into vare values(384, 'Kremgo pepper 125g tine', 34);
insert into vare values(385, 'Krone-is sjokolade', 43);
insert into vare values(389, 'Krydderskinke 110g gilde', 1);
insert into vare values(394, 'Krystal grønnsåpe 750ml', 33);
insert into vare values(395, 'Kveite m/sandefjordsmør', 2);
insert into vare values(396, 'Kvikk lunsj 47g Freia', 32);
insert into vare values(399, 'Kylling grillet halv', 5);
insert into vare values(401, 'Kylling kjøttdeig u/salt', 5);
insert into vare values(404, 'Kylling lårfilet 600g', 5);
insert into vare values(410, 'Kyllingfilet 600g', 5);
insert into vare values(419, 'Kyllingfilet pepper&hvitl', 1);
insert into vare values(427, 'Kyllingpostei 100g', 1);
insert into vare values(429, 'Kyllingsalat 225g beger', 40);
insert into vare values(432, 'Lakris mint 20g blink', 14);
insert into vare values(433, 'Laks einerrøkt 2x130g', 1);
insert into vare values(434, 'Laks m/potet', 2);
insert into vare values(439, 'Lakseporsjoner 2x125g', 6);
insert into vare values(442, 'Lam fårikålkjøtt', 5);
insert into vare values(445, 'Lammebog skiver', 5);
insert into vare values(448, 'Lammelår m/knoke hel frys', 5);
insert into vare values(454, 'Lapsk. brun hj.800 Terina', 12);
insert into vare values(461, 'Lerøy torsk lettsaltet ca', 6);
insert into vare values(462, 'Lettmajones vita hjertego', 1);
insert into vare values(466, 'Lettmelk 1,75l', 9);
insert into vare values(467, 'Lettmelk 1l', 9);
insert into vare values(469, 'Lettsaltet torskfilet', 6);
insert into vare values(470, 'Lettvint salat ost/skinke', 40);
insert into vare values(471, 'Leverpostei go og mager', 1);
insert into vare values(473, 'Lime lv', 3);
insert into vare values(478, 'Lomper', 38);
insert into vare values(483, 'Løk 4stk strømpe', 4);
insert into vare values(484, 'Løk Gartner 2pk', 4);
insert into vare values(488, 'Løk rød 2stk', 4);
insert into vare values(490, 'Magerost beger 200g kavli', 34);
insert into vare values(491, 'Magerost jalapeno kavli', 34);
insert into vare values(494, 'Maizena maisstivelse 400g', 17);
insert into vare values(495, 'Majones ekte 165g mills', 1);
insert into vare values(497, 'Makaroni fullkorn 500g', 20);
insert into vare values(498, 'Makaroni skruer sopps', 20);
insert into vare values(499, 'Makrell varmrøkt', 1);
insert into vare values(503, 'Mandel potet 2kg', 28);
insert into vare values(504, 'Mandelessens 15ml gimsøy', 21);
insert into vare values(505, 'Mandler løsvekt', 46);
insert into vare values(508, 'Mango stor stk', 3);
insert into vare values(510, 'Matpapir 50m unik', 33);
insert into vare values(511, 'Medisterdeig 400g meny', 5);
insert into vare values(512, 'Meksikansk gryte 400g', 2);
insert into vare values(513, 'Meksikansk salat 270g', 40);
insert into vare values(514, 'Melange flytende 520ml', 23);
insert into vare values(516, 'Melis 500g Eldorado', 17);
insert into vare values(517, 'Melkesjoko.eventyr 24g', 32);
insert into vare values(518, 'Melkesjoko.pudding Freia', 10);
insert into vare values(520, 'Middelhavs miks 170g', 40);
insert into vare values(521, 'Mini baby bel cheddar', 34);
insert into vare values(522, 'Mini babybel 120g', 34);
insert into vare values(524, 'Mini frøbaguette 8stk', 36);
insert into vare values(525, 'Moreller', 3);
insert into vare values(530, 'Mozzarella revet 200g', 34);
insert into vare values(531, 'Munkholm 0,33l bx', 30);
insert into vare values(532, 'Munkholm 12 x 0,33l bx', 30);
insert into vare values(533, 'Møllers total 28 doser', 24);
insert into vare values(536, 'Nektarin stk', 3);
insert into vare values(539, 'Night time 83g', 22);
insert into vare values(540, 'Norsk grovbrød', 36);
insert into vare values(542, 'Norvegia 150g skiver', 34);
insert into vare values(544, 'Norvegia 27% 300g skiv.', 34);
insert into vare values(545, 'Norvegia 27% sk.fri 500g', 34);
insert into vare values(546, 'Norvegia 27% skivet 150g', 34);
insert into vare values(554, 'Nylonvask 100g', 33);
insert into vare values(556, 'Nypotet 1,5kg nett', 28);
insert into vare values(557, 'Nypotet kg', 28);
insert into vare values(562, 'Olivenolje ex.virgin', 23);
insert into vare values(564, 'Oppvaskhanske sensitive', 33);
insert into vare values(566, 'Oregano 5g pose Hindu', 21);
insert into vare values(567, 'Ostegrill 480g prior', 5);
insert into vare values(568, 'Pant', 11);
insert into vare values(572, 'Paprika grønn', 4);
insert into vare values(574, 'Paprika gul', 4);
insert into vare values(575, 'Paprika malt 40g gl Hindu', 21);
insert into vare values(577, 'Paprika rød', 4);
insert into vare values(579, 'Paracet rund 20stk', 44);
insert into vare values(580, 'Parmeggiano reggiano 150g', 34);
insert into vare values(584, 'Pasta fusilli fullkorn', 20);
insert into vare values(587, 'Pastasaus arrabiata 350g', 42);
insert into vare values(588, 'Pastasaus basilikum 350g', 42);
insert into vare values(591, 'Pastasaus hot chili 450g', 42);
insert into vare values(594, 'Pepper hel 95g bx Hindu', 21);
insert into vare values(595, 'Pepper hvit malt Hindu', 21);
insert into vare values(597, 'Pepper sort malt Hindu', 21);
insert into vare values(601, 'Peppersaus 250g Fjordland', 42);
insert into vare values(604, 'Pepsi max 0,33l bx', 30);
insert into vare values(605, 'Pepsi max 0,33lx12 bx', 30);
insert into vare values(606, 'Pepsi max 0,5l fl', 30);
insert into vare values(607, 'Pillede reker 100g', 13);
insert into vare values(608, 'Pillede reker i lake 200g', 13);
insert into vare values(609, 'Pistasj nøtter 70g', 46);
insert into vare values(610, 'Pizza grandiosa kjøttbol.', 45);
insert into vare values(611, 'Pizza pepperoni 360g', 45);
insert into vare values(612, 'Pizza prosciutto 330g', 45);
insert into vare values(613, 'Pizza trad. diavola 330g', 45);
insert into vare values(614, 'Pizza tradizionale', 45);
insert into vare values(618, 'Plastfolie 60m glad', 33);
insert into vare values(620, 'Plomme lv', 3);
insert into vare values(628, 'Poteter bake', 28);
insert into vare values(629, 'Poteter kg norske', 28);
insert into vare values(632, 'Potetmos 400g', 42);
insert into vare values(633, 'Potetmos m/melk&gr.løk', 42);
insert into vare values(634, 'Potetmos vanlig 90g mills', 42);
insert into vare values(636, 'Premium dark 86% 100g', 17);
insert into vare values(638, 'Puncherulle', 32);
insert into vare values(639, 'Purre lv', 4);
insert into vare values(641, 'Pærer', 3);
insert into vare values(643, 'Pølsebrød gourmet', 38);
insert into vare values(644, 'På tv', 26);
insert into vare values(645, 'Rapsolje naturell 0,45l', 23);
insert into vare values(647, 'Reker 60/80 frosne', 6);
insert into vare values(648, 'Reker håndp.600g i glass', 13);
insert into vare values(649, 'Reker i lake håndpillede', 13);
insert into vare values(652, 'Reker naturell 100g', 6);
insert into vare values(654, 'Rensemiddel kaffemaskin', 33);
insert into vare values(655, 'Ringnes lite 0,33l bx', 19);
insert into vare values(656, 'Ringnes lite 0,5l bx', 19);
insert into vare values(657, 'Ringnes pilsner 0,33l bx', 19);
insert into vare values(658, 'Ringnes pilsner 0,5l bx', 19);
insert into vare values(662, 'Ristorante pizza', 45);
insert into vare values(663, 'Ritter sport dark', 32);
insert into vare values(665, 'Roastbiff 100g', 1);
insert into vare values(667, 'Romano mix 175g', 40);
insert into vare values(669, 'Romanosalat', 4);
insert into vare values(670, 'Romessens 15ml gimsøy', 21);
insert into vare values(671, 'Rosenkål 400g', 4);
insert into vare values(672, 'Rosiner 250g sun maid', 46);
insert into vare values(673, 'Rosiner 500g sun maid', 46);
insert into vare values(674, 'Rug sammalt grov 1kg', 17);
insert into vare values(675, 'Rugbrød 500g', 36);
insert into vare values(678, 'Rugbrød skivet 500g', 36);
insert into vare values(682, 'Rundstykker nystekte', 36);
insert into vare values(683, 'Ryvita lys rug knekkebrød', 36);
insert into vare values(684, 'Rød chilipepper 3stk pk', 4);
insert into vare values(685, 'Røde epler pr.kg', 3);
insert into vare values(688, 'Røffe rifler pepperbiff', 14);
insert into vare values(689, 'Røkelaks skivet 300g', 1);
insert into vare values(692, 'Råkost 200g Gartner', 40);
insert into vare values(694, 'Salat crispi 150g', 4);
insert into vare values(695, 'Salat isberg stk', 4);
insert into vare values(697, 'Salatbar plukk&mix', 4);
insert into vare values(700, 'Sambal oelek 200g', 21);
insert into vare values(704, 'Sennep 290g slotts', 42);
insert into vare values(707, 'Serv.hvit 50pk unik', 33);
insert into vare values(708, 'Serv.sand 50stk unik', 33);
insert into vare values(710, 'Sirup mørk 500g Eldorado', 17);
insert into vare values(711, 'Sitron', 3);
insert into vare values(716, 'Sitrongele 125g Freia', 10);
insert into vare values(717, 'Sitronsaft 25cl realemon', 18);
insert into vare values(720, 'Sjokoladepudding prem.', 10);
insert into vare values(723, 'Skinkeost mager 175g kavl', 34);
insert into vare values(724, 'Skinkestek 100g', 1);
insert into vare values(726, 'Skreiburger 500g', 13);
insert into vare values(727, 'Skummet melk 1l tine', 9);
insert into vare values(728, 'Skuresvamp 10stk', 33);
insert into vare values(729, 'Smirnoff ice', 19);
insert into vare values(730, 'Smoot bendit 25cl bringeb', 15);
insert into vare values(731, 'Smoot. bendit 25cl ananas', 15);
insert into vare values(732, 'Smoot. bendit 25cl blåbær', 15);
insert into vare values(733, 'Smoot. bendit 75cl ananas', 15);
insert into vare values(734, 'Smoot.bendit 25cl mango o', 15);
insert into vare values(739, 'Smoothiesblanding 400g', 3);
insert into vare values(740, 'Smør kuvert 12g tine', 9);
insert into vare values(743, 'Smårettbacon duo 180g', 5);
insert into vare values(745, 'Smårettskinke duopk 180g', 5);
insert into vare values(747, 'Sol especial mexico 0,33l', 19);
insert into vare values(748, 'Solbærsaft red.sukker', 18);
insert into vare values(749, 'Solegg frittgående 6pk', 8);
insert into vare values(750, 'Solegg frittgående m/l 6p', 8);
insert into vare values(751, 'Solegg frittgående m/l/xl', 8);
insert into vare values(755, 'Soyaolje 0,5l mills', 23);
insert into vare values(756, 'Soyasaus less salt 150ml', 23);
insert into vare values(757, 'Spekeskinke 100g pk', 1);
insert into vare values(760, 'Spekeskinkesalat 215g', 40);
insert into vare values(761, 'Spelt lompe 8 pk ola-lomp', 38);
insert into vare values(764, 'Spesial loff', 36);
insert into vare values(766, 'Spinat 200g', 4);
insert into vare values(767, 'Spinat 450g Eldorado', 4);
insert into vare values(769, 'Sprite zero 0,5l fl', 30);
insert into vare values(773, 'Squash', 4);
insert into vare values(775, 'Steinbit filet 500g fm', 6);
insert into vare values(777, 'Storfe høyrygg benfri', 5);
insert into vare values(779, 'Storfe mørbrad skiver', 5);
insert into vare values(782, 'Sun 3 i 1 glass & tørk', 33);
insert into vare values(783, 'Sun extra power refill', 33);
insert into vare values(784, 'Sun maskinrens 120g', 33);
insert into vare values(785, 'Supergrov 100% 750g', 36);
insert into vare values(786, 'Sur sild 80g malaco', 14);
insert into vare values(787, 'Svin indrefilet hel', 5);
insert into vare values(788, 'Svin koteletter  natur.lv', 5);
insert into vare values(789, 'Svin nakkekotelett 4pk', 5);
insert into vare values(792, 'Svin ytrefilet', 5);
insert into vare values(793, 'Svineknoke lettsaltet', 5);
insert into vare values(797, 'Svisker 500g sun maid', 46);
insert into vare values(800, 'Sweet chili sauce 220ml', 23);
insert into vare values(801, 'Sweet chili saus 350g', 23);
insert into vare values(803, 'Sørlandschips himalaya', 14);
insert into vare values(804, 'Sørlands-is krokan 2l', 43);
insert into vare values(805, 'Taco sauce chunky wrap', 42);
insert into vare values(806, 'Taco sauce hot 230g', 42);
insert into vare values(814, 'Timian 5g pose Hindu', 21);
insert into vare values(815, 'Toalettpapir 8pk økonomi', 33);
insert into vare values(817, 'Toalettpapir hvit 12pk', 33);
insert into vare values(819, 'Toalettpapir mønstret 6pk', 33);
insert into vare values(821, 'Toalettpapir super long', 33);
insert into vare values(823, 'Tomat klase', 4);
insert into vare values(824, 'Tomater', 4);
insert into vare values(825, 'Tomater crushed polpa', 7);
insert into vare values(826, 'Tomater flådde økologisk', 7);
insert into vare values(827, 'Tomater hakkede m/hvitløk', 7);
insert into vare values(833, 'Tomatketchup hot chili', 23);
insert into vare values(834, 'Tomatpure 200g Eldorado', 7);
insert into vare values(835, 'Tomatpure tube 130g mutti', 7);
insert into vare values(837, 'Toppris 60g Freia', 32);
insert into vare values(838, 'Torky 1rl edet', 33);
insert into vare values(839, 'Torsk i purreløksaus', 2);
insert into vare values(840, 'Torskefilet', 6);
insert into vare values(841, 'Torskefilet 1700g', 6);
insert into vare values(842, 'Torskefilet 600g fm', 6);
insert into vare values(844, 'Torskefilet naturell 1kg', 6);
insert into vare values(845, 'Torskefilet pakket', 6);
insert into vare values(846, 'Torskenakke/ hale', 6);
insert into vare values(847, 'Tortilla 8pk First price', 42);
insert into vare values(848, 'Tortilla soft original', 42);
insert into vare values(849, 'Tortilla soft original 32', 42);
insert into vare values(850, 'Tortilla whole wheat', 42);
insert into vare values(851, 'Tynn&sprø havsalt', 14);
insert into vare values(852, 'Tyttebær 400g Nora', 37);
insert into vare values(853, 'Tørrgjær 5pk idun', 17);
insert into vare values(855, 'Universalhansker', 33);
insert into vare values(858, 'Valnøtter 70 g', 46);
insert into vare values(859, 'Vaniljesaus 0,5l Piano', 10);
insert into vare values(860, 'Vannkastanjer 227g', 7);
insert into vare values(862, 'Vg  mandag-torsdag', 26);
insert into vare values(864, 'Viltgryte 400g', 2);
insert into vare values(865, 'Viltgryte m/ris', 2);
insert into vare values(869, 'Vårløk Gartner', 4);
insert into vare values(870, 'Wheat noodles whole 250g', 42);
insert into vare values(871, 'Wienerpølse 520g go&mager', 5);
insert into vare values(872, 'Wokblanding 2,5kg', 4);
insert into vare values(873, 'Wrap tortilla original', 42);
insert into vare values(874, 'Yoghurt naturell 420g', 9);
insert into vare values(875, 'Yoghurt naturell 500g', 9);
insert into vare values(876, 'Zendium fresh&white', 27);
insert into vare values(877, 'Zendium tannkrem fresh', 27);
insert into vare values(878, 'Økologisk løk gul strømpe', 4);

insert into kunde values(0, 'Ukjent kunde', '0000');
insert into kunde values(1, 'Sveinung Fredly', '3907');
insert into kunde values(2, 'Lillian Solvik', '4003');
insert into kunde values(3, 'Even Gjermundsen', '4014');
insert into kunde values(4, 'Signe Bønsnes', '3909');
insert into kunde values(5, 'Laura Klokkerplassen', '3909');
insert into kunde values(6, 'Petter Thomassen', '3901');
insert into kunde values(7, 'Syver Bønsnes', '3909');
insert into kunde values(8, 'Søren Tvetenstrand', '4012');
insert into kunde values(9, 'Anders Eriksen', '4001');
insert into kunde values(10, 'Oluf Berg', '3909');
insert into kunde values(11, 'Bjarne Gustavsen', '4014');
insert into kunde values(12, 'Hilda Fuglesang', '4014');
insert into kunde values(13, 'Peder Kristoffersen', '3905');
insert into kunde values(14, 'Hanna Frøshaug', '4001');
insert into kunde values(15, 'Torvald Nilsen', '3909');
insert into kunde values(16, 'Nikolai Olsen', '3907');
insert into kunde values(17, 'Gudrun Abrahamsen', '4003');
insert into kunde values(18, 'Karen Strøm', '4012');
insert into kunde values(19, 'Emma Hval', '3907');