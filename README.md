# DeviceStatusList
Monitor the online status of Devices/Websites from one page. Server uses MongoDB to store your devices/websites. The Status will tell you whether the endpoint is online or not, clicking on the button will open a new tab going to that address.

# Prerequisites
* NodeJS (Download at https://nodejs.org/en/)
* NPM
* MongoDB (Download at https://www.mongodb.com/download-center/community)

# Installation

### Preparing MongoDB
At least one database and collection needs to be configured in mongoDB, after you installed mongoDB, you can use MongoDB Compass to configure the database and collection(https://www.mongodb.com/download-center/compass).
Remember the database and collection names!


### Prepare Web Files
```
git clone https://github.com/jackbmccarthy/DeviceStatusList.git
cd DeviceStatusList
npm install
```

### Enter Your Server Settings
Edit these settings in `server.js` to match your MongoDB Settings, and the port you want your application to listen on:
```
// Change the Database, Collection, and Server Connection String according to your information.
const mongoDBDatabase = "canon"
const mongoDBCollection = "printers"

// This connection string is with no authentication on the localhost.
const mongoDBServerConnectionString = "mongodb://127.0.0.1:27017"

//Change this to configure the port that the application will be listening on.
const listeningPort = 80
```

### Customize the interface settings
In the `/src/config.js`:
```
//Change the values here to change the Column Header
columnHeader:{
    //First Column
    name: "Printer Model",
    //Second Column
    hostnameOrIP: "IP Address",
    //Third Column
    status: "Status",
    //Fourth Column
    notesOrComments: "Notes"
},
statusText:{
    //Changing this value changes the text when the device is either online or offline
    offline:"Offline",
    online: "Online"
},
```

### Create the build
```
npm run-script build
```

### Start the server
```
node server.js
```

