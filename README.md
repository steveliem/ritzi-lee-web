# ritzi-lee-web

A barebones Java app, which can easily be deployed to Heroku.

## Running Locally

Make sure you have Java and Maven installed.  Also, install the [Heroku CLI](https://cli.heroku.com/).

```sh
$ git clone https://git.heroku.com/ritzilee.git
$ cd ritzi-lee-web
$ mvn clean install
$ heroku local:start
```
You can also use the normal Spring Boot start routine

```
$ cd ritzi-lee-web
$ mvn clean install
$ mvn spring-boot:run
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

If you're going to use a database, ensure you have a local `.env` file that reads something like this:

```
DATABASE_URL=postgres://localhost:5432/java_database_name
```

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Java on Heroku, see these Dev Center articles:

- [Java on Heroku](https://devcenter.heroku.com/categories/java)
