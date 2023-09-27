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

export const FETCH_DETAIL_MEDIA = (idMedia) => gql`
            query {
              detailMedia (id:${idMedia},isMovie: true ) {
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