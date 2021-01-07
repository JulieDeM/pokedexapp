import React from 'react';
import './PokemonDetails.css';
import {
    withRouter,
    Link
} from "react-router-dom";

class PokemonDetails extends React.Component {

  render() {
    console.log(this.props.location.state)
    return (
      <div >
        <div className="header-container">
            <button onClick={ () => this.props.history.push('/')}>
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
                <h1>Weight: {this.props.location.state.weight}</h1>
                <h1>Height: {this.props.location.state.height}</h1>
            </div>
            <div className="pokemon-name">
                <h1>Type: {this.props.location.state.type}</h1>
            </div>
            <div className="pokemon-name">
                <h1>Weaknesses: {this.props.location.state.weaknesses}</h1>
            </div>
            { this.props.location.state.next_evolution && (
            <div className="pokemon-name">
                <h1>Next Evolution: </h1>
                <h2 className="weakness-container">{
                    this.props.location.state.next_evolution.map(weak => 
                    // <Link 
                    // to={{
                    //   pathname: `/pokemon/${weak.num}`}}>
                        <ul key={weak.name} className={weak.name}>{weak.name + '   #' + weak.num}</ul>
                    //  </Link>
                    )}</h2>
                {/* <h2>{this.props.location.state.next_evolution.map(evolution => { evolution })}</h2> */}
            </div>
            )}
            {this.props.location.state.prev_evolution && (
            <div className="pokemon-name">
                <h1>Prev Evolutions: </h1>
                <h2 className="weakness-container">{
                     this.props.location.state.prev_evolution.map(weak => 
                        // <Link 
                        // to={{
                        //   pathname: `/pokemon/${weak.num}`}}>
                          <ul key={weak.name} className={weak.name}>{weak.name + '   #' + weak.num}</ul>
                        //  </Link>
                        )}</h2>
            </div>
            )}
        </div>
      </div>
    );
  }
};

export default withRouter(PokemonDetails);