create database c4board_db;
use c4board_db;

create table user(
	us_id int auto_increment,
    us_username varchar(30) not null,
    us_password varchar(30) not null,
    primary key(us_id)
);

insert into user (us_username, us_password) values
('pedro', 'pedro123'),
('maria', 'maria123'),
('alexCampeon', 'alexCampeon123'),
('superUser', 'superUser123'),
('secretAgent', 'secretAgent123'),
('melany', 'melany123'),
('yasuri', 'yasuri123'),
('theWorld', 'theWorld123'),
('angelica', 'angelica123');

select * from user;