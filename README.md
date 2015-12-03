**TestVDM** - Test app retrieving VDM data and providing REST API

# Usage
- Install [NodeJS](https://nodejs.org/en/)
- Install [MongoDB for Windows](http://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows) or [MongoDB for iOS](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/ depending on OS)
- Clone the Github repo
- Run `npm install` in the local repo folder
- Run `mongod` in another cli
- Run `node getPosts.js` to save the VDM posts to the DB
- Run `node server.js` to launch the REST API
- Test it on [http://localhost:8080/api](http://localhost:8080/api) (or on your environment variable PORT instead of 8080)

# But how is it built ?

<p align="center">
<img style="width:100%" src="http://49.media.tumblr.com/b62dbc153c731875a1659093cbb9b548/tumblr_no6vc1gifh1qiaxzfo2_250.gif"/>
</p>

- NodeJS
- Cheerio for scraping
- Mongoose
- MongoDB
- Express for the REST API
