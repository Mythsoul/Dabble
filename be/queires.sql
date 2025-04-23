-- Session table : > 
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


-- Users table : > 
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);



-- Posts table : > 
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL,
  image_url VARCHAR(255),
  likers_id UUID[] NOT NULL,
  comments JSONB[] NOT NULL,

  
);
