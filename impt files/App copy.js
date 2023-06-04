import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosenSearch, setChosenSearch] = useState(null);
  const [chosenType, setChosenType] = useState(null);
  const [chosenRatingRange, setChosenRatingRange] = useState(null);
  const [chosenSortOption, setchosenSortOption] = useState(null);
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        search: chosenSearch,
        type: chosenType,
        rating: chosenRatingRange, 
        sortOption: chosenSortOption
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand m-2 h1"><b>Singapore Attractions</b></span>
      </nav>
      <p className='directions'>
        {' '}
        Search for attractions in Singapore using the following criteria:
      </p>
      <div className='main'>
        <div className='type-selector'>
        {/* <div class="row g-2">
          <div class="col-md">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingInputGrid" placeholder="Search for anything!" value={chosenSearch}
              onChange={(e) => setChosenSearch(e.target.value)}/>
              <label for="floatingInputGrid">Search for anything!</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid" name='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}>
                <option selected value={null}>None</option>
                <option value='Nature & Wildlife'>Nature & Wildlife</option>
                <option value='Leisure & Recreation'>Leisure & Recreation</option>
                <option value='Adventure'>Adventure</option>
                <option value='History & Culture'>History & Culture</option>
                <option value='Arts'>Arts</option>
                <option value='Others'>Others</option>
              </select>
              <label for="floatingSelectGrid">Select a Type</label>
            </div>
          </div>
          <div className="col-md">
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid" name='ratingRange' value={chosenRatingRange} onChange={(e) => setChosenRatingRange(e.target.value)}>
                <option value={null}>Ratings Above</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <label for="floatingSelectGrid">Select a Rating Range</label>
            </div>
          </div>
          <div className="col-md">
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid" name='sortOption' value={chosenSortOption}
                onChange={(e) => setchosenSortOption(e.target.value)}>
                <option value={null}>Sort by</option>
                <option value='desc'>Highest Rating First</option>
                <option value='asc'>Lowest Rating First</option>
              </select>
              <label for="floatingSelectGrid">Select a Rating Range</label>
            </div>
          </div>
          <div className="col-md">
            <button type="button" class="btn btn-light" onClick={sendSearchRequest}>Search</button>
          </div>
        </div> */}
          <ul> 
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Search for anything!'
                    value={chosenSearch}
                    onChange={(e) => setChosenSearch(e.target.value)}
                  />
                </label>
              </form>
            </li>
            <li>
              <select
                name='types'
                id='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}
              >
                <option value={null}>Select a Type</option>
                <option value='Nature & Wildlife'>Nature & Wildlife</option>
                <option value='Leisure & Recreation'>Leisure & Recreation</option>
                <option value='Adventure'>Adventure</option>
                <option value='History & Culture'>History & Culture</option>
                <option value='Arts'>Arts</option>
                <option value='Others'>Others</option>
              </select>
            </li> 
            <li>
              <select
                name='ratingRange'
                id='ratingRange'
                value={chosenRatingRange}
                onChange={(e) => setChosenRatingRange(e.target.value)}
              >
                <option value={null}>Ratings Above</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </li>
            <li>
              <select
                name='sortOption'
                id='sortOption'
                value={chosenSortOption}
                onChange={(e) => setchosenSortOption(e.target.value)}
              >
                <option value={null}>Sort by</option>
                <option value='desc'>Highest Rating First</option>
                <option value='asc'>Lowest Rating First</option>
              </select>
            </li>
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p class="ml-5 text-white"> Number of hits: {documents.length}</p>
            ) : (
              <p class="ml-5 text-white"> No results found. Try broadening your search criteria.</p>
            )}
            <div className="row">
                {documents.map((document) => (
                  <div className="col-md-4">
                  <div class="card m-1" style={{width: '25rem', height: '10rem'}}>
                    <div class="card-body">
                      <h5 class="card-title">{document._source.name} <span class="badge badge-primary">{document._source.type}</span></h5>
                    </div>
                  </div>
                  </div>
                //   <div className='results-card'>
                //     <div className='results-text'>
                //       <p>Name: {document._source.name}</p>
                //       <p>Type: {document._source.type}</p>
                //       <p>Tags: {document._source.tags}</p>
                //       <p>Description: {document._source.description}</p>
                //       <p>Rating: {document._source.rating}</p>
                //       <p>Address: {document._source.block} {document._source.streetName} {document._source.floorNumber} {document._source.unitNumber} {document._source.buildingName} {document._source.postalCode}</p>
                //       <p>Official Site: {document._source.officialWebsite}</p>
                //     </div>
                //   </div>
                ))}
              
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default App;