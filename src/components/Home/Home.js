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
            checkedItemsType: new Map(),
            checkedItemsWeaknesses: new Map(),
            weaknessesFilter: [],
            typesChecked: [],
            activeWeaknessFilter: []
        }
      
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeaknesses = this.handleChangeWeaknesses.bind(this);
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
        let updatedList = this.state.pokemon;
        updatedList = updatedList.filter(function(item) {
          return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(updatedList.length / 10); i++) {
            pageNumbers.push(i);
        }
        this.setState({pokemonFiltered: updatedList, pagesNeeded: pageNumbers, searchString: event.target.value.substr(0, 20) });
    }

    //Filter by type
    handleChange = e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        // console.log(this.state.pokemonFiltered);
        // console.log('item')
        // console.log(item)'
        let typeArray = [];
        // eslint-disable-next-line
        this.state.pokemonFiltered.map(type => { 
            type.type.map(type => {
                console.log(type)
                if(typeArray.indexOf(item) === -1) {
                    //sort the type alphabetically so easier to filter then push to new array used
                    typeArray.push(type);
                    typeArray.sort();
                }
            })
        });
        console.log('typeArray')
        console.log(typeArray.length)
        this.setState(prevState => ({ checkedItemsType: prevState.checkedItemsType.set(item, isChecked) }));
        

        // this.state.checkedItemsType.forEach( (value, key, map) => {
        //     console.log(`${key}: ${value}`); 
        //     if(key === true){
        //         let typeArray = [];
        //         // eslint-disable-next-line
        //         this.state.pokemonFiltered.map(type => { 
        //             type.type.map(type => {
        //                 if(typeArray.indexOf(value) === -1) {
        //                     //sort the type alphabetically so easier to filter then push to new array used
        //                     typeArray.push(type);
        //                     typeArray.sort();
        //                 }
        //             })
        //         });
        //         console.log('typeArray')
        //         console.log(typeArray.length)
        //     }
        //   });
        
      }

      handleChangeWeaknesses = e => {
        const { pokemonFiltered, activeWeaknessFilter } = this.state;
        if (activeWeaknessFilter.includes(e.target.name)) {
            const filterIndex = activeWeaknessFilter.indexOf(e.target.name);
            const newFilter = [...activeWeaknessFilter];
            newFilter.splice(filterIndex, 1);
            this.setState({ activeWeaknessFilter: newFilter });
        } else {
            this.setState({ activeWeaknessFilter: [...activeWeaknessFilter, e.target.name] });
        }

        let updatedList = pokemonFiltered;
        updatedList = updatedList.filter(function(item) {
          return item.name.toLowerCase().search(e.target.name.toLowerCase()) !== -1;
        });
        console.log('updatedList')
        console.log(updatedList)
        //    let filteredList;
        //     if (
        //         activeWeaknessFilter.length === 0 ||
        //         activeWeaknessFilter.length === filterList.length
        //     ) {
        //     filteredList = this.state.pokemonFiltered;
        //     console.log('filteredList if 0')
        //     console.log(filteredList)
        //     } else {
        //     filteredList = this.state.pokemonFiltered.filter(item =>
        //         // console.log('item')
        //         console.log(item)
        //         // this.state.activeFilter.includes(item.type)
        //     );
        //     console.log('filteredList')
        //     console.log(filteredList)
        //     }
            // console.log('filteredList')
            // console.log(filteredList)
        console.log('this.state.activeWeaknessFilter')
        console.log(this.state.activeWeaknessFilter)
      }
    
    // //Filter by weakness
    // handleChangeWeaknesses = e => {
      
    //     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    //     const name = e.target.name;
    //     console.log('----------- value ------------')
    //     console.log(value)
    //     console.log('----------- name ------------')
    //     console.log(name)
    //     let filterWeakness = this.state.weaknessesFilter;
    //     if(value === true){
    //         //setState is asynchronous, need to see updated state value immediately no on rerender
    //         //state was lagging with just , name so did callback function
    //         this.setState({ weaknessesFilter: [...this.state.weaknessesFilter, name] })
    //      } 
    //      console.log('this.state.weaknessesFilter')
    //      console.log(this.state.weaknessesFilter)

    //         this.setState({
    //         [name]: value,
    //         // typeFilters: filterWeakness
    //         });
    //         console.log(this.state)

    //     //@TODO: Refactor opportunity. Refactor to work with below logic
    //     const item = e.target.name;
    //     const isChecked = e.target.checked;
    //     this.setState(prevState => ({ checkedItemsWeaknesses: prevState.checkedItemsWeaknesses.set(item, isChecked) }));
    // }

  render() {
     //get first and last index for pagination
     const indexOfLastRestaurant = this.state.currentPage * this.state.perPage;
     const indexOfFirstRestaurant = indexOfLastRestaurant - this.state.perPage;
     const currentPokemons = this.state.pokemonFiltered.slice(indexOfFirstRestaurant, indexOfLastRestaurant );
  
    let typeArray = [];
    // eslint-disable-next-line
    this.state.pokemonFiltered.map(type => { 
        type.type.map(type => {
            if(typeArray.indexOf(type) === -1) {
                //sort the type alphabetically so easier to filter then push to new array used
                typeArray.push(type);
                typeArray.sort();
            }
        })
    });

    let weaknessesArray = [];
    // eslint-disable-next-line
    this.state.pokemonFiltered.map(type => { 
        type.weaknesses.map(weaknesses => {
            if(weaknessesArray.indexOf(weaknesses) === -1) {
                weaknessesArray.push(weaknesses);
                weaknessesArray.sort();
            }
        })
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
  }
}

 
export default withRouter(Home);