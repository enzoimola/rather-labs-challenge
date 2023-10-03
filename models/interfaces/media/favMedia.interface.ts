export interface IFavMedia {
    id: number;
    uid: string;
    isFav: boolean
}

export interface IFavsUser {
    id: number;
}

export interface IAddFavMediaResponse {
    success: boolean;
}
