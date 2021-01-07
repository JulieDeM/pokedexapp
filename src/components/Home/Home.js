import React from 'react';
import Pokemon from '../Pokemon/Pokemon.js';
import Header from '../Header/Header.js';
import {
    withRouter
  } from "react-router-dom";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            pokemon: [],
            pokemonFiltered: [],
            pageNumbers: [10, 20, 30],
            pagesNeeded: null,
            perPage: 10,
            currentPage: 1,
        }
    }
    componentDidMount(){
        this.fetchPokemons();
      };

      fetchPokemons = () => {
        const apiUrl = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
  
        return fetch(apiUrl)
        .then(response => response.json())
        .then(allpokemon =>  {
            // sort by name, no filter required on name so sorted here
            allpokemon.pokemon.sort(function(a, b) {
                let prevName = a.name.toUpperCase(); 
                let nextName = b.name.toUpperCase(); 
                if (prevName < nextName) {
                return -1;
                }
                if (prevName > nextName) {
                return 1;
                }
                return 0;
            });
  
            // Determine the number of pages 
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(allpokemon.pokemon.length / 10); i++) {
                pageNumbers.push(i);
            }
            
            this.setState({ 
                pokemon: allpokemon.pokemon,
                pokemonFiltered: allpokemon.pokemon,
                pageNumbers: pageNumbers,
                pagesNeeded: pageNumbers
            })
        })
      }
      changePage = pageNumb => {
        this.setState({
          currentPage: pageNumb
        })
      };

    handleSearch = event => {
        var updatedList = this.state.pokemon;
        updatedList = updatedList.filter(function(item) {
          return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(updatedList.length / 10); i++) {
            pageNumbers.push(i);
        }
        this.setState({pokemonFiltered: updatedList, pagesNeeded: pageNumbers, searchString: event.target.value.substr(0, 20) });
    }

  render() {
     //get first and last index for pagination
     const indexOfLastRestaurant = this.state.currentPage * this.state.perPage;
     const indexOfFirstRestaurant = indexOfLastRestaurant - this.state.perPage;
     const currentPokemons = this.state.pokemonFiltered.slice(indexOfFirstRestaurant, indexOfLastRestaurant );
    return (
      <div>
        <Header
        handleSearch={this.handleSearch.bind(this)}
        searchString={this.state.searchString}
        />
        <Pokemon
        pokemons={currentPokemons}
        pagesNeeded={this.state.pagesNeeded}
        currentPage={this.state.currentPage}
        changePage={this.changePage.bind(this)}
        totalResults={this.state.totalResults}
        itemsOnPage={this.state.itemsOnPage}
        />
      </div>
    );
  }
}

 
export default withRouter(Home);