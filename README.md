# "Activist" (working title, we need a real title)
This is a web app to help people find opportunities to get involved in progressive events and organizations near them. It's built in Node+React+Redux+Express+Mongo. Contact Ian if you want to get involved.

# Project setup

You will need to copy `example.env` to `web-variables.env`:

```
cp example.env web-variables.env
```

Now edit `web-variables.env` with your API keys and session secret.

# Running everything with Docker-Compose
1. Install Docker and Docker Compose
2. `cd` into the project directory
3. Build the docker image with `docker-compose build`
4. Run the app with `docker-compose up -d`
5. Stop the app with `docker-compose down`

# Running the web app

Once the webapp is running you can view it at http://localhost:3000

## Making updates to React code

You must run webpack yourself to build a new bundle.js when you change React code. Eg, have this running in its own terminal: `NODE_ENV=development webpack -w`.

This will allow you to save a change to React code, and just refresh your browser to see the change. docker-compose's `volume` will track the changes without requiring you to rebuild or restart Docker.

(Maybe we'll set up hot reloading in the future...)