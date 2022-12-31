const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Open route viewer on window
  openWindow: (args) => ipcRenderer.invoke('open-window', args)
});