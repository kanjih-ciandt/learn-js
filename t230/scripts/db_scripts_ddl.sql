CREATE SCHEMA `node-complete`;

USE `node-complete`;

create table products
(
    id          int unsigned auto_increment
        primary key,
    title       varchar(255) not null,
    price       double       not null,
    description text         not null,
    imageUrl    varchar(255) not null,
    constraint id_Unique
        unique (id)
);

