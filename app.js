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
addPage('problem 3', db.exec(`
    SELECT title,year, rating
    FROM movies
    WHERE genres LIKE '%Horror%' AND rating_count > 19
`))

//problem4
addPage('problem 4', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE year = 2000 AND genres LIKE '%Comedy%'
    ORDER BY title, id
    LIMIT 8;
`))

//problem5
addPage('problem 5', db.exec(`
    SELECT title, year, rating FROM movies WHERE year = 2010 OR year > 2010 ORDER BY title LIMIT 12
    FROM movies
    WHERE genres LIKE '%Horror%' AND year < 1990
    ORDER BY rating DESC
    LIMIT 10;
`))

//problem6
addPage('problem 6', db.exec(`
    SELECT title, year, rating
    FROM movies WHERE year < 1990
    ORDER BY rating DESC
    LIMIT 4;
`))

//problem7
addPage('problem 7', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE genres LIKE '%Horror & Comedy%' AND rating > 10.0
    ORDER BY rating DESC
    LIMIT 5;
`))

//problem8
addPage('problem 8', db.exec(`
    SELECT title, year, rating
    FROM movies
    WHERE genres LIKE '%Adventure%' AND year BETWEEN 2000 AND 2009
    ORDER BY rating DESC
    LIMIT 5;
`))
//close db
db.close();

}

start().catch(showError);
