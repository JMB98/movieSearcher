export interface ImdbSearch {
    Search?: ImdbSearchMovie[];
    totalResults?: number;
    Response: boolean;
    Error: string;
}

export interface ImdbSearchMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: mediaType;
    Poster: string;
}

export type mediaType = "movie" | "series" | "episode";