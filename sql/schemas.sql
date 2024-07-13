CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.users (
   email VARCHAR(50),
   password VARCHAR(255) NOT NULL,
   PRIMARY KEY(email)
);

CREATE TABLE IF NOT EXISTS app.video (
   id VARCHAR(50),
   email VARCHAR(50) NOT NULL,
   title TEXT,
   description TEXT,
   create_at TIMESTAMP NOT NULL,
   PRIMARY KEY(id),
   CONSTRAINT fk_video_to_users
      FOREIGN KEY(email) 
	      REFERENCES app.users(email)
);
