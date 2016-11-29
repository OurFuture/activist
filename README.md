# "Activist" (working title, we need a real title)
This is a web app to help people find opportunities to get involved in progressive events and organizations near them. It's built in Node+React+Redux+Express+Mongo. Contact Ian if you want to get involved.

# If you have Node + Mongo installed

First, you will need to make a `.env` file that looks like:

```
GOOGLE_MAPS_API_KEY=asdfasdfasdf
MONGODB_URI=mongodb://localhost/activist
SESSION_SECRET=asdfasdfasdf
SENDGRID_API_KEY=asdfasdfasdf
```

But replace "asdfasdfasdf" with your key/secret.

With Node 6 installed and MongoDB running locally:
1. `cd` into the project directory. 
2. Do `npm install` to install all dependencies
3. Do `npm start` or use `nodemon`. If you're changing the frontend stuff be sure to run `webpack -w` in another terminal window.

# Alternative: Docker
1. Install Docker
2. `cd` into the project directory
3. Set up the container with `docker build -t activist-app .`
4. Then do this (replace 'asdfasdf' with the real keys):

## TODO: the Docker-mongo connection is not working right now

```
# run the mongo container
docker run --name mongo-server -d mongo

# run the app on localhost:3000
# and connect that to the mongo container

# TODO: this doesn't actually work!

docker run -it \
--name activist-app-instance \
--link mongo-server:mongo \
-e GOOGLE_MAPS_API_KEY='asdfadf' \
-e MONGODB_URI='mongodb://localhost/activist' \
-e SESSION_SECRET='asdfasdf' \
-e SENDGRID_API_KEY='asdfasdf' \
-p 3000:3000 \
activist-app
```
