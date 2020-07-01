/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    /* To try the app with Enablex hosted service you need to set the kTry = true */
        var kTry      = true;
    /*Your webservice host URL, Keet the defined host when kTry = true */
          var kBasedURL = "https://demo.enablex.io/";
    /*The following information required, Only when kTry = true, When you hosted your own webservice remove these fileds*/
    
    /*Use enablec portal to create your app and get these following credentials*/
          var kAppId    = "AppId";
          var kAppkey   = "AppKey";

  

    var auiodMute = false;
    var videoMute = false;
    
    document.getElementById("div_videoButton").style.display = "none";
    

    var hedare = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
    
    console.log("hedare Event: " + hedare);
    $("#createRoom").click(function(){
      var nameText = document.getElementById("name").value;
    if(nameText.length == 0){
      alert("Enter Your name");
      return;
    }
      $.ajax({
          url: kBasedURL + "createRoom",
          type: "POST",
          headers: hedare,
      success: function(result){
          // alert(result.result);
          console.log("hedare Event: " + result.room);
          var roomDetails =  result.room;
          console.log("hedare Event: " + roomDetails.room_id);
              document.getElementById("roomid").value = roomDetails.room_id;
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error Message" + textStatus + jqXHR.responseText);
          }
      });
    });

    $("#joinButton").click(function () {
        var nameText = document.getElementById("name").value;
        var roomID = document.getElementById("roomid").value;
        var loginString = {"name": nameText, "role": "participant", "user_ref": "2236", "roomId": roomID };
        console.log('loginString Event: ' + loginString);
        $.ajax({
          url: kBasedURL + "createToken",
          type: "POST",
          data: loginString,
          headers: hedare,
        success: handleResult,
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error Message" + textStatus + jqXHR.responseText);
        }
      });
      function handleResult(result) {
        console.log('Excelsior! Response ' + result.token);
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
          activeviews: "list",
          allow_reconnect: true,
          number_of_attempts: 3,
          timeout_interval: 15,
          playerConfiguration: playerConfiguration,
          forceTurn: false,
          chat_only: false,
        };
        window.EnxCordovaPlugin.joinRoom(result.token, streamOpt, roomOpt);
        $("#muteAudio").click(function () {
          if(!auiodMute){
            window.EnxCordovaPlugin.muteSelfAudio(true);
          }
          else{
            window.EnxCordovaPlugin.muteSelfAudio(false);
          }
        });

        $("#muteVideo").click(function () {
          if(!videoMute){
            window.EnxCordovaPlugin.muteSelfVideo(true);
          }
          else{
            window.EnxCordovaPlugin.muteSelfVideo(false);
          }
          
        });
        $("#switchCamera").click(function () {
          window.EnxCordovaPlugin.switchCamera(false, function (data) {
            console.log('Excelsior succuss! Switch Camera ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#hangOn").click(function () {
          window.EnxCordovaPlugin.disconnect(false, function (data) {
            console.log('Excelsior succuss! hideSelfView ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#Speaker").click(function () {
          window.EnxCordovaPlugin.getSelectedDevice(function(data){
            console.log('Excelsior succuss! getSelectedDevice ' + JSON.stringify(data.data));
            var currentDevice  = data.data;
            window.EnxCordovaPlugin.getDevices(function(data){
              console.log('Excelsior succuss! getDevices ' + JSON.stringify(data.data));
                //var allconnectedMedia  = JSON.stringify(data.data);
                var connectedMedia = data.data;
                console.log("fileter media " + connectedMedia);
                var meida;
                for (meida of connectedMedia) {
                  if(meida === currentDevice){
                    console.log("Available Media" + meida);
                  }
                  else{
                    window.EnxCordovaPlugin.switchMediaDevice(meida, function (data) {
                      console.log('Excelsior succuss! switchMediaDevice ' + JSON.stringify(data.data));
                    }, function (err) {
                        console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
                    });
                    break;
                  }
                }
              
            })
          })
        });
        window.EnxCordovaPlugin.addEventListner("onRoomConnected", function (data) {
          console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));
          document.getElementById("joiningDiv").style.display = "none";
          //document.getElementById("conferenceDiv").style.display = "block";
          document.getElementById("div_videoButton").style.display = "block";
          initLocalView();
          initRemoteView();
        });
        window.EnxCordovaPlugin.addEventListner("onRoomDisConnected", function (data) {
          console.log('Excelsior succuss! onRoomDisConnected ' + JSON.stringify(data.data));
          document.getElementById("joiningDiv").style.display = "block";
          document.getElementById("div_videoButton").style.display = "none";
          //document.getElementById("conferenceDiv").style.display = "none";
        });
        window.EnxCordovaPlugin.addEventListner("onAudioEvent", function (data) {
          console.log('Excelsior succuss! onAudioEvent ' + JSON.stringify(data.data.result));
          var response = data.data;
          //var msg = JSON.stringify(data.data.msg);
          console.log("audio msg" + response.msg);
          if(response.msg === "Audio Off"){
            auiodMute = true;
            document.getElementById("muteAudio").src = "img/mute_audio.png";
          }
          else{
            auiodMute = false;
            document.getElementById("muteAudio").src = "img/unmute_audio.png";
          }
        });
        window.EnxCordovaPlugin.addEventListner("onVideoEvent", function (data) {
          console.log('Excelsior succuss! onVideoEvent ' + JSON.stringify(data.data));
          var response = data.data;
          console.log("Video msg" + response.msg);
          if(response.msg === "Video Off"){
            videoMute = true;
            document.getElementById("muteVideo").src = "img/mute_video.png";
          }
          else{
            videoMute = false;
            document.getElementById("muteVideo").src = "img/unmute_video.png";
          }
          
        });
        window.EnxCordovaPlugin.addEventListner("onEventError", function (data) {
          console.log('Excelsior EventError! onEventError ' + JSON.stringify(data.data));
        });
        window.EnxCordovaPlugin.addEventListner("onNotifyDeviceUpdate", function (data) {
          console.log('Excelsior EventError! onNotifyDeviceUpdate ' + JSON.stringify(data.data));
          var deviceName  = data.data;
          if(deviceName === "EARPIECE"){
            document.getElementById("Speaker").src = "img/mute_speaker.png";
          }
          else{
            document.getElementById("Speaker").src = "img/unmute_speaker.png";
          }
        });
      }
    });
    //Init LocalView
    function initLocalView() {
      console.log('Excelsior initLocalView! ');
      //var clientHeight = document.getElementById('conferenceDiv').clientHeight + 20;
      var initLocalViewOptions = {
        height: 130,
        width: 100,
        margin_top: 50,
        margin_left: 0,
        margin_right: 15,
        margin_bottom: 10,
        position: "top"
      };
      window.EnxCordovaPlugin.initLocalView(initLocalViewOptions, function (data) {
        console.log('Local player Excelsior succuss! ' + JSON.stringify(data.data));
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
    }
    function initRemoteView() {
      console.log('Excelsior initRemoteView! ');
      //var clientHeight = document.getElementById('conferenceDiv').clientHeight;
      var clientHeight = document.getElementById('div_videoButton').clientHeight;
      console.log('Excelsior initRemoteView! ' + clientHeight);
      var initRemoteViewOptions = {
        margin_top: 22,
        margin_bottom : (clientHeight - 22)
      };
      window.EnxCordovaPlugin.initRemoteView(initRemoteViewOptions, function (data) {
        console.log('Remore Player Excelsior succuss! ' + JSON.stringify(data.data));
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
    }
  },
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();
