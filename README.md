<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Python DVIC" />

  &#xa0;
</div>

<h1 align="center">Python DVIC</h1>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/GrandEmpereur" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

this is a IOT project created during the cours DVIC, the project is a python script that runs on a raspberry pi and sends data to a API that is hosted on JsonBin and the data is displayed on a ejs page.

## :sparkles: Features ##

:heavy_check_mark: PYTHON Script to get data from dht11 sensor and send it to API;\
:heavy_check_mark: API build with KOA && Axios;\
:heavy_check_mark: DataBase hosted on JsonBin;\

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [PYTHON](https://www.python.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JSONBIN.IO](https://jsonbin.io/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/), [Python](https://www.python.org/) and [Yarn](https://yarnpkg.com/) installed.

```bash

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/GrandEmpereur/python-dvic

# Access
$ cd python-dvic

# Install dependencies
$ yarn

# duplicate the .env.example file and rename it to .env.development and add that required data
  # JSONBIN
  JSONBIN_SECRET_KEY= "$2b$10$KuOAMdG1jiZBJe92jjJe5.vrohu.y3Qh5MguyGbdE6CwGfbGYxgQ2"
  JSONBIN_BIN_ID= "63ff4fe7ebd26539d0876d5a"

  # TWILIO
  TWILIO_ACCOUNT_SID= 'AC13baa3f5d73ddc8da2238b038825dad4'
  TWILIO_AUTH_TOKEN= "60a667a07333a2978de05bef839c8dba"
  TWILIO_NUMBER= "+12766638698"
  TWILIO_TO_PHONE_NUMBER= "YOUR PHONE NUMBER"

# Install vscode extension
$ install the vscode extension "Pico-W-Go"

# start the python script
$ connecte the raspberry pi to your computer and start the script

# Run the WebApp
$ yarn dev

# The server will initialize in the <http://localhost:4200>
```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/GrandEmpereur" target="_blank">{{GrandEmpereur}}</a>

&#xa0;

<a href="#top">Back to top</a>
