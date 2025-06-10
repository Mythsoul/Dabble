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
  comments JSONB[] NOT NULL
);


-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'like', 'comment', 'follow', etc.
    content TEXT NOT NULL,
    from_user_id UUID REFERENCES users(id),
    post_id UUID REFERENCES posts(id),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks table
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    post_id UUID NOT NULL REFERENCES posts(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);
