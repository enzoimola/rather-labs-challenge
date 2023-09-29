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

export const FETCH_DETAIL_MEDIA = (idMedia, isMovie) => gql`
    query {
      detailMedia (id:${idMedia},isMovie: ${isMovie} ) {
        id,
        name,
        posterPath
        releaseDate,
        voteAverage,
        overview,
        tagline
      }
    }
`;

export const FETCH_FAVORITES_MEDIA = (uid) => gql`
    query {
      getFavorites(uid:"${uid}")  {
        id
      }
    }
`;

export const FETCH_URL_MEDIA = gql`
    query {
      getURLMedia {
        id
        homepage
      }
    }
`;