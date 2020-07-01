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
    // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    //window.EnxCordovaPlugin.getPrint();
    document.getElementById("conferenceDiv").style.display = "none";
    document.getElementById("div_videoButton").style.display = "none";
    // var url = "https://meeting-demo-qa.enablex.io/createToken/";
    // var loginString = "name=" + "Jay" + "&role=" + "participant" + "&user_ref=" + "2236" + "&roomId=" + "5ee753e657151f51c8f78e63";
    var url = "https://vc-mt.vcloudx.com/createToken/";

    var loginString = { "name": "Jay", "role": "participant", "user_ref": "2236", "roomId": "5ea01a8e5e981a058b307222" };
    $("#joinButton").click(function () {
      // window.EnxCordovaPlugin.getPrint();
      console.log('loginString Event: ' + loginString);
      console.log('url Event: ' + url);
      $.ajax({
        url: url,
        type: "POST",
        data: loginString,
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
          window.EnxCordovaPlugin.muteSelfAudio(true);
        });

        $("#muteVideo").click(function () {
          window.EnxCordovaPlugin.muteSelfVideo(true);
        });

        $("#unmuteAudio").click(function () {
          window.EnxCordovaPlugin.muteSelfAudio(false);
        });

        $("#unmuteVideo").click(function () {
          window.EnxCordovaPlugin.muteSelfVideo(false);
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
          var deviceName = "Speaker";
          window.EnxCordovaPlugin.switchMediaDevice(deviceName, function (data) {
            console.log('Excelsior succuss! switchMediaDevice ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        
        window.EnxCordovaPlugin.addEventListner("onRoomConnected", function (data) {
          console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));
          document.getElementById("joiningDiv").style.display = "none";
          document.getElementById("conferenceDiv").style.display = "block";
          document.getElementById("div_videoButton").style.display = "block";
          initLocalView();
          initRemoteView();
        });
        window.EnxCordovaPlugin.addEventListner("onRoomDisConnected", function (data) {
          console.log('Excelsior succuss! onRoomDisConnected ' + JSON.stringify(data.data));
          document.getElementById("joiningDiv").style.display = "block";
          document.getElementById("div_videoButton").style.display = "none";
          document.getElementById("conferenceDiv").style.display = "none";
        });
        window.EnxCordovaPlugin.addEventListner("onAudioEvent", function (data) {
          console.log('Excelsior succuss! onAudioEvent ' + JSON.stringify(data.data));
        });
        window.EnxCordovaPlugin.addEventListner("onVideoEvent", function (data) {
          console.log('Excelsior succuss! onVideoEvent ' + JSON.stringify(data.data));
          var x = data.data.msg;
        });
        window.EnxCordovaPlugin.addEventListner("onEventError", function (data) {
          console.log('Excelsior EventError! onEventError ' + JSON.stringify(data.data));
        });
        window.EnxCordovaPlugin.addEventListner("onNotifyDeviceUpdate", function (data) {
          console.log('Excelsior EventError! onNotifyDeviceUpdate ' + JSON.stringify(data.data));
        });
      }
    });
    //Init LocalView
    function initLocalView() {
      console.log('Excelsior initLocalView! ');
      var clientHeight = document.getElementById('conferenceDiv').clientHeight + 20;
      var initLocalViewOptions = {
        height: 130,
        width: 100,
        margin_top: clientHeight,
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
      var clientHeight = document.getElementById('conferenceDiv').clientHeight;
      console.log('Excelsior initRemoteView! ' + clientHeight);
      var initRemoteViewOptions = {
        margin_top: clientHeight
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
