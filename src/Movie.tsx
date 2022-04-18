import {ImdbSearchMovie} from "./imdb/domain-model";
import NotFoundImg from './assets/notFound.png'

export interface MovieProps {
    movie: ImdbSearchMovie;
}

export function Movie({movie}: MovieProps) {
    const {Title, Poster, imdbID} = movie

    return <div className={'movie-container'}>
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
            <img className={'movie-img'} src={Poster != 'N/A' && Poster || NotFoundImg} alt={Title} title={Title}/>
        </a>

        <a className={'movie-title'} href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
            {Title}
        </a>
    </div>


}