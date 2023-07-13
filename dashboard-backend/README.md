# Dashboard Backend

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