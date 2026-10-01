// use mock data for one card

const movie = { title: "The Matrix", year: 1999, genres: ["Action", "Sci-Fi"], rating: 8.7 };

addPage('Example', [movie]);

const favorite_movie = {
    title: 'Back to the future',
    year: '1985',
    genres: ['Science Fiction'],
    rating: '4.2'
}

addPage('Favorite movie', [favorite_movie] )

async function start() {
//use database in js
const SQL = await initSqlJs({
    locateFile: file => `vendor/${file}`
});

//open db file
const response = await fetch('movies.db');
const bytes = await response.arrayBuffer();
const db = new SQL.Database(new Uint8Array(bytes));

//problem1
addPage('Problem 1', db.exec(`
    SELECT title,year FROM movies WHERE year = 2000 ORDER BY title LIMIT 12;
`));

//problem2
addPage('Problem 2', db.exec(`
    SELECT title, rating
    FROM movies
    Where genres LIKE '%Comedy%'
    ORDER BY rating DESC
    LIMIT 5;
`));

//problem3
addPage('Problem 3', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE genres LIKE '%Horror%'
      AND rating_count >= 20
    ORDER BY rating DESC, title, id
    LIMIT 5;
`))

//problem4
addPage('Problem 4', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE year = 2000 AND genres LIKE '%Comedy%'
    ORDER BY title, id
    LIMIT 8;
`))

//problem5
addPage('Problem 5', db.exec(`
    SELECT title, year, rating, rating_count
    FROM movies
    WHERE genres LIKE '%Horror%'
      AND year >= 2010
      AND rating_count >= 20
    ORDER BY year DESC, title, id
    LIMIT 5;
`))

//problem6
addPage('Problem 6', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE year < 1990
      AND rating >= 4
      AND rating_count >= 50
    ORDER BY rating DESC, title, id
    LIMIT 10;
`))

//problem7
addPage('Problem 7', db.exec(`
    SELECT title, genres, rating
    FROM movies
    WHERE genres LIKE '%Horror%'
      AND genres LIKE '%Comedy%'
      AND rating_count >= 10
    ORDER BY rating DESC, title, id
    LIMIT 5;
`))

//problem8
addPage('Problem 8', db.exec(`
    SELECT title, year, rating_count
    FROM movies
    WHERE year BETWEEN 2000 AND 2009
      AND rating_count >= 50
    ORDER BY rating_count DESC, title, id
    LIMIT 5;
`))
//close db
db.close();

}

start().catch(showError);
