import {useState} from "react";
import {MovieList} from "./MovieList";
import {ImdbSearch, ImdbSearchMovie} from "./imdb/domain-model";
import {IMDB_URL_WITH_API_KEY} from "./App";
import {SearchBar} from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";

export function Home() {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [warning, setWarning] = useState<string | undefined>(undefined);
    const [movies, setMovies] = useState<ImdbSearchMovie[] | undefined>(undefined);
    const [type, setType] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setWarning(undefined);
        setIsLoading(true);
        setMovies(undefined);
        const response = await fetch(`${IMDB_URL_WITH_API_KEY}&s=${title}&type=${type}`)
        const data: ImdbSearch = await response.json();
        if (data.Error != null && data.Error.length > 0) {
            setIsLoading(false);
            setWarning(data.Error);
        }
        if (data.totalResults && data.Search) {
            let pageIndex = 2;
            let allMovies = data.Search;
            while (pageIndex * 10 < data.totalResults) {
                allMovies = await loadPage(pageIndex, allMovies);
                pageIndex++;
                setMovies(allMovies);
            }
            setIsLoading(false);
        }
    }

    const loadPage = async (page: number, allMovies: ImdbSearchMovie[]) => {
        const response = await fetch(`${IMDB_URL_WITH_API_KEY}&s=${title}&type=${type}&page=${page}`)
        const data: ImdbSearch = await response.json();
        if (data.Search) {
            return allMovies.concat(data.Search);
        }
        return allMovies;
    }

    const onSearch = () => {
        if (title != null && title.length > 0) {
            loadData();
        } else {
            setWarning("Please set a title to search for")
            setMovies(undefined);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            onSearch();
        }
    }

    return (
        <div>
            <SearchBar title={title || ""}
                       setTitle={setTitle}
                       setType={setType}
                       onKeyDown={handleKeyDown}
                       onSubmit={onSearch}/>

            {isLoading && <LoadingSpinner/>}
            {warning && <div className="warning"> {warning}</div>}
            {movies && <MovieList movies={movies}/>}
        </div>
    );
}