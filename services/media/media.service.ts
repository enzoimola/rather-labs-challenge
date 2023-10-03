import { IAddFavMediaResponse, IFavMedia } from '@/models/interfaces/media/favMedia.interface';
import { IUser } from '@/models/interfaces/user/user.interface';
import { ADD_FAVORITE_MEDIA_MUTATION, CREATE_USER_MUTATION } from '@/graphql/queries';
import { ICreateUserResponse } from '@/models/interfaces/user/createUserResponse.interface';

export const createUser = async (input: IUser): Promise<ICreateUserResponse> => {
    const response = await fetch(process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: CREATE_USER_MUTATION,
            variables: { input },
        }),
    });

    if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        return data.data.createUser; // Return the specific data you need
    }

    return { email: '' };
};

export const saveFavorite = async (
    media: IFavMedia): Promise<IAddFavMediaResponse> => {
    const response = await fetch(process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: ADD_FAVORITE_MEDIA_MUTATION,
            variables: { media },
        }),
    });

    if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        return data.data.addFavMedia; // Return the specific data you need
    }

    return { success: false };
};
