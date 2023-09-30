export interface IMediaDetail {
    id: number;
    name: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    overview: string;
    tagline: string;
    actors: Array<ICastMember>;
}

export interface ICastMember {
    id: string;

    name: string;

    character: string;

    knowForDepartment: string;

    popularity: number;
    profilePath: string;
}
