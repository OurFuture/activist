# "Activist" (working title, we need a real title)
This is a web app to help people find opportunities to get involved in progressive events and organizations near them. It's built in Node+React+Redux+Express+Mongo. Contact Ian if you want to get involved.

# Project setup

You will need to copy `example.env` to `.env`:

```
cp example.env .env
```

Now edit `.env` with your API keys and session secret.

# Running the web app

Once the webapp is running you can view it at http://localhost:3000

## With Node + Mongo installed

With Node 6 installed and MongoDB running locally:

1. `cd` into the project directory.
2. Do `npm install` to install all dependencies
3. Do `npm start` or use `nodemon`. If you're changing the frontend stuff be sure to run `webpack -w` in another terminal window.

## With Docker
1. Install Docker and Docker Compose
2. `cd` into the project directory
3. Build the docker image with `docker-compose build`
4. Run the app with `docker-compose up -d`
5. Stop the app with `docker-compose down`
