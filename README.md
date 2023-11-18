# Qiqi's Notebok Desktop Client
<p align="center">
  <img src="icon.png" />
</p>

## Note
> This project is depreciated and has been replaced by a new project [here](https://github.com/Qiqis-Notebook/qnb-client) 


## About
A simple application to launch Route Viewer as a mini 'always on top' window to see and control the route map while playing Genshin in windowed mode.


The application simply launches the web application onto the desktop application to support for keyboard shortcuts for navigation and view on top of your game. All the functionalities works the same as the web version, panning, zooming, etc.


This application is built for Windows and for Genshin in windowed mode.

**Instructions**
1. Go to the [Database Page](https://qiqis-notebook.com/database/routes) and find the route you want
2. Click on the play icon on the route and "Copy ID"
3. Open the desktop application
4. Paste the copied id and click "Search"

**Controls**
- Alt + Left Arrow : Previous marker
- Alt + Right Arrow : Next marker

Hint: Bind the controls onto your mouse/macro keys

# App
The application is built with Electron.

The execution path is as follow:
1. Read the route ID from input box
2. Pass the ID to Electron through IPC
3. Open the route viewer in the current window
4. Set the window properties
5. Register keyboard shortcuts

When the keyboard shortcut event is fired, it grabs the navigation button through the DOM and click it.

## Build
To build the application, run:

```
npm i
npm run package
```
The application is packaged by 'electron-builder' and will be in the 'dist' folder.

## Develop
To develop the application, you will need to uncomment the file loading in electron.js under the public folder then run:

```
npm i
npm run start
```

# Asset
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">Qiqi's Notebook Logo</span> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.instagram.com/merdikai/">Beya</a> is owned by the Qiqi's Notebook project and licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
