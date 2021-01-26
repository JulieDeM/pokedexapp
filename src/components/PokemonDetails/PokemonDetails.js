import React from 'react';
import './PokemonDetails.css';
import {
    withRouter
} from "react-router-dom";

class PokemonDetails extends React.Component {

  render() {
    return (
      <div >
        <div className="header-container">
            <button className="back-button" onClick={ () => this.props.history.push('/')}>
                <i className="fa fa-arrow-circle-left"></i>
            </button>
            <p className="detail-title">Pokedex Detail Page</p>
        </div>
        <div className="details-border">
            <div className="pokemon-name">
                <img src={this.props.location.state.img} alt={this.props.location.state.name} />
                <h1 className="name">{this.props.location.state.name}</h1>
                <h1>#{this.props.location.state.num}</h1>
            </div>
            <div className="pokemon-name">
                <h1><span className="data-title">Weight:</span> {this.props.location.state.weight}</h1>
                <h1><span className="data-title">Height:</span> {this.props.location.state.height}</h1>
            </div>
            <div className="pokemon-name">
                <h1 className="data-title">Type: </h1>
                {this.props.location.state.type.map(type => {
                    return <h1 key={type} className="type-weakness">{type}</h1>
                })}
            </div>
            <div className="pokemon-name">
                <h1 className="data-title">Weaknesses: </h1>
                {this.props.location.state.weaknesses.map(weakness => {
                    return <h1 key={weakness} className={weakness}>{weakness}</h1>
                })}
            </div>
            { this.props.location.state.next_evolution && (
            <div className="pokemon-name">
                <h1 className="data-title">Next Evolution: </h1>
                {
                    this.props.location.state.next_evolution.map(next_ev => 
                    //@TODO: link to related pokemon, carry over data via link or have to fetch
                    // note: originally set url path with id
                    // <Link 
                    // to={{
                    //   pathname: `/pokemon/${weak.num}`}}>
                        <h1 key={next_ev.name} className={next_ev.name}>{next_ev.name + '   #' + next_ev.num}</h1>
                    //  </Link>
                    )}
            </div>
            )}
            {this.props.location.state.prev_evolution && (
            <div className="pokemon-name">
                <h1 className="data-title">Prev Evolutions: </h1>
               {
                     this.props.location.state.prev_evolution.map(weak => 
                        //@TODO: link to pokemon, carry over data via link to 
                        //note: originally set url path with id, may need to go back to and fetch pokemon on id for this
                        // <Link 
                        // to={{
                        //   pathname: `/pokemon/${weak.num}`}}>
                          <h1 key={weak.name} className={weak.name}>{weak.name + '   #' + weak.num}</h1>
                        //  </Link>
                        )}
            </div>
            )}
        </div>
      </div>
    );
  }
};

export default withRouter(PokemonDetails);