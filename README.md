# Search for Attractions in Singapore, powered by Elasticsearch

## 👷🏻‍♀️ Why did I build this?
What better way to understand concepts than to implement it in a project! Elasticsearch is specifically designed for high-speed, real-time search and retrieval of large amounts of data. In order to gain the ability to build robust search functionality into any future work, I decided to embark on a simple project that puts what I've learnt to practice. 

## 💻 User Interface built using React.js and Bootstrap

![ezgif com-video-to-gif (1)](https://github.com/jiayii01/search-for-sg-attractions-with-elasticsearch/assets/79521323/d2071f82-c693-4796-b023-71390ef55fb9)

![image](https://github.com/jiayii01/search-for-sg-attractions-with-elasticsearch/assets/79521323/86f3b0ac-3262-43f1-b127-6ae0afdba8d5)

<img width="1235" alt="image" src="https://github.com/jiayii01/sg-attractions-with-elasticsearch/assets/79521323/2b7af736-00ba-4a66-b0d1-ab03eab4202a">

## 🗾 Mapping of fields in Elastic 
```
PUT attractions
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "type": {
        "type": "keyword"
      },
      "tags": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "description": {
        "type": "text"
      },
      "body": {
        "type": "text"
      },
      "rating": {
        "type": "float"
      },
      "block" :{
        "type": "text"
      },
      "streetName" :{
        "type": "text"
      },
      "floorNumber" :{
        "type": "text"
      },
      "unitNumber" :{
        "type": "text"
      },
      "buildingName" :{
        "type": "text"
      },
      "postalCode" :{
        "type": "text"
      },
      "categoryDescription" :{
        "type": "keyword"
      },
      "pricing":{
        "type": "float"
      },
      "businessHour": {
        "type": "date"
      },
      "officialWebsite": {
        "type": "text"
      },
      "temporarilyClosed": {
        "type": "keyword"
      },
      "nearestMrtStation": {
        "type": "text"
      }
    }
  }
}
```

##  Ingest Pipeline in Elastic Search
![image](https://github.com/jiayii01/sg-attractions-with-elasticsearch/assets/79521323/265b3dd8-f5ec-464e-b5e1-9c26601091dc)

## Queries used for Search
![image](https://github.com/jiayii01/sg-attractions-with-elasticsearch/assets/79521323/933f953b-584c-41de-94b5-19b5bb1f9e96)


Referenced: https://dev.to/lisahjung/beginners-guide-to-building-a-full-stack-app-nodejs-react-with-elasticsearch-5347
