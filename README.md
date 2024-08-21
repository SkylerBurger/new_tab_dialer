# Chrome Extension - New Tab Dialer

Working towards a clone of the [Speed Dial [FVD]](https://chrome.google.com/webstore/detail/speed-dial-fvd-new-tab-pa/llaficoajjainaijghjlofdfmbjpebpa) Chrome extension I have been using for years.

This project is still in very early development so the structure of the config file may change significantly.

## Set Up

### Overview

Until a future point where a build artifact is uploaded to the Releases of this repo, we need to do the following:

- Build the application locally.
- Store it somewhere safe.
- Tell Chrome to install the extension.

### Prerequisites

The extension is a React application so Node.js is required for development and to create a build locally. I recommend using [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#intro) if you need to install Node. 

### Installing

1. Clone this git repository to your computer.
2. Using a terminal, navigate to the root of the directory and install the required Node packages, `npm i`. 
3. Create a build of the application, `npm run build`. This will create a `build` directory in the root of the repository.
4. Copy the `build` directory to a location on your computer where you'd like your personal Chrome extensions to live. I personally recommend something like `Documents/My Chrome Extensions`. Finally, rename the copied `build` directory to something that makes sense, like "New Tab Dialer".
5. In Chrome, go to Extensions > Manage Extensions > Load Unpacked. Then navigate to the renamed build directory, "New Tab Dialer" in this example.
6. Open a new Chrome Tab then enter the URL of an accessible copy of your configuration file to get started. (Soon you'll be able to start without a pre-existing config file.) You can use the `example/config.json` file to write in your own Dial Groups and Dials, just upload it somewhere that can be accessed by a URL, I recommend AWS S3.

### The Configuration File

The current version of the extension starts by checking `localStorage` for a saved config or by loading a configuration file by URL. In the future you'll be able to start from scratch but for now you have to supply a config as a starting point. There is an `example/config.json` file you can use as a starter.

The config file needs to be uploaded somewhere that allows the raw file to be requested by URL. I happen to be using an AWS S3 bucket to hold my config file but there are many options.

#### Hosting Your Config on GitHub Gist

One free, simple, and quick solution is to host your config file as a gist. Gist is GitHub's service for sharing code snippets and just happens to meet the needs of hosting a New Tab Dialer configuration file using these simple steps:

1. Create an account and/or sign in to [gist.github.com](https://gist.github.com/).
2. Click on the "plus" symbol in the top-right corner to create a new gist. 
3. Paste the contents of your config file, or the `example/config.json` file, into the body of the gist.
4. Give the gist a filename and extension of `.json`.
5. At the bottom-right corner choose to either "Create secret gist" or "Create public gist". I recommend creating a secret gist otherwise the contents of your config are publicly visible to anyone. If you mark the gist as "secret", the gist is still technically visible by URL, but it is not discoverable. So weigh those concerns when determining if hosting on Gist is right for you.
6. Once the gist has been created, click on the "Raw" button located near the top-right of the file.
7. After being redirected to the raw file view, copy the URL in your browser and supply that to your New Tab Dialer extension at startup or in the Settings view.

### Development

When working on the project locally you similarly need to make sure you have Node installed on your system. Clone the repo then install the Node dependencies, `npm i`. You can easily create builds and run them immediately in the browser with the `npm run now` script, this allows you to develop the app like a regular React site without having to install it as an extension.

This project uses `prettier` for JavaScript formatting. Run `npm run format` to perform a formatting pass before committing.

New Tab Dialer's current configuration is saved in `localStorage` under the key `"dialer-config"`. You can easily delete this entry if you want to purge the existing config and load a new one by URL.