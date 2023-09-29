import { IFavMedia } from '@/models/interfaces/favMedia.interface';
import { IUser } from '@/models/interfaces/user/user.interface';

export const createUser = async (input: IUser) : Promise<void> => {
    try {
        const response = await fetch('http://localhost:8080/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
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

export const checkUser = async (email: IUser) : Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
