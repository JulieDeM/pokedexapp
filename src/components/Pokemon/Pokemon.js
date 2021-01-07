import React from 'react';
import './Pokemon.css';
import {
    BrowserRouter as Router,
    withRouter,
    Link,
  } from "react-router-dom";

class Pokemon extends React.Component {
    renderTableHeader = () => {
        // @ToDO: Make dynamic, IF time 
        return (
          <>
            <th>Name</th>
            <th>Number</th>
            <th>Type</th>
            <th>Weakness</th>
            <th></th>
          </>
        )
      };

      renderTableData = () => {
        return this.props.pokemons.map(pokemon => {
          const { id, name, num, type, weaknesses, img, height, weight, prev_evolution, next_evolution } = pokemon;
          return (
              <tr key={id} >
                <td>{name}</td>
                <td>{num}</td>
                <td>{type}</td>
                <td className="weakness-container">{
                    weaknesses && weaknesses.map(weak => 
                        <ul key={weak} className={weak}>{weak}</ul>)
                }</td>
                <td>
                    <Link 
                    to={{
                      pathname: `/pokemon/${num}`,
                      state: {
                       id, name, num, type, weaknesses,img, height, weight, prev_evolution, next_evolution 
                      }
                    }}
                    className="details">Details</Link>
                </td>
              </tr>
          )
        })
      };
    
    filterByType = () => {
      const types = [];
      this.props.pokemons.map()
    }

  render() {
      console.log('this.props.pokemon')
      console.log(this.props.pokemons)
      // const filtersType= this.props.pokemons.filter((o) => this.props.pokemons.indexOf(o.type) === -1);
      // console.log('filterstype')
      // console.log(filtersType)

    return (
      <div>
        <div className="container">
        {/* <div> */}
        <div className="table-container">
            <table id="pokemon">
            <tbody >
                <tr>
                {this.renderTableHeader()}
                </tr>
                {this.renderTableData()}
            </tbody>
            </table>
            {this.props.pokemons.length === 0 && (
             <p className="noResults">There are no matches for your search, please try again</p>
            )}
        <div className='pagination'>
          {this.props.pagesNeeded && this.props.pagesNeeded.map(num => {
            let activePage = this.props.currentPage === num ? 'active' : '';
            return (
              <span key={num} className={activePage} onClick={() => this.props.changePage(num)}>{num}</span>
            );
          })}
          </div>
          </div>
            <div className="filter-container">
              <div className="filter-heading">
                <h1 className="filter-title">Filters</h1>
              </div>
                <h2 className="filter-title">Type</h2>
                <span className="filter-section">
                  {this.props.typeArray.map(type => {
                    return (
                    <span className="checkbox-label">
                    <input 
                     type="checkbox" 
                     id={type} 
                     name={type}
                     />
                     <label className="checkbox-labels" for={type}>{type}</label>
                     </span>
                    )
                  })}
                </span>
                <h2 className="filter-title">Weaknesses</h2>
                <span className="filter-section">
                  {this.props.weaknessesArray.map(type => {
                    return (
                    <span className="checkbox-label">
                    <input 
                     type="checkbox" 
                     id={type} 
                     name={type}
                     
                     />
                     <label className="checkbox-labels" for={type}>{type}</label>
                     </span>
                    )
                  })}
                </span>
                
            </div>
        </div>
      </div>
    );
  }
}

 
export default withRouter(Pokemon);