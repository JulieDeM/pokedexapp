import React from 'react';
import './Header.css';

class Header extends React.Component {

  render() {

    return (
      <div className="header-container">
          <p className="title">Pokedex</p>
          <div className="container">
          <i className="fa fa-search search-icon"/>
				<label className="search-label" htmlFor="search-input">
					<input
            type="text"
            onChange={this.props.handleSearch}
            id="search-input"
            value={this.props.searchString}
						placeholder="Search Pokemon by Name..."
					/>
				</label>
			</div>
      </div>
    );
  }
}

 
export default Header;