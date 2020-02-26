create schema alphaproject_prod;

create table alphaproject_prod.users(
	user_id serial,
	username VARCHAR not null unique,
	first_name VARCHAR not null,
	last_name VARCHAR not null,
	email varchar not null unique,
	password varchar not null,
	primary key(user_id)
);

create table alphaproject_prod.users_stocks(
	user_id INTEGER references alphaproject_prod.users(user_id),
	stocksymbol VARCHAR not null,
	current VARCHAR not null,
	high VARCHAR not null,
	low VARCHAR not null,
	timestamp timestamp default current_timestamp
);
