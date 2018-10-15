# MongoDB Comments - (REST API) Server

![Preview](https://github.com/dieharders/example-mongo-comments/blob/master/preview-2.JPG)

## Live demo: https://example-mongo-comments-client.firebaseapp.com/

This is a simple example of a Back-End (using Node.js & Express.js) that takes requests from a client and returns data stored in a cloud Mongo database back to the client. In this example the comments of various users are stored and retrieved from mLab.

This project is primarily intended to illustrate getting and fetching data from a MongoDB. It does the following:

- Stores/Retrieves comments from external MongoDB service (mLab)
- Increments a 'like' counter associated with each comment
- Records the internet (UTC) time for each comment upon addition
- Assigns a random name and avatar (emoji) for each comment added

** Also note, there are initial comments stored in the server which are used to overwrite those in the MongoDB each time the server is spun up. If you do not want this feature and want the comments to persist, then remove the code under the `exports.initial` function in `comment.controller.js`.

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

If you intend to host this server on a different domain than the Front-End, be sure to set the CORS options in `server.js`. Add an environment variable `CLIENT` to point the `hostUrl` to your Front-End's domain url.

## Server Host & Port ENV variables

Be sure to set ENV vars to point to your Server's Host domain and port based on whatever hosting provider you deploy this server to (Heroku). The default host is `localhost`. The default port is `8080`.
