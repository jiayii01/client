const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors');

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {
  const passedSearch = req.query.search;
  const passedType = req.query.type;
  const passedRating = req.query.rating;
  const passedSortOption = req.query.sortOption;

  async function sendESRequest() {
    const body = await client.search({
      index: 'attractions',
      body: {
        sort: [
          {
            rating: {
              order: passedSortOption,
            },
          },
        ],
        size: 300,
        query: {
          bool: {
            filter: [
              {
                term: { 
                    type: passedType,
                    
                },
              },
              {
                range: {
                  rating: {
                    gte: passedRating,
                  },
                },
              },
              {
                multi_match: {
                    "query": passedSearch,
                    "fields": [
                        "name",
                        "description",
                        "body"
                    ]
                },
              },
            ],
          },
        },
      },
    });
    // send docs to client
    res.json(body.hits.hits);
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.group(`Server started on ${PORT}`));