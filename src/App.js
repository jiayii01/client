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
        <span class="navbar-brand m-2 h1"><b>Singapore Attractions 🇸🇬</b></span>
      </nav>
      <p className='directions'>
        {' '}
        Search for attractions in Singapore using the following criteria:
      </p>
      <div className='main'>
        <div class="container">
        <div className='type-selector'>
        <div class="row g-2">
          <div class="col-md">
            <form>
              <input
                className='form'
                type='text' class="form-control" id="floatingInputGrid"
                placeholder='Search for anything!'
                value={chosenSearch}
                onChange={(e) => setChosenSearch(e.target.value)}
              />
              </form>
          </div>
          <div className="col-md">
            <select
              name='types'
              id='types' class="form-select"
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
          </div>
          <div className="col-md">
            <select
              name='ratingRange'
              id='ratingRange' class="form-select"
              value={chosenRatingRange}
              onChange={(e) => setChosenRatingRange(e.target.value)}
            >
              <option value={null}>Ratings Above</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className="col-md">
          <select
            name='sortOption'
            id='sortOption'
            class="form-select"
            value={chosenSortOption}
            onChange={(e) => setchosenSortOption(e.target.value)}
          >
            <option value={null}>Sort by</option>
            <option value='desc'>Highest Rating First</option>
            <option value='asc'>Lowest Rating First</option>
          </select>
          </div>
          <div className="col-md">
            <button type="button" class="btn btn-secondary" onClick={sendSearchRequest}>Search!</button>
          </div>
        </div>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p class="ml-5 mt-1 text-white"> Number of hits: {documents.length}</p>
            ) : (
              <p class="ml-5 text-white"> No results found. Try broadening your search criteria.</p>
            )}
            <div className="row">
                {documents.map((document) => (
                  <div className="col-md-4">
                  <div class="card m-1" style={{width: '23rem', height: '21rem'}}>
                    <div class="card-body">
                      <h5 class="card-title">{document._source.name}<span class="badge rounded-pill text-bg-success ms-4">{document._source.rating}</span></h5>
                      <span class="badge text-bg-primary">{document._source.type}</span>
                      <p class="m-1">Address: {document._source.block} {document._source.streetName} {document._source.floorNumber} {document._source.unitNumber} {document._source.buildingName} {document._source.postalCode}</p>
                      {
                        document._source.tags.map((tag) => (
                          <span class="badge text-bg-light">{tag}</span>
                        ))
                      }
                      <p class="mt-1"><small>Link to Official Site: <a href={document._source.officialWebsite} target="_blank" rel="noreferrer">{document._source.officialWebsite}</a></small></p>
                    </div>
                  </div>
                  </div>
                ))}
              
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default App;