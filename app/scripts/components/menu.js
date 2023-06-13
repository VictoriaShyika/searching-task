/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';

class Menu extends React.Component {
    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            query: '',
            results: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            // query: ""
        });
    }
    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */

    performSearch = async () => {
        const { query } = this.state;
        const results = await axios.get(`http://localhost:3035/search?q=${query}`);
        this.setState({ results: results.data });
    };

    onSearch = (e) => {
        const { value } = e.target;
        this.setState({ query: value }, this.performSearch);
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const { query, results, showingSearch } = this.state;
        return (
            <>
                <header className="menu">
                    <div className="menu-container">
                        <div className="menu-holder">
                            <h1>ELC</h1>
                            <nav>
                                <a href="#" className="nav-item">HOLIDAY</a>
                                <a href="#" className="nav-item">WHAT'S NEW</a>
                                <a href="#" className="nav-item">PRODUCTS</a>
                                <a href="#" className="nav-item">BESTSELLERS</a>
                                <a href="#" className="nav-item">GOODBYES</a>
                                <a href="#" className="nav-item">STORES</a>
                                <a href="#" className="nav-item">INSPIRATION</a>

                                <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                    <i className="material-icons search">search</i>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                        <input type="text" value={query} onChange={(e) => this.onSearch(e)} />
                        <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                            <i className="material-icons close">close</i>
                        </a>
                    </div>
                </header>
                <section id='result' >
                    {results.length && query ?
                        <div className='result-list'>{results.map((item) => (
                            <div className='result-item' key={item._id}>
                                <div className='image-container'>
                                    <img src={item.picture} />
                                </div>
                                <div className='name'>{item.name}</div>
                                <div className='about'>{item.about}</div>
                                <div className='price'>${item.price}</div>
                            </div>))}
                        </div>
                        :(showingSearch && (query ? <div className='empty'>Product not found</div> : <div className='empty'>Type product</div>))}
                </section>   
        </>
        );
    }
}

// Export out the React Component
export default Menu;