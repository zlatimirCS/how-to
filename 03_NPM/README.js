// npmjs.com
// npm -v
// npm --version
// npm help
// npm init
// npm init -y
// npm init --yes
// npm config set init-author-name "Zlatimir"
// npm set init-license "default"
// npm get init-license
// npm config delete init-author-name
// npm install lodash --save
// npm install gulp --save-dev
// for nodemon to ignore files
{
  "scripts": {
    "test": "jest",
    "start": "nodemon server.js"
  },
  "nodemonConfig": {
      "ignore": ["test/*"]
  }
}
// nodemon will ignore files in test folder
// npm install --production (will install only dependencies without devDependencies)
// npm uninstall gulp --save-dev
// npm remove gulp --save-dev
// npm install lodash@4.17.3 --save
// npm outdated (will show outdated packages)
// npm update (will update packages)
// npm update lodash --save (will update only lodash)
// npm update -g (will update globally installed packages)
// npm update -g npm (will update npm)
// npm audit (will check for vulnerabilities)
// npm audit fix (will fix vulnerabilities)
// npm list (will show all installed packages)
// npm list --depth=0 (will show only top level packages)
// npm list --depth=1 (will show only top level and first level packages)
// npm list --depth=0 --json (will show all installed packages in json format)
// npm audit fix --force (will fix vulnerabilities and force install packages that have vulnerabilities and are not updated yet)
// ^ - caret - will update to latest minor version - if we have 1.2.3 and latest is 1.3.0 it will update to 1.3.0
// ~ - tilde - will update to latest patch version - if we have 1.2.3 and latest is 1.2.4 it will update to 1.2.4
// to check all global packages installed on your machine run: npm list -g --depth=0\
// npm root -g (will show where global packages are installed)
// npm config get prefix (will show where global packages are installed)
// npm config set prefix "C:\Program Files\nodejs" (will change global packages installation folder)
// npm config set prefix "C:\Users\Zlatimir\AppData\Roaming\npm" (will change global packages installation folder)

