class siteRunner {

  //start the site on the local server
  static get DATABASE_URL() {
    const port = 8080 // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`
    console.log(restaurants.json);
  }
}
