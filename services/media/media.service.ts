import { IFavMedia } from '@/models/interfaces/favMedia.interface';
import { IUser } from '@/models/interfaces/user/user.interface';

export const createUser = async (input: IUser): Promise<void> => {
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

export const getUser = async (uid: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:8080/user/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const json = await response.json();
            return json;
        }

        return response.status;
    } catch (error) {
        return error;
    }
};

export const saveFavorite = async (
    media: IFavMedia): Promise<void> => {
    try {
        const body = { id: media.id, uid: media.uid, isFav: media.isFav };

        const response = await fetch('http://localhost:8080/add-favorite', {
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
