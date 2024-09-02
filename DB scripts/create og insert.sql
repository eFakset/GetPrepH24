USE gph24;
DROP TABLE IF EXISTS kommune;
DROP TABLE IF EXISTS fylke;

CREATE TABLE fylke (
  fylke_nr char(2) NOT NULL,
  fylke_nv varchar(255) NOT NULL,
  PRIMARY KEY (fylke_nr)
);

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

insert into fylke values ('03', 'Oslo');
insert into fylke (fylke_nr, fylke_nv) values ('39', 'Vestfold');
insert into fylke (fylke_nr, fylke_nv) values ('40', 'Telemark');
insert into kommune values ('3901', 'Horten', '39');
insert into kommune values ('3903', 'Holmestrand', '39');
insert into kommune values ('3905', 'Tønsberg', '39');
insert into kommune values ('3907', 'Sandefjord', '39');
insert into kommune values ('3909', 'Larvik', '39');
insert into kommune values ('3911', 'Færder', '39');

insert into kommune values 
('4001', 'Porsgrunn', '40'),
('4003', 'Skien', '40'),
('4005', 'Notodden', '40'),
('4012', 'Bamble', '40'),
('4014', 'Kragerø', '40'),
('4016', 'Drangedal', '40');