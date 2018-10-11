# MongoDB Comments (REST API) Server

## Live demo: https://example.com/
This is a simple example of a Back-End that takes requests from a client and returns data stored in a Mongo database back to the client. In this example the comments of various users are stored and retrieved from mLab.

This project is primarily intended to illustrate getting and fetching data from a MongoDB.

## Development server

Run `npm start` for a dev server. The API server will be available at `http://localhost:8080/` for your front-end to contact. The server will automatically reload if you change any of the source files.

# Live Deployment

## If deploying to Heroku...

Since this project is part of a multi-app git repository, deploying to something like Heroku can be difficult since it does not support pushing from a non-root directory. The following steps explain how to get around this...

- Create the Heroku app.
- Add the buildpack (in this case node.js).
- Now instead of `git push heroku master` we use `git subtree` to only push a subdirectory of the repo like so `git subtree push --prefix <sub-directory> heroku master`
- Run this command from the root dir to push this app to heroku `git subtree push --prefix api-server heroku master`

## Setting Cross Origin Resource Sharing (CORS)

If you intend to host this server on a different domain than the Front-End, be sure to set the CORS options in `server.js`. Point the `hostUrl` to your Front-End's domain url.

## Server Host & Port ENV variables

Be sure to set ENV vars to point to your Server's Host domain and port based on whatever hosting provider you deploy this server to (Heroku). The default host is `localhost`. The default port is `8080`.
