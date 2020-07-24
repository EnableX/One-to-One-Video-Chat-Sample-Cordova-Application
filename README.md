# 1-to-1 RTC: A Sample Cordova App with EnableX Cordova Toolkit

This is a Sample Cordova App demonstrates the use of EnableX (https://www.enablex.io) platform Server APIs and Cordova Toolkit.  It allows developers to ramp up on app development by hosting on their own devices. 

This App creates a virtual Room on the fly  hosted on the Enablex platform using REST calls and uses the Room credentials (i.e. Room Id) to connect to the virtual Room as a mobile client.  The same Room credentials can be shared with others to join the same virtual Room to carry out a RTC (Real Time Communication) session. 

> EnableX Developer Center: https://developer.enablex.io/

## 1. How to get started

### 1.1 Pre-Requisites

#### 1.1.1 App Id and App Key 

* Register with EnableX [https://www.enablex.io] 
* Login to the EnableX Portal
* Create your Application Key
* Get your App ID and App Key delivered to your Email


#### 1.1.2 Sample Cordova Application 

* Clone or download this Repository [https://github.com/EnableX/One-to-One-Video-Chat-Sample-Cordova-Application.git] 

#### 1.1.3 Test Application Server

You need to setup an Application Server to provision Web Service API for your Cordova Application to communicate enabling Video Session. 

To help you to try our Cordova Application quickly, without having to setup Applciation Server, this Application is shipped pre-configured to work in a "try" mode with EnableX hosted Application Server i.e. https://demo.enablex.io. 

Our Application Server restricts a single Session Duation to 10 minutes, and allows 1 moderator and note more than 3 Participant in a Session.

Once you tried EnableX Cordova Sample Application, you may need to setup your own  Application Server and verify your Application to work with your Application Server.  More on this, read Point 2 later in the Document.



#### 1.1.4 Configure Cordova Sample Client 

* Open the Cordova sample App
* Go to index.js and change the following:
    ``` 
    /* To try the app with Enablex hosted service you need to set the kTry = true */
        var kTry      = true;
    /*Your webservice host URL, Keet the defined host when kTry = true */
          var kBasedURL = "https://demo.enablex.io/";
    /*The following information required, Only when kTry = true, When you hosted your own webservice remove these fileds*/
    
    /*Use enablec portal to create your app and get these following credentials*/
          var kAppId    = "AppId";
          var kAppkey   = "AppKey";

    ``

 Note: The distributable comes with demo username and password for the Service.

#### 1.1.5 To install the EnableX Cordova plugin

* Run the following command in the root of your project:
    
    `cordova plugin add enablex-cordova-plugin@latest`

#### 1.1.6 To remove Enalex Cordova plugin

* Run the the following command in the root of your project:

    `cordova plugin remove enablex-cordova-plugin`

### 1.2 Walkthrough Cordova Sample Application 

#### 1.2.1 Pre-Requisites:

Make sure You have Cordova 3.5.0 or greater installed. If you haven't, take a look at the [Cordova instructions](http://cordova.apache.org/docs/en/3.5.0/guide_cli_index.md.html) Page.

1. Install [node.js](https://nodejs.org/)

2. Install Cordova: `npm install -g cordova`

3. Install and update [Xcode](https://developer.apple.com/xcode/) (you will need a Mac)

4. Install and update [Android Studio](https://developer.android.com/studio/index.html)

#### 1.2.2 Run The Application:

##### Note: Please make sure to run the commands in the same order as below

1. Clone this repo

2. In your terminal, change your directory to the root of the sample project you want to run.

3. Run the command:

        npm install
    to install required node modules

4. Run the command:

        cordova platform add ios    //to add iOS your project
        cordova platform add android // to add android project

5. Configuring the application
    Before running the application, you need to configure below as describe step 1.1.4.
    ``` 
    var userName = "USERNAME"  /* HTTP Basic Auth Username of App Server */
    var password = "PASSWORD"  /* HTTP Basic Auth Password of App Server */
    var kBaseURL = "FQDN"      /* FQDN of of App Server URL */
     ```    
6. Run the command to enable multidex.
    ```
    cordova plugin add cordova-plugin-enable-multidex 
    ```

6. Run the command
    ```
    cordova run ios  // to run iOS project
    cordova run android // to run Android project
    ```

### 1.3 Test

#### 1.3.1 Open the App

* Open the App in your Device. You get a form to enter Credentials i.e. Name & Room Id.
* You need to create a Room by clicking the "Create Room" button.
* Once the Room Id is created, you can use it and share with others to connect to the Virtual Room to carry out a RTC Session either as a Moderator or a Participant (Choose applicable Role in the Form).

Note: Only one user with Moderator Role allowed to connect to a Virtual Room while trying with EnableX Hosted Service. Your Own Application Server may allow upto 5 Moderators.

Note:- If you used any emulator/simulator your local stream will not create. It will create only on real device.

## 2 Setup Your Own Application Server

You may need to setup your own Application Server after you tried the Sample Application with EnableX hosted Server. We have differnt variant of Appliciation Server Sample Code, pick one in your preferred language and follow instructions given in respective README.md file.

*NodeJS: [https://github.com/EnableX/Video-Conferencing-Open-Source-Web-Application-Sample.git]
*PHP: [https://github.com/EnableX/Group-Video-Call-Conferencing-Sample-Application-in-PHP]

Note the following:

* You need to use App ID and App Key to run this Service.
* Your Cordova Client End Point needs to connect to this Service to create Virtual Room and Create Token to join session.
* Application Server is created using EnableX Server API, a Rest API Service helps in provisioning, session access and pos-session reporting.  

To know more about Server API, go to:
https://developer.enablex.io/latest/server-api/

## 3. Getting Started on your Project:

All your editing will be done in your www folder.

All JavaScript code should be written in `onDeviceReady` function in `/js/index.js` because it is executed after all dependencies has loaded.

In the onDeviceReady, Registered all event listener to receive callback in the running conference.
After callback registered, User needs to call joinRoom().
    
``` 
    var videoSize = {
          minWidth: 320,
          minHeight: 180,
          maxWidth: 1280,
          maxHeight: 720,
        };

        var streamOpt = {
          audio: true,
          video: true,
          data: true,
          audioOnlyMode: false,
          framerate: 30,
          maxVideoBW: 1500,
          minVideoBW: 150,
          videoSize: videoSize,
          audioMuted: false,
          videoMuted: false,
          maxVideoLayers: 1,
          name: "Shashank"
        };

        var playerConfiguration = {
          audiomute: true,
          videomute: true,
          bandwidth: true,
          screenshot: true,
          avatar: true,
          iconHeight: 30,
          iconWidth: 30,
          avatarHeight: 200,
          avatarWidth: 200,
        };


        var roomOpt = {
          allow_reconnect: true,
          number_of_attempts: 3,
          timeout_interval: 15,
          activeviews: "view",
          playerConfiguration: playerConfiguration,
          forceTurn: false,
          chat_only: false,
        };
     
    window.EnxCordovaPlugin.joinRoom(result.token, streamOpt, roomOpt);
``` 
After joining room `onRoomConnected` listener is called. In this listener you have to initiate local view and remote view by following function.

```
    // To init local view
    var initLocalViewOptions = {
        height: 130,
        width: 100,
        margin_top: 50,
        margin_left: 0,
        margin_right: 15,
        margin_bottom: 00,
        position: "right"
      };
    window.EnxCordovaPlugin.initLocalView(initLocalViewOptions, function (data) {
        console.log(JSON.stringify(data.data));
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
      
    // To init Remote view
     var initRemoteViewOptions = {
        height: 1020,
        width: 480,
        margin_top: 50,
        margin_left: 0,
        margin_right: 15,
        margin_bottom: 00,
        position: "right"
      };

    window.EnxCordovaPlugin.initRemoteView(initRemoteViewOptions, function (data) {
        console.log(JSON.stringify(data.data));
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
```

For mute/UnMute Audio

```
    window.EnxCordovaPlugin.muteSelfAudio(true/false);
    true - mute
    falsw - unmute
```
For mute/UnMute Video.

```
    window.EnxCordovaPlugin.muteSelfVideo(true/false);
    true - mute
    falsw - unmute
```

Registered all Listener in onDeviceReady function
```
onDeviceReady: function() {
    // Do Your Stuff Here!
window.EnxCordovaPlugin.addEventListner("onRoomConnected", function (data) {
            console.log(JSON.stringify(data.data));
            });
window.EnxCordovaPlugin.addEventListner("onRoomError", function (data) {
            console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onEventError", function (data) {
        console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onAudioEvent", function (data) {
        console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onVideoEvent", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onRoomDisConnected", function (data) {
          console.log(+ JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onNotifyDeviceUpdate",function (data) {
           console.log( JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onScreenSharedStarted", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onScreenSharedStopped", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onCanvasStarted", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onCanvasStopped", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onUserConnected", function (data) {
          console.log(JSON.stringify(data.data));
        });
window.EnxCordovaPlugin.addEventListner("onUserDisConnected", function (data) {
          console.log(JSON.stringify(data.data));
        });
    }
```
## 4 Cordova Toolkit

This Sample Applcation uses EnableX Cordova Toolkit to communicate with EnableX Servers to initiate and manage Real Time Communications. You might need to update your Application with latest version of EnableX cordova Toolkit time as and when a new release is avaialble.   

## 4 Demo

EnableX provides hosted Vemo Application of different use-case for you to try out.

1. Try a quick Video Call: https://try.enablex.io
2. Try Apps on Demo Zone: https://portal.enablex.io/demo-zone/
3. Try Meeting & Webinar:  https://www.enablex.io/ucaas/
