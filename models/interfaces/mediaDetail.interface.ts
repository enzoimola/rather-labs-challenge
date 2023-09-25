export interface IMediaDetail {
    id: number;
    title: string;
    poster_image: string;
    release_date: string;
    overview: string;
    genres: [IGenres];
    productionCompanies : [IProductionCompanies]
    tagline: string,
}

interface IGenres {
    id: number;
    name: string;
}

interface IProductionCompanies {
    id: number,
    name: string,
    logo_path: string,
    origin_country: string
}
