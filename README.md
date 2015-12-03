**TestVDM** - Test app retrieving VDM data and providing REST API

# Usage
- Install [NodeJS](https://nodejs.org/en/)
- Install [MongoDB for Windows](http://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows) or [MongoDB for iOS](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
- Clone the Github repo
- Run `npm install` in the local repo folder
- Run `mongod` in another cli
- Run `node getPosts.js` to save the VDM posts to the DB
- Run `node server.js` to launch the REST API
- Test it on [http://localhost:8080/api](http://localhost:8080/api) (or on your environment variable PORT instead of 8080)

# But how is it built ?

- NodeJS
- Cheerio for scraping
- Mongoose
- MongoDB
- Express for the REST API

<p align="center">
<img style="width:100%" src="https://media.giphy.com/media/mXuPwEBHCtaH2ndoBy/giphy.gif"/>
</p>
