# Media Sharing app example REST API application

## Installation

1. Clone
2. Run `npm install`
3. Create database
4. Create .env file (see `.env.sample`)

## Run

1. Run `npm run dev`

# API Documentation

## Likes

### Endpoints

#### GET `/api/likes/media/:id`
Fetches all likes for a specific media item.

#### GET `/api/likes/user/:id`
Fetches all likes given by a specific user.

#### POST `/api/likes`
Allows a user to like a media item.

#### DELETE `/api/likes/:id`
Allows a user to remove a like.

---

## Comments

#### GET `/api/comments/media/:id`
Fetches all comments for a specific media item.

#### POST `/api/comments`
Allows a user to comment on a media item.

#### DELETE `/api/comments/:id`
Allows a user to delete their comment.

---

## Ratings

#### GET `/api/ratings/media/:id`
Fetches all ratings for a specific media item.

#### POST `/api/ratings`
Allows a user to rate a media item.

#### PUT `/api/ratings/:id`
Allows a user to update their rating.

#### DELETE `/api/ratings/:id`
Allows a user to delete their rating.
