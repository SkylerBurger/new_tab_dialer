# Mynt Dialer - Chrome Extension

**Mynt (My New Tab) Dialer**

This project is working towards a clean, free to manage, alternative to the [Speed Dial [FVD]](https://chrome.google.com/webstore/detail/speed-dial-fvd-new-tab-pa/llaficoajjainaijghjlofdfmbjpebpa) Chrome extension.

## Set Up

### Overview

This extension is not currently offered through the Chrome Web Store so it needs to be manually installed.

### Prerequisites

The extension is a React application so [Node.js](https://nodejs.org/en) is required for development and to create a build locally. I recommend using [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#intro) if you need to install Node. 

### Installing

1. Clone this git repository to your computer.
2. Using a terminal, navigate to the root of the repo and install the required Node packages, `npm i`. 
3. Create a build of the application, `npm run build`. This will create a `build` directory in the root of the repository.
4. Copy the `build` directory to a location on your computer where you'd like your personal Chrome extensions to live. I personally recommend something like `Documents/My Chrome Extensions`. Finally, rename the copied `build` directory to something that makes sense, like "Mynt Dialer".
5. In Chrome, go to Extensions > Manage Extensions > Load Unpacked. Then navigate to the renamed build directory, "Mynt Dialer" in this example.
6. Open a new Chrome tab to use the extension. At startup you can either enter the public URL to a copy of your configuration file or begin creating your first group and dial in the UI. There is an example of a config file in `src/Demo/demo-config.json` that you can use if you'd like to start writing your own manually.

### The Configuration File

Mynt Dialer can read a config file when given a public URL, creating a downstream sync to your extension. If you use Mynt Dialer on multiple machines you only need to edit a single file, then prompt your devices to sync when desired.

#### Hosting Your Config on GitHub Gist

One free, simple, and quick solution is to host your config file as a gist. Gist is GitHub's service for sharing code snippets and just so happens to meet the needs of hosting a Mynt Dialer configuration file using these simple steps:

1. Create an account and/or sign in to [gist.github.com](https://gist.github.com/).
2. Click on the "plus" symbol in the top-right corner to create a new gist. 
3. Paste the contents of your config file, or the `src/Demo/demo-config.json` file, into the body of the gist.
4. Give the gist a filename and extension of `.json`.
5. At the bottom-right corner choose to either "Create secret gist" or "Create public gist". I recommend creating a secret gist otherwise the contents of your config are publicly discoverable to anyone. If you mark the gist as "secret", the gist is still technically publically visible by URL, but it is not discoverable through search or Gist's social feeds. So weigh those concerns when determining if hosting on Gist is right for you.
6. Once the gist has been created, click on the "Raw" button located near the top-right of the file.
7. After being redirected to the raw file view, copy the URL in your browser and supply that to your Mynt Dialer extension at startup or in the Settings view.

## Development

Setting up the development environment uses the same [Installing](#installing) instructions above. You can easily create builds and run them immediately in the browser with the `npm run now` script, this allows you to develop the app like a regular React site without having to install it as an extension.

Because this application is a Chrome Extension there may be functionality that is only avaialble when your code is loaded into the browser as an extension rather than a site (such as the Chrome API for downloading to the client's file system). Depending on what feature you are working on you may have to install/reload the extension in your browser between changes while developing.

This project uses `prettier` for JavaScript formatting. Use `npm run format` to perform a formatting pass before committing. There is a GitHub Action that will prevent unformatted files from being merged.

Mynt Dialer uses `localStorage` to hold state using Zustand's Persist integration as well as image metadata used to expire cached images. `caches` is also utilized to store dial and background images so they are not retrieved each time the extension is loaded. You may need to purge these two storage locations if you are having issues while developing.