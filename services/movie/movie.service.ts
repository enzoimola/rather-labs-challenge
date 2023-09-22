import { IMedia } from '@/models/interfaces/media.interface';

const mediaDataParser = (data: Array<any>): Array<IMedia> => data.map(m => {
    console.log(m);
    return {
        id: m.id,
        name: m.name || m.original_name || m.title || m.original_title,
    };
});

export const fetchMedia = async (search?: string): Promise<Array<IMedia>> => {
    const getAllURL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const searchURL = (_search: string) => `https://api.themoviedb.org/3/search/multi?query=${_search}&include_adult=false&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8',
        },
    };

    const response = await fetch(search ? searchURL(search) : getAllURL, options);
    const json = await response.json();

    return mediaDataParser(json.results);
};
