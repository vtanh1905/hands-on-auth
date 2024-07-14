-- Create 'app' schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS app;

-- Create 'app.users' table
CREATE TABLE IF NOT EXISTS app.users (
   id SERIAL PRIMARY KEY,
   email VARCHAR(50),
   password VARCHAR(255) NOT NULL
);

-- Create 'app.video' table
CREATE TABLE IF NOT EXISTS app.video (
   id VARCHAR(50),
   user_id INTEGER NOT NULL,
   title TEXT,
   description TEXT,
   create_at TIMESTAMP NOT NULL,
   PRIMARY KEY(id),
   CONSTRAINT fk_video_to_users
      FOREIGN KEY(user_id)
         REFERENCES app.users(id)
);