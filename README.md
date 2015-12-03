**TestVDM** - Test app retrieving VDM data and providing REST API

# Usage
- Install [NodeJS](https://nodejs.org/en/)
- Install [MongoDB for Windows](http://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows) or [MongoDB for iOS](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
- Clone the Github repo `git clone https://github.com/Kiruchi/TestVDM.git`
- Run `npm install` in the local repo folder
- Run `npm install -g jasmine-node` to install the Jasmine test runner
- Run `mongod` or `path/to/mongodb/bin/mongod` in a second cli to start MongoDB (you may have to specify the path by adding `--dbpath \data\db`)
- Run `node getPosts.js` in the first cli to save the VDM posts to the DB
- Run `npm start` or `node server.js` to launch the REST API
- Test it on [http://localhost:8080/api](http://localhost:8080/api) (or on your environment variable PORT instead of 8080)
- Run the unit tests with `npm test` or `jasmine-node spec/`

# But how is it built ?

- NodeJS
- Cheerio for scraping
- Mongoose
- MongoDB
- Express for the REST API

<p align="center">
    <img style="width:100%" src="https://media.giphy.com/media/mXuPwEBHCtaH2ndoBy/giphy.gif"/>
</p>
