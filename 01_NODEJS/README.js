Node.js

// UNDERSTANDING THE BASICS

const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
});
server.listen(3000, () => { console.log('server start'); });
// we need to visit localhost:3000 on our browser to see the console.log(req)
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node.js</title></head>');
  res.write('<body><h1>Hello Node.js</h1></body>');
  res.write('</html>');
  res.end();
});
// we need to visit localhost:3000 
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  // set header type json
  res.setHeader('Content-Type', 'application/json');
  // set response
  const data = {
    name: 'John',
    age: 30,
    job: 'programmer'
  };
  // send response
  res.end(JSON.stringify(data));
});
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node.js</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node.js</title></head>');
  res.write('<body><h1>Hello Node.js</h1></body>');
  res.write('</html>');
  res.end();
});
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body>Helo from message js</body>')
    res.write('</html>');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is header</title></head>');
  res.write('<body>Helo from node js</body>')
  res.write('</html>');
  res.end();
})
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'dummy text');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is header</title></head>');
  res.write('<body>Helo from node js</body>')
  res.write('</html>');
  res.end();
})

—-----------------------------------------------------
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    // event listener
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    })
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is header</title></head>');
  res.write('<body>Helo from node js</body>')
  res.write('</html>');
  res.end();
})
—-----------------------------------------------------
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    // event listener
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is header</title></head>');
  res.write('<body>Helo from node js</body>')
  res.write('</html>');
  res.end();
})
—-----------------------------------------------------

  Adding req, res logic to another file called routes, exporting it, and importing in app.js
const routes = require('./routes');
const server = http.createServer(routes);

routes.js
const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is header</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    // event listener
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is header</title></head>');
  res.write('<body>Helo from node js</body>')
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;


Or export as an Object
module.exports = {
  handler: requestHandler,
  somethingElse: 'some hard coded text'
};
And use it
const server = http.createServer(routes.handler);
—-----------------------------------------------------

—-----------------------------------------------------
  npm init
—-----------------------------------------------------
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
      "start-server": "node app.js"
},

Here we can run: npm start
cant run npm start - server … (because start is reserved and can go without run.) 
Our own created scripts must go with npm run
—-----------------------------------------------------
  Npm install nodemon –save - dev
"nodemon": "^3.0.2"   – ^ means - after running npm install, it will automatically pick later version if available. 
"start": "nodemon app.js",


// WORKING WITH EXPRESS.JS
—-----------------------------------------------------
  Npm install express –save
const express = require('express');
const app = express();
—-----------------------------------------------------
// we use next() function to travel to next middleware
const http = require('http');
const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('first middleware');
  next();
});
app.use((req, res, next) => {
  console.log('second middleware');
});
const server = http.createServer(app);
server.listen(3000, () => { console.log('server start'); });
—-----------------------------------------------------
// we can use res.send, express handle setHeader for us
const http = require('http');
const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('first middleware');
  next();
});
app.use((req, res, next) => {
  console.log('second middleware');
  res.send('<h1>Hello Express</h1>');
});
const server = http.createServer(app);
server.listen(3000, () => { console.log('server start'); });
—-----------------------------------------------------
// we can set first parameter to app.use to set path
// if we try to visit localhost:3000/express, we will get Hello Express
const http = require('http');
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('first middleware');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
—-----------------------------------------------------
// we need to add add-product before /, otherwise it will never reach add-product
const http = require('http');
const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  console.log('first middleware');
  res.send('<h1>Hello add product!</h1>');
});

app.use('/', (req, res, next) => {
  console.log('first middleware');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
—-----------------------------------------------------
  // npm install body - parser--save
  ------------------------------------------------------
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="product" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form>');
});

app.use('/product', (req, res, next) => {
  console.log('body', req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
------------------------------------------------------
// instead of app.use we can filter incoming requests with get,post,delete,put
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
------------------------------------------------------
// we can split our routes to different files
// routes/admin.js
// app.js
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
// routes/admin.js
const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="product" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
// routes/shop.js
// here if we add router.get and visit not existing route, we will get error
// if we add router.use, we will get Hello from Express, because it will be executed for all routes
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

// router.use("/", (req, res, next) => {
//   res.send("<h1>Hello from Express!</h1>");
// });

module.exports = router;
------------------------------------------------------
// adding 404 page
// app.js
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
// this will be executed for all routes
------------------------------------------------------
// filtering paths
// app.js
app.use("/admin", adminRoutes);
// now only routes starting with /admin will be handled by adminRoutes
------------------------------------------------------
// creating html pages
// create views folder
// create views/shop.html
------------------------------------------------------
// serving html pages
// we need to use path module
// shop.js
// __dirname is global variable that holds current path to file
// path.join will join all arguments to one path
// path.join(__dirname, "..", "views", "shop.html")
// will be /views/shop.html
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

module.exports = router;
------------------------------------------------------
// finaly adding 404 page in app.js
// app.js
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
------------------------------------------------------
// we create helper file to get root path
// util/path.js
const path = require("path");

module.exports = path.dirname(process.mainModule.filename);
// This is the path to the root directory of the project.
------------------------------------------------------
// we use helper file in admin.js and shop.js
// admin.js
const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
------------------------------------------------------
// serving file statically
// to be able to serve files statically we need to use express.static
// app.js
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
// and then we can use files from public folder
// shop.html
<link rel="stylesheet" href="css/main.css"></link>
// here we have css folder in public folder
------------------------------------------------------

// WORKING WITH DYNAMIC CONTENT & ADDING TEMPLATING ENGINES
npm install --save ejs pug express-handlebars
// WE NEED TO CONFIGURE TO BE ABLE TO USE TEMPLATE ENGINES
// PUG
// APP.JS
app.set("view engine", "pug");
app.set("views", "views");
// NOW WE CREATE PUG FILES IN VIEWS FOLDER
router.get("/", (req, res, next) => {
  res.render("shop");
});
// res render shop, will find the shop.pug file and render, here we can use res.render
------------------------------------------------------
// in order to send data to the pug template
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, docTitle: "Shop" });
});
// now prods and docTitle are available inside of shop.pug template
------------------------------------------------------
// we convert shop.html to shop.pug
// we use extends to extend main-layout.pug from layouts folder
extends layouts/main-layout.pug
// in main-layout we can create block styles
block styles
// and then we can add styles in shop.pug
block styles
    link(rel="stylesheet", href="/css/product.css")
// check shop.pug and main-layout.pug
------------------------------------------------------
// second template engine we can use is express-handlebars
// need to npm install hbs
const express = require("express");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const hbs = require("hbs");

const app = express();

// app.engine("handlebars", handlebars());
app.set("view engine", "hbs");
app.set("views", "views");
// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Not Found 404" });
});

app.listen(3000);
------------------------------------------------------
// if there is an error try with this 
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
------------------------------------------------------
// check 03_express_handlebars for more info
// on how to work with handlebars
------------------------------------------------------
// EJS
// check 04_ejs for more info
------------------------------------------------------
// we can now use controllers to handle routes
// it is good practice to use controllers
// check 05_mvc_controllers for more info
------------------------------------------------------




