## About this project

This project for lab and interview.

## Getting Started

First, install dependencies:

```bash
# npm
npm install
# yarn
yarn
```

Second, run docker container:

```bash
# first time run
docker-compose up -d --build
# already have container
docker-compose up -d
```

Thirdly, generate SQL files, migrate and seed data:

```bash
# generate database schema
npm run db:generate

# migrate db
npm run db:migrate

# seed mock data to db
npm run db:seed
```

## Web usage

open [http:localhost:3000](http:localhost:3000)

go to signup then signin it will redirect to home page and play with it.

- Signup page: [http:localhost:3000/signup](http:localhost:3000/signup)
- Signin page: [http:localhost:3000/signin](http:localhost:3000/sugnin)
- Home page: [http:localhost:3000](http:localhost:3000) _protected route_

- Offset pagination
- Sort by postedAt _DESC_ or _ASC_
- Click tag to filter by tag

## Test

```bash
npm run test
```

## Check list

- [x] Front-end & back-end [**Nextjs14**](https://orm.drizzle.team/)
- [x] Typescript
- [x] Database **Postgresql**
- [x] Database ORM [**Drizzle**](https://orm.drizzle.team/)
- [x] Dockerfile & Docker-compose
- [x] Javascript test [**vitest**](https://vitest.dev/)

### Postgresql Database with drizzle ORM

- [x] Post table schema
- [x] User table schema
- [x] Database migration
- [x] Database seeding

### Web functionality with Nextjs, Next-auth & tailwindCss

- [x] Sign-in
- [x] Sign-up
- [x] Render posts
- [x] Render post detail
- [x] Sort by postedAt date
- [x] Filter by tags (click a tag on card)
- [x] Search by title & postedBy
