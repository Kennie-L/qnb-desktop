const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  dialog,
  shell,
} = require("electron");

const path = require("path");
const qnbURL = "https://qiqis-notebook.com";

const iconPath = process.platform !== "darwin" ? "favicon.ico" : "favicon.icns";

const template = [
  {
    role: "window",
    label: "Application",
    submenu: [
      {
        label: "Reload",
        role: "reload",
      },
      {
        label: "Restart",
        click: () => {
          app.relaunch({ execPath: process.env.PORTABLE_EXECUTABLE_FILE });
          app.quit();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    role: "window",
    label: "Community",
    submenu: [
      {
        label: "Discord",
        click: () => {
          shell.openExternal("https://discord.gg/xyddRPYSdD");
        },
      },
    ],
  },
  {
    role: "window",
    label: "Help",
    submenu: [
      {
        label: "Info",
        click: () => {
          dialog.showMessageBox(win, {
            title: "Controls",
            message:
              "Alt + Left arrow for Previous and Alt + Right arrow for Next",
            type: "info",
          });
        },
      },
      {
        label: "Updates",
        click: () => {
          shell.openExternal(
            "https://github.com/Kennie-L/qnb-desktop/releases"
          );
        },
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template);

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 400,
    height: 375,
    minWidth: 400,
    minHeight: 375,
    resizable: false,
    backgroundColor: "#000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, iconPath),
  });
  win.removeMenu();
  win.loadFile("index.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Unregister all shortcuts on exit
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

ipcMain.handle("open-window", (event, args) => {
  // Load route viewer
  win
    .loadURL(`${qnbURL}/embed/route/${args.url}`)
    .then(() => {
      // Set window properties for always on top
      win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
      win.setAlwaysOnTop(true, "normal");

      // Update menu bar
      win.setMenu(menu);

      // Show window
      win.show();

      // Register shortcuts
      globalShortcut.register("Alt+Left", () => {
        console.log("Left"); // Somehow improves the execution time of this function, likely due to timing, event loop or other factors, needs more investigation
        win.webContents.executeJavaScript(
          `document.getElementById("route-prev").click()`
        );
      });
      globalShortcut.register("Alt+Shift+Left", () => {
        console.log("Left");
        win.webContents.executeJavaScript(
          `document.getElementById("route-prev").click()`
        );
      });
      globalShortcut.register("Alt+Right", () => {
        console.log("Right");
        win.webContents.executeJavaScript(
          `document.getElementById("route-next").click()`
        );
      });
      globalShortcut.register("Alt+Shift+Right", () => {
        console.log("Right");
        win.webContents.executeJavaScript(
          `document.getElementById("route-next").click()`
        );
      });
    })
    .catch(() => {
      dialog.showMessageBox(win, "Unable to open route");
    });
});
