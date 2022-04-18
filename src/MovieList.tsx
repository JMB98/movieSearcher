import {ImdbSearchMovie} from "./imdb/domain-model";
import {Dictionary} from "./types";
import {Movie} from "./Movie";

export interface MovieListProps {
    movies: ImdbSearchMovie[];
}

export function MovieList({movies}: MovieListProps) {
    const uniqueYears = movies.reduce((prev, movie) => prev.add(movie.Year), new Set<string>([]));
    const uniqueYearsSorted = Array.from(uniqueYears).sort();
    const moviesGroupedByYear = groupMoviesByYear(movies, uniqueYears);

    return <div>
        {uniqueYearsSorted.map(year => {
            let moviesFromYear = moviesGroupedByYear[year];
            if (moviesFromYear != null) {
                return <div key={year}>
                    <h1 className={'movies-year'}>{year}</h1>
                    <div className="movieList">
                        {moviesFromYear.map(movie => <Movie key={movie.imdbID} movie={movie}/>)}
                    </div>
                </div>
            }
        })}
    </div>

}

function groupMoviesByYear(movies: ImdbSearchMovie[], uniqueYears: Set<string>) {
    const moviesGroupedByYear: Dictionary<ImdbSearchMovie[]> = {};
    uniqueYears.forEach(year => moviesGroupedByYear[year] = []);
    movies.forEach(movie => moviesGroupedByYear[movie.Year].push(movie));

    return moviesGroupedByYear;

}