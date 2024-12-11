#EnvLoader

[ ![Codeship Status for tqc/envloader](https://codeship.com/projects/527d41a0-1b30-0133-5ec7-7e346f2e432c/status?branch=master)](https://codeship.com/projects/94440)

Loads a .env file into process.env for when you can't use foreman

##Installation

    npm install envloader


##Usage

To load ./.env

    require("envloader").load();

To load ../.env 

    require("envloader").load("..");
