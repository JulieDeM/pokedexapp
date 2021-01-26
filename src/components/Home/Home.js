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
            pokemonReset: [],
            pageNumbers: [10, 20, 30],
            pagesNeeded: null,
            perPage: 10,
            currentPage: 1,
            checkedItemsType: new Map(),
            selectedItems: [],
            checkedItemsWeaknesses: new Map(),
            weaknessesFilter: [],
            checkedValues: []
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeaknesses = this.handleChangeWeaknesses.bind(this);
    };
    //@Todo, refactor with hooks

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
            };
            
            this.setState({ 
                pokemon: allpokemon.pokemon,
                pokemonReset: allpokemon.pokemon,
                pokemonFiltered: allpokemon.pokemon,
                pageNumbers: pageNumbers,
                pagesNeeded: pageNumbers
            });
        });
      };

    changePage = pageNumb => {
        this.setState({
            currentPage: pageNumb
        });
    };

    handleSearch = event => {
        let updatedList = this.state.pokemon;
        updatedList = updatedList.filter(item => {
          return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(updatedList.length / 10); i++) {
            pageNumbers.push(i);
        };
        this.setState({pokemonFiltered: updatedList, pagesNeeded: pageNumbers, searchString: event.target.value.substr(0, 20) });
    };
    
    handleChange = e => {
        let pokemonName = e.target.name;
        let checked = e.target.checked;

        let pokemonReset = this.state.pokemonReset;
        let filteredCategories = this.state.selectedItems.filter(existingTag => {
            return existingTag ? existingTag !== pokemonName : pokemonReset
        });

        let newCategories = filteredCategories.length === this.state.selectedItems.length ?
        filteredCategories.concat([pokemonName]) :
        filteredCategories;

        let pokemonFilteredRemoved = this.state.pokemon;
        pokemonFilteredRemoved = pokemonFilteredRemoved.filter(item => {
            for(let i = 0; i < newCategories.length; i++){
                if(newCategories.length > 0){
                    return item.type.includes(newCategories[i]);
                } else {
                    return pokemonReset;
                };
            };
        });
 
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(pokemonFilteredRemoved.length / 10); i++) {
            pageNumbers.push(i);
        };

        if (checked) {
            this.setState(prevState => ({
                selectedItems: prevState.selectedItems.concat(pokemonName),
                pagesNeeded: pageNumbers,
                pokemonFiltered: prevState.pokemonFiltered.filter(i => { return i.type.includes(pokemonName) })
            }));
        } else {
            this.setState({
                selectedItems: newCategories,
                pokemonFiltered: newCategories.length > 0 ? pokemonFilteredRemoved : this.state.pokemonReset,
                pagesNeeded: pageNumbers
            });
        };
    };

    handleChangeWeaknesses = e => {
        let pokemonName = e.target.name;
        let checked = e.target.checked;

        let pokemonReset = this.state.pokemonReset;
        let filteredCategories = this.state.selectedItems.filter(existingTag => {
            return existingTag ? existingTag !== pokemonName : pokemonReset
        });

        let newCategories = filteredCategories.length === this.state.selectedItems.length ?
        filteredCategories.concat([pokemonName]) :
        filteredCategories;

        let pokemonFilteredRemoved = this.state.pokemon;
        pokemonFilteredRemoved = pokemonFilteredRemoved.filter(item => {
        for(let i = 0; i < newCategories.length; i++){
            if(newCategories.length > 0){
                return item.weaknesses.includes(newCategories[i]);
            } else {
                return pokemonReset;
            }
            }
        });
 
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(pokemonFilteredRemoved.length / 10); i++) {
            pageNumbers.push(i);
        };
        if (checked) {
            this.setState(prevState => ({
                selectedItems: prevState.selectedItems.concat(pokemonName),
                pagesNeeded: pageNumbers,
                pokemonFiltered: prevState.pokemonFiltered.filter(i => { return i.weaknesses.includes(pokemonName)})
            }));
        } else {
            this.setState({
                selectedItems: newCategories,
                pokemonFiltered: newCategories.length > 0 ? pokemonFilteredRemoved : this.state.pokemonReset,
                pagesNeeded: pageNumbers
            });
        };
        //@TODO: Refactor opportunity. Refactor to work with below logic
        //     const item = e.target.name;
        //     const isChecked = e.target.checked;
        //     this.setState(prevState => ({ checkedItemsWeaknesses: prevState.checkedItemsWeaknesses.set(item, isChecked) }));
    };



  render() {
     //get first and last index for pagination
     const indexOfLastRestaurant = this.state.currentPage * this.state.perPage;
     const indexOfFirstRestaurant = indexOfLastRestaurant - this.state.perPage;
     const currentPokemons = this.state.pokemonFiltered.slice(indexOfFirstRestaurant, indexOfLastRestaurant );
  
    let typeArray = [];
    // eslint-disable-next-line
    this.state.pokemon.map(type => { 
        type.type.map(type => {
            if(typeArray.indexOf(type) === -1) {
                //sort the type alphabetically so easier to filter then push to new array used
                typeArray.push(type);
                typeArray.sort();
                return;
            };
        });
    });

    let weaknessesArray = [];
    // eslint-disable-next-line
    this.state.pokemon.map(type => { 
        type.weaknesses.map(weaknesses => {
            if(weaknessesArray.indexOf(weaknesses) === -1) {
                weaknessesArray.push(weaknesses);
                weaknessesArray.sort();
                return;
            };
        });
    });
   
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
        typeArray={typeArray}
        weaknessesArray={weaknessesArray}
        handleChange={this.handleChange}
        handleChangeWeaknesses={this.handleChangeWeaknesses}
        checkedItemsWeaknesses={this.state.checkedItemsWeaknesses}
        checkedItemsType={this.state.checkedItemsType}
        />
      </div>
    );
  };
};
 
export default withRouter(Home);