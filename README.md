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

### Development

When working on the project locally you similarly need to make sure you have Node installed on your system. Clone the repo then install the Node dependencies, `npm i`. You can easily create builds and run them immediately in the browser with the `npm run now` script, this allows you to develop the app like a regular React site without having to install it as an extension.