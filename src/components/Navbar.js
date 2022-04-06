import React from "react";
import ReactDOM from "react-dom";
// import { connect } from "../index";
import {addMovieToList,handleMovieSearch} from '../actions'
import { connect } from "react-redux";


class Navbar extends React.Component {

  constructor(props){
      super(props);
      this.state={
          searchText:''
      }
  }

  handleAddToMovie =(movie)=>{
    this.props.dispatch(addMovieToList(movie));
    this.setState({
        showSearchResult:false
    })
  }

  handleSearch = () =>{
      const {searchText} = this.state;
      this.props.dispatch(handleMovieSearch(searchText));
  }

  handleChange=(e)=>{
    this.setState({
      searchText:e.target.value
    })
  }

  render() {
    const { result, showSearchResult } = this.props.search;

    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>Search</button>

          {showSearchResult && 
            <div className="search-results">
              <div className="search-result">
                  <img src={result.Poster} alt="seacrh-pic"/>
                 <div className="movie-info">
                    <span>{result.Title}</span>
                    <button onClick={()=>this.handleAddToMovie(result)}>
                      Add to Movies
                    </button>
                  </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

// Using a connect for connecting the store so need a wrapper class
 /*class NavWrapper extends React.Component{

  render(){

    return (
      <StoreContext.Consumer>
        {(store) => <Navbar dispatch={store.dispatch} search ={this.props.search}/>}
      </StoreContext.Consumer>
    );
  }
}*/

function mapToState(state){
  return {
    search:state.search
  }
}

export default connect(mapToState)(Navbar);
