const fs = require('fs');
const path = require('path');

const getProductsFromFile = (cb) => {
  return path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
  );
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // const p = path.join(
    //   path.dirname(require.main.filename),
    //   "data",
    //   "products.json"
    // );
    let p = getProductsFromFile();
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // const p = path.join(
    //   path.dirname(require.main.filename),
    //   "data",
    //   "products.json"
    // );
    let p = getProductsFromFile();
    if (!fs.existsSync(p)) {
      return cb([]);
    }
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
