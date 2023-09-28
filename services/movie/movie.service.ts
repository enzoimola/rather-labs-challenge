import { IFavMedia } from '@/models/interfaces/favMedia.interface';

export const saveFavorite = async (media: IFavMedia, isMovie:boolean) : Promise<void> => {
        try {
            const body = {
                [media.id]: media.markAsFav,
                isMovie,
            };

            const response = await fetch('http://localhost:8080/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                 const data = await response;
                return data;
            }

             return response.status;
        } catch (error) {
            return error;
        }
};
