create table task(
    id int primary key auto_increment,
    t_name varchar(128) not null,
    t_desc varchar(512),
    t_status int not null default '0',
    create_time datetime not null default now(),
    update_time datetime not null default now()
) DEFAULT CHARSET=utf8;