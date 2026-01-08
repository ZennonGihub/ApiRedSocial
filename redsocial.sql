CREATE DATABASE IF NOT EXISTS redsocial;
USE redsocial;

create table post_states (
  id integer primary key auto_increment,
  name varchar(30)
);

create table users (
     id integer primary key auto_increment,
     username varchar(55) not null unique,
     description varchar(255) default null,
     created_at timestamp not null default CURRENT_TIMESTAMP,
     updated_at timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
);

create table auth (
    user_id integer primary key,
    password_hash varchar(255) not null,
    email varchar(100) not null unique,
    updated_at timestamp not null default CURRENT_TIMESTAMP,
    CONSTRAINT fk_userAuth FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

create table follows (
  follow_to integer not null,
  follow_from integer not null,
  primary key(follow_from, follow_to),
  CONSTRAINT fk_userFollowTo FOREIGN KEY (follow_to) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_userFollowFrom FOREIGN KEY (follow_from) REFERENCES users(id) ON DELETE CASCADE
);

create table posts (
  id integer primary key auto_increment,
  title varchar(100) not null,
  body text not null,
  post_state_id integer not null,
  user_id integer not null,
  created_at timestamp not null default CURRENT_TIMESTAMP,
  updated_at timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,

  CONSTRAINT fk_userPost FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_postState FOREIGN KEY (post_state_id) REFERENCES post_states(id) ON DELETE CASCADE
);

create table post_likes (
  user_id integer not null,
  post_id integer not null,
  primary key (post_id, user_id),
  CONSTRAINT fk_userLikePost FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_likePost FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

create table comments (
  id integer primary key auto_increment,
  content text not null,
  user_id integer not null,
  post_id integer not null,
  created_at timestamp not null default CURRENT_TIMESTAMP,

  CONSTRAINT fk_userComment FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_commentPost FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

create table comment_likes (
  user_id integer not null,
  comment_id integer not null,
  primary key (user_id, comment_id),
  CONSTRAINT fk_userLikeComment FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_commentLike FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
