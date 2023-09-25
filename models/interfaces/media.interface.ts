export interface IMedia {
    id: number
    title: string
    poster_image: string
    release_date: string
    overview: string
    rating?: [IRating]

}

interface IRating {

}
