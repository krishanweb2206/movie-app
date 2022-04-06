
import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_SEARCH_RESULT,
  ADD_MOVIE_TO_LIST,
} from "../actions";

const initialMovieState = {
    list:[],
    favourites:[],
    showFavourites:false
}

const initialSearchState = {
  result: {},
  showSearchResult: false,
};

const initialRootState = {
  movies:initialMovieState,
  search:initialSearchState
}


export  function movies(state = initialMovieState, actions) {
    
  // if (actions.type === "ADD_MOVIES") {
  //   return{ 
  //         ...state,
  //       list:actions.movies
  //   };
  // }

  // return state;

  switch (actions.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: actions.movies,
      };

    case ADD_FAVOURITES:
      return {
        ...state,
        favourites: [actions.movie, ...state.favourites],
      };

    case REMOVE_FROM_FAVOURITES:
      const filteredarray = state.favourites.filter(
        (movie) => movie.Title !== actions.movie.Title
      );

      return {
        ...state,
        favourites: filteredarray,
      };

    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: actions.val,
      };
    case ADD_MOVIE_TO_LIST:
        return{
            ...state,
            list:[actions.movie,...state.list]
        }

    default:
      return state;
  }
}

export function search (state = initialSearchState,actions){
  
   switch (actions.type) {
     case ADD_SEARCH_RESULT:
       return {
         ...state,
         result: actions.movie,
         showSearchResult: true,
       };
     case ADD_MOVIE_TO_LIST:
       return {
         ...state,
         showSearchResult: false,
       };
     default:
       return state;
   }
}

/*
export default function rootReducer (state = initialRootState,actions){
  return {
    movies:movies(state.movies,actions),
    search:search(state.search ,actions)
  }
}
*/

export default combineReducers({
  movies:movies,
  search:search
})

