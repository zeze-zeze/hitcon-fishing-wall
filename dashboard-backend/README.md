# Dashboard Backend

## Quick Start

```sh
# build frontend
cd ../dashboard-frontend
yarn
yarn build
cd ../dashboard-backend

# install backend dependency
npm install

# remove existing database
rm prisma/dev.db

# set db path environment variable
# windows
# set DATABASE_URL="file:./dev.db"
# linux
export DATABASE_URL="file:./dev.db"

# create db
npm run db:init

# start dev server
# windodws
# npm run dev:win
# linux
npm run dev
# or with production environment
# npm run start
```

## Environment

Make sure the environment variables are set, or create `.env` file in the this directory, which will be loaded automatically.

```sh
# required
DATABASE_URL="file:./dev.db"

# optional
PORT="5002"
NODE_ENV="production"
API_KEY="xxx"
```

## Database

Model schema is defined in `prisma/schema.prisma`.

To update database after modifing the schema file:

- Remove old `prisma/dev.db`
- Run `npx prisma db push` to create database file

## Docs

`docs/swagger.json` is updated automatically when dev server is running.

Run `npm run build:docs` to update `docs/swagger.json` manually.
