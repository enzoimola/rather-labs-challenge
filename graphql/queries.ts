import { gql } from '@apollo/client';

export const FETCH_MEDIA = gql`
  query {
  media  {
    id,
    name,
    posterPath,
    releaseDate,
    voteAverage,
    isMovie
  }  }
`;

export const FETCH_DETAIL_MEDIA = (idMedia: string, isMovie: boolean) => gql`
    query {
      detailMedia (id:${idMedia},isMovie: ${isMovie} ) {
        id
        name
        posterPath
        releaseDate
        voteAverage
        overview
        tagline
        homepage
        actors {
          id
          name
          character
          knowForDepartment
          popularity
          profilePath
        }
      }
    }
`;

export const FETCH_FAVORITES_MEDIA = (uid: string) => gql`
    query {
      getFavorites(uid:"${uid}")  {
        id
      }
    }
`;

export const CREATE_USER_MUTATION = gql`
   mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
    }
  }
`;

export const ADD_FAVORITE_MEDIA_MUTATION = gql`
    mutation AddFavMedia($media: FavMedia!) { 
        addFavMedia(media: $media) { 
            success 
        } 
    }
`;
