import React from "react";
import ReactDOM from "react-dom";
import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard"
import {addMovies,setShowFavourite} from '../actions'
// import {StoreContext} from '../index'
// import {connect} from '../index';
import {connect} from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    // real worl scenario make an api call for data and dispatch the actions to store
    // const { store } = this.props;

    // Even if send a action i.e data but not visible on page because update is not done .here we forcefully update but not in use
    // store.subscribe(() => {
    //   console.log("UPDATE A STATE");
    //   this.forceUpdate();
    // }); App will handle the subscribe in connect

    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  ChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  }

  render() {
    const { movies, search } = this.props;

    const { list, favourites, showFavourites } = movies; //{movies:{},search:{}}
    // console.log("RENDER", this.props.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />

        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.ChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.ChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!!</div>
          ) : null}
        </div>
      </div>
    );
  }
}
//app wrapper to use context inside app everywhere
// class AppWrapper extends React.Component{

//   render(){

//     return(
//       <StoreContext.Consumer>
//         {(store)=> <App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

// Connect a store with want these properties as props in App component
function maptoState(state){
  return {
    movies: state.movies,
    search: state.search,
  };
}

const connectComponent = connect(maptoState)(App);
// export default AppWrapper;
export default connectComponent;
