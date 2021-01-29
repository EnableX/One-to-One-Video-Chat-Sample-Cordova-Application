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
    //window.EnxRtc.getPrint();
    document.getElementById("conferenceDiv").style.display = "none";
    document.getElementById("div_videoButton").style.display = "none";
    var url = "https://meeting-demo-qa.enablex.io/createToken/";
     var loginString = "name=" + "Jay" + "&role=" + "participant" + "&user_ref=" + "2236" + "&roomId=" + "5f83f95f3a8ad03af54eab4a";
    //  var url = "https://vc-mt.vcloudx.com/createToken/";
    // var loginString = { "name": "Jay", "role": "moderator", "user_ref": "2236", "roomId": "5ee753e657151f51c8f78e63" };
    $("#joinButton").click(function () {
      // window.EnxRtc.getPrint();
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
          maxHeight: 720
        };
        var streamOpt = {
          audio: true,
          video: true,
          data: true,
          audioOnlyMode: false,
          framerate: 30,
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
        window.EnxRtc.joinRoom(result.token, streamOpt, roomOpt, function (data) {
          console.log('Excelsior succuss! Switch Camera ' + JSON.stringify(data.data));
          document.getElementById("joiningDiv").style.display = "none";
          document.getElementById("conferenceDiv").style.display = "block";
          document.getElementById("div_videoButton").style.display = "block";
          initLocalView();
          initRemoteView();
          initEventListner();
        }, function (err) {
          console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
        });
        $("#muteAudio").click(function () {
          window.EnxRtc.muteSelfAudio(true);
        });

        $("#muteVideo").click(function () {
          window.EnxRtc.muteSelfVideo(true);
        });

        $("#unmuteAudio").click(function () {
          window.EnxRtc.muteSelfAudio(false);
        });

        $("#unmuteVideo").click(function () {
          window.EnxRtc.muteSelfVideo(false);
        });
        $("#switchCamera").click(function () {
          window.EnxRtc.switchCamera(false, function (data) {
            console.log('Excelsior succuss! Switch Camera ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#hangOn").click(function () {
          window.EnxRtc.disconnect(false, function (data) {
            console.log('Excelsior succuss! hideSelfView ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#hideLocalView").click(function () {
          window.EnxRtc.hideSelfView(true, function (data) {
            console.log('Excelsior succuss! hideSelfView ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#UnhideLocalView").click(function () {
          window.EnxRtc.hideSelfView(false, function (data) {
            console.log('Excelsior succuss! hideSelfView ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error hideSelfView ' + JSON.stringify(err));
          });
        });
        $("#resizeLocalView").click(function () {
          var resizeViewOptions = {
            height: 200,
            width: 200,
            margin_top: 50,
            margin_left: 0,
            margin_right: 15,
            margin_bottom: 20,
            position: "bottom"
          };
          window.EnxRtc.resizeLocalView(resizeViewOptions, function (data) {
            console.log('Excelsior succuss! resizeLocalView ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        $("#Speaker").click(function () {
          var deviceName = "Speaker";
          window.EnxRtc.switchMediaDevice(deviceName, function (data) {
            console.log('Excelsior succuss! switchMediaDevice ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        $("#Earpics").click(function () {
          var deviceName = "EARPIECE";
          window.EnxRtc.switchMediaDevice(deviceName, function (data) {
            console.log('Excelsior succuss! switchMediaDevice ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });

        $("#Current").click(function () {
          window.EnxRtc.getSelectedDevice(function (data) {
            console.log('Excelsior succuss! getSelectedDevice ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        $("#allDevice").click(function () {
          window.EnxRtc.getDevices(function (data) {
            console.log('Excelsior succuss! getDevices ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        $("#resizeRemoteView").click(function () {
          var clientHeight = document.getElementById('conferenceDiv').clientHeight;
        var clintButtonHeight = document.getElementById('div_videoButton').clientHeight;
          var resizeViewOptions = {
            height: 200,
            width: 200,
            margin_top: clientHeight,
            margin_left: 0,
            margin_right: 15,
            margin_bottom: clintButtonHeight,
            position: "left"
          };
          window.EnxRtc.resizeRemoteView(resizeViewOptions, function (data) {
            console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeViewOptions ' + JSON.stringify(err));
          });
        });
        $("#DragView").click(function () {
          console.log('Uh oh... error startDragging');
          window.EnxRtc.startDragging("remote", true, function (data) {
            console.log('Excelsior succuss! startDragging ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error startDragging ' + JSON.stringify(err));
          });
        });
        $("#extendconfernceduration").click(function () {
          console.log('Uh oh... error extendconfernceduration');
          window.EnxRtc.extendConferenceDuration();
        });
        $("#lockRoom").click(function () {
          console.log('Uh oh... error LockRoom');
          window.EnxRtc.lockRoom();
        });
        $("#unLockRoom").click(function () {
          console.log('Uh oh... error unLockRoom');
          window.EnxRtc.unLockRoom();
        });
        $("#dropUser").click(function () {
          console.log('Uh oh... error dropUser');
          window.EnxRtc.dropUser([clientid]);
        });
        $("#destroy").click(function () {
          console.log('Uh oh... error destroy');
          window.EnxRtc.destroy();
        });
        $("#hardMute").click(function () {
          console.log('Uh oh... error hardMute');
          window.EnxRtc.hardMute();
        });

        $("#hardUnMute").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.hardUnMute();
        });
        $("#hardUnMute").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.hardUnMute();
        });
        $("#startRecord").click(function () {
          console.log('Uh oh... error startRecord');
          window.EnxRtc.startRecord();
        });
        $("#stopRecord").click(function () {
          console.log('Uh oh... error stopRecord');
          window.EnxRtc.stopRecord();
        });
        $("#stopVideoTracksOnApplicationBackground").click(function () {
          console.log('Uh oh... error stopVideoTracksOnApplicationBackground');
          window.EnxRtc.stopVideoTracksOnApplicationBackground(true, true, function (data) {
            console.log('Excelsior succuss! startDragging ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error startDragging ' + JSON.stringify(err));
          });
        });
        $("#startVideoTracksOnApplicationForeground").click(function () {
          console.log('Uh oh... error startVideoTracksOnApplicationForeground');
          window.EnxRtc.startVideoTracksOnApplicationForeground(true, true, function (data) {
            console.log('Excelsior succuss! startVideoTracksOnApplicationForeground ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error startVideoTracksOnApplicationForeground ' + JSON.stringify(err));
          });
        });

        $("#enableStats").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.enableStats(true);
        });
        $("#disableStats").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.enableStats(false);
        });
        $("#switchUserRole").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.switchUserRole(clientid);
        });

        $("#makeOutboundCall").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.makeOutboundCall("918285200731");
        });

        $("#sendMessagePrivate").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.sendMessage("Shashank", false, [clientid]);
        });
        $("#sendMessageGroup").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.sendMessage("Shashank", true, []);
        });

        $("#sendUserData").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.sendUserData("Shashank", true, []);
        });

        $("#setAdvancedOptions").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.setAdvancedOptions([]);
        });

        $("#getAdvancedOptions").click(function () {
          console.log('Uh oh... error hardUnMute');
          window.EnxRtc.getAdvancedOptions();
        });

        $("#getClientId").click(function () {
          window.EnxRtc.getClientId(function (data) {
            console.log('Excelsior succuss! getClientId ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientId ' + JSON.stringify(err));
          });
        });
        $("#getRoomId").click(function () {
          window.EnxRtc.getRoomId(function (data) {
            console.log('Excelsior succuss! getRoomId ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
          });
        });
        $("#getClientName").click(function () {
          window.EnxRtc.getClientName(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#getLocalStreamID").click(function () {
          window.EnxRtc.getLocalStreamID(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#getUserList").click(function () {
          window.EnxRtc.getUserList(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });

        $("#getRoomMetadata").click(function () {
          window.EnxRtc.getRoomMetadata(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });

        $("#isConnected").click(function () {
          window.EnxRtc.isConnected(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });

        $("#enableProximitySensor").click(function () {
          window.EnxRtc.enableProximitySensor(true);
        });
        $("#getMode").click(function () {
          window.EnxRtc.getMode(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#getRole").click(function () {
          window.EnxRtc.getRole(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#whoAmI").click(function () {
          window.EnxRtc.whoAmI(function (data) {
            console.log('Excelsior succuss! getClientName ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#sendFiles").click(function () {
          window.EnxRtc.sendFiles(true, []);
        });

        $("#downloadFile").click(function () {
          window.EnxRtc.downloadFile({}, true);
        });

        $("#getAvailableFiles").click(function () {
          window.EnxRtc.getAvailableFiles(function (data) {
            console.log('Excelsior succuss! getAvailableFiles ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error getClientName ' + JSON.stringify(err));
          });
        });
        $("#StartAnnotation").click(function () {
          window.EnxRtc.startAnnotation(clientid);
        });
        $("#StopAnnotation").click(function () {
          window.EnxRtc.stopAnnotations();
        });
        function addScreenShare() {
          console.log('Excelsior initRemoteView! ');
          var clientHeight = document.getElementById('conferenceDiv').clientHeight;
          var clientbottom = document.getElementById('div_videoButton').clientHeight;
          var options = {
            margin_top: clientHeight,
            margin_bottom: clientbottom
          };
          window.EnxRtc.addScreenShare(options, function (data) {
            console.log('Excelsior succuss! ' + JSON.stringify(data.data));
            resizeRemoteViewSize()
          }, function (err) {
            console.log('Uh oh... error' + JSON.stringify(err));
          });
        }
        function removeScreenShare() {
          console.log('Excelsior initRemoteView! ');
          window.EnxRtc.removeScreenShare(function (data) {
            resizeRemoteViewtoFull()
            console.log('Excelsior succuss! ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error' + JSON.stringify(err));
          });
        }
        function addCanvasScreen() {
          console.log('Excelsior initRemoteView! ');
          var clientHeight = document.getElementById('conferenceDiv').clientHeight;
          var clientbottom = document.getElementById('div_videoButton').clientHeight;
          var options = {
            margin_top: clientHeight,
            margin_bottom: clientbottom
          };
          window.EnxRtc.addCanvasScreen(options, function (data) {
            console.log('Excelsior succuss! ' + JSON.stringify(data.data));
            resizeRemoteViewSize()
          }, function (err) {
            console.log('Uh oh... error' + JSON.stringify(err));
          });
        }
        function removeCanvasScreen() {
          console.log('Excelsior initRemoteView! ');
          window.EnxRtc.removeCanvasScreen(function (data) {
            resizeRemoteViewtoFull()
            console.log('Excelsior succuss! ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error' + JSON.stringify(err));
          });
        }
        function resizeRemoteViewtoFull(){
          console.log('Excelsior resizeRemoteViewtoFull! ');
          var clientHeight = document.getElementById('conferenceDiv').clientHeight;
          var clintButtonHeight = document.getElementById('div_videoButton').clientHeight;
          var resizeViewOptions = {
                margin_top: clientHeight,
                margin_bottom :clintButtonHeight
              };
              window.EnxRtc.resizeRemoteView(resizeViewOptions, function (data) {
                console.log('Excelsior resizeRemoteViewtoFull! ');
                console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));
              }, function (err) {
                console.log('Uh oh.....error resizeRemoteViewtoFull! ');
                console.log('Uh oh... error resizeViewOptions ' + JSON.stringify(err));
              });
        }
        function resizeRemoteViewSize(){
          var clientHeight = document.getElementById('conferenceDiv').clientHeight;
        var clintButtonHeight = document.getElementById('div_videoButton').clientHeight;
          var resizeViewOptions = {
            height: 200,
            width: 200,
            margin_top: 0,
            margin_left: 0,
            margin_right: 150,
            margin_bottom: clintButtonHeight + clientHeight,
            position: "left"
          };
          window.EnxRtc.resizeRemoteView(resizeViewOptions, function (data) {
            console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));
          }, function (err) {
            console.log('Uh oh... error resizeViewOptions ' + JSON.stringify(err));
          });
        }
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
      window.EnxRtc.initLocalView(initLocalViewOptions, function (data) {
        console.log('Local player Excelsior succuss! ' + JSON.stringify(data.data));
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
    }
    function initRemoteView() {
      console.log('Excelsior initRemoteView! ');
      var clientHeight = document.getElementById('conferenceDiv').clientHeight;
      console.log('Excelsior initRemoteView! ' + clientHeight);
    var clintButtonHeight = document.getElementById('div_videoButton').clientHeight;

      var initRemoteViewOptions = {
        margin_top: clientHeight,
        margin_bottom :clintButtonHeight
      };
      window.EnxRtc.initRemoteView(initRemoteViewOptions, function (data) {
        console.log('Remore Player Excelsior succuss! ' + JSON.stringify(data.data));
        window.EnxRtc.getDevices(function (data) {
          console.log('Excelsior succuss! getDevices ' + JSON.stringify(data.data));
        }, function (err) {
          console.log('Uh oh... error resizeLocalView ' + JSON.stringify(err));
        });
      }, function (err) {
        console.log('Uh oh... error' + JSON.stringify(err));
      });
    }

    function initEventListner(){
      window.EnxRtc.addEventListner("onRoomConnected", function (data) {
        console.log('Excelsior succuss! resizeViewOptions ' + JSON.stringify(data.data));

      });
      window.EnxRtc.addEventListner("onRoomDisConnected", function (data) {
        console.log('Excelsior succuss! onRoomDisConnected ' + JSON.stringify(data.data));
        document.getElementById("joiningDiv").style.display = "block";
        document.getElementById("div_videoButton").style.display = "none";
        document.getElementById("conferenceDiv").style.display = "none";
      });
      window.EnxRtc.addEventListner("onAudioEvent", function (data) {
        console.log('Excelsior succuss! onAudioEvent ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onVideoEvent", function (data) {
        console.log('Excelsior succuss! onVideoEvent ' + JSON.stringify(data.data));
        var x = data.data.msg;
        if (x === "Video Off") {
          document.getElementById("img_video").style.backgroundImage = "src('img/mute_video.png')";
        }
      });
      window.EnxRtc.addEventListner("onEventError", function (data) {
        console.log('Excelsior EventError! onEventError ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onNotifyDeviceUpdate", function (data) {
        console.log('Excelsior Success! onNotifyDeviceUpdate ' + JSON.stringify(data.data));
      });

      window.EnxRtc.addEventListner("onUserConnected", function (data) {
        console.log('Excelsior Success! onUserConnected ' + JSON.stringify(data.data));
        clientid = data.data.clientId
        console.log('Excelsior Success! clientid ' + clientid);
      });

      window.EnxRtc.addEventListner("onUserDisConnected", function (data) {
        console.log('Excelsior Success! onUserDisConnected ' + JSON.stringify(data.data));
      });


      window.EnxRtc.addEventListner("onConferencessExtended", function (data) {
        console.log('Excelsior Success! onConferencessExtended ' + JSON.stringify(data.data));
      });

      window.EnxRtc.addEventListner("onConferenceRemainingDuration", function (data) {
        console.log('Excelsior Success! onConferenceRemainingDuration ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAckLockRoom", function (data) {
        console.log('Excelsior Success! onAckLockRoom ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAckUnLockRoom", function (data) {
        console.log('Excelsior Success! onAckUnLockRoom ' + JSON.stringify(data.data));
      });

      window.EnxRtc.addEventListner("onLockedRoom", function (data) {
        console.log('Excelsior Success! onLockedRoom ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onUnLockedRoom", function (data) {
        console.log('Excelsior Success! onUnLockedRoom ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAckDropUser", function (data) {
        console.log('Excelsior Success! onAckDropUser ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAckDestroy", function (data) {
        console.log('Excelsior Success! onAckDestroy ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onHardMuted", function (data) {
        console.log('Excelsior Success! onHardMuted ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onReceivedHardMute", function (data) {
        console.log('Excelsior Success! onReceivedHardMute ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onHardUnMuted", function (data) {
        console.log('Excelsior Success! onHardUnMuted ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onReceivedHardUnMute", function (data) {
        console.log('Excelsior Success! onReceivedHardUnMute ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onGetAdvancedOptions", function (data) {
        console.log('Excelsior Success! onGetAdvancedOptions ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAdvancedOptionsUpdate", function (data) {
        console.log('Excelsior Success! onAdvancedOptionsUpdate ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onStartRecordingEvent", function (data) {
        console.log('Excelsior Success! onStartRecordingEvent ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onRoomRecordingOn", function (data) {
        console.log('Excelsior Success! onRoomRecordingOn ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onStopRecordingEvent", function (data) {
        console.log('Excelsior Success! onStopRecordingEvent ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onRoomRecordingOff", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onAcknowledgedSendData", function (data) {
        console.log('Excelsior Success! onStopRecordingEvent ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onMessageReceived", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onUserDataReceived", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onSwitchedUserRole", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onUserRoleChanged", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onOutBoundCallInitiated", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onDialStateEvents", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onUserDataReceived", function (data) {
        console.log('Excelsior Success! onRoomRecordingOff ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onScreenSharedStarted", function (data) {
        console.log('Excelsior Success! onScreenSharedStarted ' + JSON.stringify(data.data));
        addScreenShare();
      });
      window.EnxRtc.addEventListner("onScreenSharedStopped", function (data) {
        console.log('Excelsior Success! onScreenSharedStopped ' + JSON.stringify(data.data));
          removeScreenShare();
      });
      window.EnxRtc.addEventListner("onCanvasStarted", function (data) {
        console.log('Excelsior Success! onCanvasStarted ' + JSON.stringify(data.data));
        addCanvasScreen();
      });
      window.EnxRtc.addEventListner("onCanvasStopped", function (data) {
        console.log('Excelsior Success! onCanvasStopped ' + JSON.stringify(data.data));
          removeCanvasScreen();
      });
      window.EnxRtc.addEventListner("OnCapturedView", function (data) {
        console.log('Excelsior Success! OnCapturedView ' + JSON.stringify(data.data));
      });
      window.EnxRtc.addEventListner("onBandWidthUpdated", function (data) {
        console.log('Excelsior Success! onBandWidthUpdated ' + JSON.stringify(data.data));
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
