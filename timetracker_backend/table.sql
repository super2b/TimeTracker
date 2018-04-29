create table task(
    t_id bigint(20) primary key auto_increment,
    t_name varchar(128) not null,
    t_desc varchar(512),
    t_status int not null default '0',
    create_time datetime not null default now(),
    update_time datetime not null default now()
) DEFAULT CHARSET=utf8;

create table access_token(
    t_id  bigint(20) primary key auto_increment,
    accesstoken varchar(128) not null,
    access_token_expiresat datetime not null,
    scope varchar(512),
    client_id bigint(20) not null,
    user_id bigint(20),
    create_time datetime not null default now(),
    update_time datetime not null default now()
)

create table authorization_code(
    c_id bigint(20) primary key auto_increment,
    code varchar(128) not null,
    access_token_expiresat datetime not null,
    redirec_uri varchar(1024),
    client_id bigint(20) not null,
    user_id bigint(20) not null,
    create_time datetime not null default now(),
    update_time datetime not null default now()
)

create table client(
    client_id bigint(20) primary key auto_increment,
    client_secret varchar(512),
    redirect_uri varchar(1024),
    grants varchar(512),
    create_time datetime not null default now(),
    update_time datetime not null default now()
)

create table refresh_token(
    t_id bigint(20) primary key auto_increment,
    refresh_token varchar(128) not nll,
    refresh_token_expiresat datetime not null,
    scope varchar(512),
    client_id bigint(20),
    user_id bigint(20),
    create_time datetime not null default now(),
    update_time datetime not null default now()
)

create table user(
    u_id bigint(20) primary key auto_increment,
    name varchar(32),
    hashed_password varchar(128),
    password_reset_token varchar(128),
    refresh_token_expiredat datetime not null,
    age int,
    first_name varchar(32),
    last_name varchar(32),
    last_sign_at datetime,
    create_time datetime not null default now(),
    update_time datetime not null default now()
)