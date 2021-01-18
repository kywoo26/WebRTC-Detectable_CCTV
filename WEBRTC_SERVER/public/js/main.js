/**
 * Socket.io socket
 */
let socket;
/**
 * The stream object used to send media
 */
let localStream = null;
/**
 * All peer connections
 */
let peers = {}

// redirect if not https
if (location.href.substr(0, 5) !== 'https')
    location.href = 'https' + location.href.substr(4, location.href.length - 4)


//////////// CONFIGURATION //////////////////

/**
 * RTCPeerConnection configuration 
 */
const configuration = {
    "iceServers": [{
        "urls": "stun:stun.l.google.com:19302"
    },

    {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
    }
    ]
}

/**
 * UserMedia constraints
 */
let constraints = {
    audio: false,
    video: {
        width: {
            max: 300
        },
        height: {
            max: 300
        }
    }
}

/////////////////////////////////////////////////////////

constraints.video.facingMode = {
    ideal: "user"
}
var postnumber = 0;

function postFile(file) {
    filename = postnumber + ".png"
    //Set options as form data
    let formdata = new FormData();
    formdata.append("image", file, filename);
    if (postnumber == 1) {
        infowindow_1 = new kakao.maps.InfoWindow({
            content: '<img src="' + URL.createObjectURL(file) + '" alt="My Image" style = "height: 200px;">' // 인포윈도우에 표시할 내용
        });
    }
    else if (postnumber == 2) {
        infowindow_2 = new kakao.maps.InfoWindow({
            content: '<img src="' + URL.createObjectURL(file) + '" alt="My Image" style = "height: 200px;">' // 인포윈도우에 표시할 내용
        });
    }
    else if (postnumber == 3) {
        infowindow_3 = new kakao.maps.InfoWindow({
            content: '<img src="' + URL.createObjectURL(file) + '" alt="My Image" style = "height: 200px;">' // 인포윈도우에 표시할 내용
        });
    }
    else if (postnumber == 4) {
        infowindow_4 = new kakao.maps.InfoWindow({
            content: '<img src="' + URL.createObjectURL(file) + '" alt="My Image" style = "height: 200px;">' // 인포윈도우에 표시할 내용
        });
    }

    formdata.append("number", postnumber);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/changeImage', true);
    // xhr.open('POST', 'https://127.0.0.1:3012/changeImage', true);
    xhr.onload = function () {
        if (this.status === 200) {


            //draw the boxes
            // drawBoxes(objects);

            //Send the next image
            //imageCanvas.toBlob(postFile, 'image/jpeg');
        }
        else {
            console.error(xhr);
        }
    };
    xhr.send(formdata);
}
// enabling the camera at startup
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    console.log('Received local stream');

    localVideo.srcObject = stream;
    localStream = stream;

    init()


}).catch(() => {
    localVideo.srcObject = null;
    localStream = null;
    init()
    localVideo.style.height = "1px"

}


)
var bMarker_1 = 0;
var bMarker_2 = 0;
var bMarker_3 = 0;
var bMarker_4 = 0;
/**
 * initialize the socket connections
 */
function init() {
    socket = io()

    socket.on('initReceive', socket_id => {
        console.log('INIT RECEIVE ' + socket_id)
        addPeer(socket_id, false)

        socket.emit('initSend', socket_id)
    })

    socket.on('initSend', socket_id => {
        console.log('INIT SEND ' + socket_id)
        addPeer(socket_id, true)
    })

    var videos1_number = 1;
    var videos2_number = 1;
    var videos3_number = 1;
    var videos4_number = 1;

    socket.on('changeScreen', number => {
        if (localStream == null) {
            postnumber = number;
            var canvas = document.createElement("canvas");
            canvas.width = 320;
            canvas.height = 320;
            if (number == 1) {
                canvas.getContext('2d')
                    .drawImage(document.getElementById('videos_1').children[0], 0, 0, 320, 320);
            }
            else if (number == 2) {
                canvas.getContext('2d')
                    .drawImage(document.getElementById('videos_2').children[0], 0, 0, 320, 320);
            }
            else if (number == 3) {
                canvas.getContext('2d')
                    .drawImage(document.getElementById('videos_3').children[0], 0, 0, 320, 320);
            }
            else if (number == 4) {
                canvas.getContext('2d')
                    .drawImage(document.getElementById('videos_4').children[0], 0, 0, 320, 320);
            }


            canvas.toBlob(postFile, 'image/jpeg');
        }

        // if (number == 1) {
        //     var parentDOM = document.getElementById('videos_1');
        //     if (videos1_number) {
        //         parentDOM.children[0].style.height = "300px";
        //         videos1_number = 0;
        //     }
        //     else {
        //         parentDOM.children[0].style.height = "200px";
        //         videos1_number = 1;
        //     }

        // }
        // else if (number == 2) {
        //     var parentDOM = document.getElementById('videos_2');
        //     if (videos2_number) {
        //         parentDOM.children[0].style.height = "300px";
        //         videos2_number = 0;
        //     }
        //     else {
        //         parentDOM.children[0].style.height = "200px";
        //         videos2_number = 1;
        //     }
        // }
        // else if (number == 3) {
        //     var parentDOM = document.getElementById('videos_3');
        //     if (videos3_number) {
        //         parentDOM.children[0].style.height = "300px";
        //         videos3_number = 0;
        //     }
        //     else {
        //         parentDOM.children[0].style.height = "200px";
        //         videos3_number = 1;
        //     }
        // }
        // else if (number == 4) {
        //     var parentDOM = document.getElementById('videos_4');
        //     if (videos4_number) {
        //         parentDOM.children[0].style.height = "300px";
        //         videos4_number = 0;
        //     }
        //     else {
        //         parentDOM.children[0].style.height = "200px";
        //         videos4_number = 1;
        //     }
        // }
        // else if (number == 5) {
        //     var parentDOM = document.getElementById('videos');
        //     for (var i = 0; i < parentDOM.children.length; i++) {
        //         parentDOM.children[i].style.height = "300px";
        //     }
        // }
        // else if (number == 6) {
        //     var parentDOM = document.getElementById('videos');
        //     for (var i = 0; i < parentDOM.children.length; i++) {
        //         parentDOM.children[i].style.height = "500px";
        //     }
        // }
    })

    socket.on('changeImage', number => {
        var imageSrc = "../bang.png" // 마커이미지의 주소입니다    
        var imageSize = new kakao.maps.Size(32, 38); // 마커이미지의 크기입니다
        var imageOption = {};
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        if (number == 1) {
            marker_1.setImage(markerImage);
            bMarker_1 = 1;

        }
        else if (number == 2) {
            marker_2.setImage(markerImage);
            bMarker_2 = 1;
        }
        else if (number == 3) {
            marker_3.setImage(markerImage);
            bMarker_3 = 1;
        }
        else if (number == 4) {
            marker_4.setImage(markerImage);
            bMarker_4 = 1;
        }
    })
    socket.on('changeColor', number => {
        console.log(number)
    })

    socket.on('removePeer', socket_id => {
        console.log('removing peer ' + socket_id)
        removePeer(socket_id)
    })

    socket.on('disconnect', () => {
        console.log('GOT DISCONNECTED')
        for (let socket_id in peers) {
            removePeer(socket_id)
        }
    })

    socket.on('signal', data => {
        peers[data.socket_id].signal(data.signal)
    })
}

/**
 * Remove a peer with given socket_id. 
 * Removes the video element and deletes the connection
 * @param {String} socket_id 
 */
function removePeer(socket_id) {

    let videoEl = document.getElementById(socket_id)
    if (videoEl) {

        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach(function (track) {
            track.stop()
        })

        videoEl.srcObject = null
        videoEl.parentNode.removeChild(videoEl)
    }
    if (peers[socket_id]) peers[socket_id].destroy()
    delete peers[socket_id]
    count--;
}

/**
 * Creates a new peer connection and sets the event listeners
 * @param {String} socket_id 
 *                 ID of the peer
 * @param {Boolean} am_initiator 
 *                  Set to true if the peer initiates the connection process.
 *                  Set to false if the peer receives the connection. 
 */
var count = 0;
function addPeer(socket_id, am_initiator) {
    peers[socket_id] = new SimplePeer({
        initiator: am_initiator,
        stream: localStream,
        config: configuration
    })

    peers[socket_id].on('signal', data => {
        socket.emit('signal', {
            signal: data,
            socket_id: socket_id
        })
    })

    peers[socket_id].on('stream', stream => {
        let newVid = document.createElement('video')
        newVid.srcObject = stream
        newVid.id = socket_id
        newVid.playsinline = false
        newVid.autoplay = true
        newVid.className = "vid"
        newVid.onclick = () => openPictureMode(newVid)
        newVid.ontouchstart = (e) => openPictureMode(newVid)
        if (count == 0)
            videos_1.appendChild(newVid);
        else if (count == 1)
            videos_2.appendChild(newVid);
        else if (count == 2)
            videos_3.appendChild(newVid);
        else if (count == 3)
            videos_4.appendChild(newVid);
        count++;
    })
}

/**
 * Opens an element in Picture-in-Picture mode
 * @param {HTMLVideoElement} el video element to put in pip mode
 */
function openPictureMode(el) {
    console.log('opening pip')
    el.requestPictureInPicture()
}

/**
 * Switches the camera between user and environment. It will just enable the camera 2 cameras not supported.
 */
function switchMedia() {
    if (constraints.video.facingMode.ideal === 'user') {
        constraints.video.facingMode.ideal = 'environment'
    } else {
        constraints.video.facingMode.ideal = 'user'
    }

    const tracks = localStream.getTracks();

    tracks.forEach(function (track) {
        track.stop()
    })

    localVideo.srcObject = null
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {

        for (let socket_id in peers) {
            for (let index in peers[socket_id].streams[0].getTracks()) {
                for (let index2 in stream.getTracks()) {
                    if (peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                        peers[socket_id].replaceTrack(peers[socket_id].streams[0].getTracks()[index], stream.getTracks()[index2], peers[socket_id].streams[0])
                        break;
                    }
                }
            }
        }

        localStream = stream
        localVideo.srcObject = stream

        updateButtons()
    })
}

/**
 * Enable screen share
 */
function setScreen() {
    navigator.mediaDevices.getDisplayMedia().then(stream => {
        for (let socket_id in peers) {
            for (let index in peers[socket_id].streams[0].getTracks()) {
                for (let index2 in stream.getTracks()) {
                    if (peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                        peers[socket_id].replaceTrack(peers[socket_id].streams[0].getTracks()[index], stream.getTracks()[index2], peers[socket_id].streams[0])
                        break;
                    }
                }
            }

        }
        localStream = stream

        localVideo.srcObject = localStream
        socket.emit('removeUpdatePeer', '')
    })
    updateButtons()
}

/**
 * Disables and removes the local stream and all the connections to other peers.
 */
function removeLocalStream() {
    if (localStream) {
        const tracks = localStream.getTracks();

        tracks.forEach(function (track) {
            track.stop()
        })

        localVideo.srcObject = null
    }

    for (let socket_id in peers) {
        removePeer(socket_id)
    }
}

/**
 * Enable/disable microphone
 */
/**
 * Enable/disable video
 */
function toggleVid() {
    vidButton.innerText = "";
    vidButton.style.height = "0px"
    vidButton.style.display = "none"
    for (let index in localStream.getVideoTracks()) {
        localStream.getVideoTracks()[index].enabled = !localStream.getVideoTracks()[index].enabled
        vidButton.innerText = localStream.getVideoTracks()[index].enabled ? "Video Enabled" : "Video Disabled"
    }

}

/**
 * updating text of buttons
 */
function updateButtons() {
    for (let index in localStream.getVideoTracks()) {
        vidButton.innerText = localStream.getVideoTracks()[index].enabled ? "Video Enabled" : "Video Disabled"
    }

}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.498349923827675, 127.00537163881302), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };
// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();
var positions = [
    {
        content: '<img src="../uploads/1.png" alt="My Image" style = "height: 200px;">',
        latlng: new kakao.maps.LatLng(37.4822899027313, 126.942835953538)//봉천
    },
    {
        content: '<img src="../uploads/2.png" alt="My Image" style = "height: 200px;">',
        latlng: new kakao.maps.LatLng(37.5032080456431, 126.947700373641)    //상도
    },
    {
        content: '<img src="../uploads/3.png" alt="My Image" style = "height: 200px;">',
        latlng: new kakao.maps.LatLng(37.485543360707, 126.981886647335)  //동작
    },
    {
        content: '<img src="../uploads/4.png" alt="My Image" style = "height: 200px;">',
        latlng: new kakao.maps.LatLng(37.4872272765986, 127.032887859038) //도곡
    }
];
var imageSrc = "../cctv.png" // 마커이미지의 주소입니다    
var imageSize = new kakao.maps.Size(32, 34); // 마커이미지의 크기입니다
var imageOption = {};
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

var marker_1 = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[0].latlng, // 마커의 위치
    image: markerImage // 마커이미지 설정
});
var marker_2 = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[1].latlng, // 마커의 위치
    image: markerImage // 마커이미지 설정
});
var marker_3 = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[2].latlng, // 마커의 위치
    image: markerImage // 마커이미지 설정
});
var marker_4 = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[3].latlng, // 마커의 위치
    image: markerImage // 마커이미지 설정
});
var infowindow_1 = new kakao.maps.InfoWindow({
    content: positions[0].content // 인포윈도우에 표시할 내용
});
var infowindow_2 = new kakao.maps.InfoWindow({
    content: positions[1].content // 인포윈도우에 표시할 내용
});
var infowindow_3 = new kakao.maps.InfoWindow({
    content: positions[2].content // 인포윈도우에 표시할 내용
});
var infowindow_4 = new kakao.maps.InfoWindow({
    content: positions[3].content // 인포윈도우에 표시할 내용
});
kakao.maps.event.addListener(marker_1, 'mouseover', makeOverListener_1(map, marker_1));
kakao.maps.event.addListener(marker_1, 'mouseout', makeOutListener_1(marker_1));
kakao.maps.event.addListener(marker_1, 'click', makeClickListener_1(marker_1));
kakao.maps.event.addListener(marker_2, 'mouseover', makeOverListener_2(map, marker_2));
kakao.maps.event.addListener(marker_2, 'mouseout', makeOutListener_2(marker_2));
kakao.maps.event.addListener(marker_2, 'click', makeClickListener_2(marker_2));
kakao.maps.event.addListener(marker_3, 'mouseover', makeOverListener_3(map, marker_3));
kakao.maps.event.addListener(marker_3, 'mouseout', makeOutListener_3(marker_3));
kakao.maps.event.addListener(marker_3, 'click', makeClickListener_3(marker_3));
kakao.maps.event.addListener(marker_4, 'mouseover', makeOverListener_4(map, marker_4));
kakao.maps.event.addListener(marker_4, 'mouseout', makeOutListener_4(marker_4));
kakao.maps.event.addListener(marker_4, 'click', makeClickListener_4(marker_4));


function makeOverListener_1(map, marker) {
    return function () {
        if (bMarker_1)
            infowindow_1.open(map, marker);
    };
}
function makeOverListener_2(map, marker, infowindow) {
    return function () {
        if (bMarker_2)
            infowindow_2.open(map, marker);
    };
}
function makeOverListener_3(map, marker, infowindow) {
    return function () {
        if (bMarker_3)
            infowindow_3.open(map, marker);
    };
}
function makeOverListener_4(map, marker, infowindow) {
    return function () {
        if (bMarker_4)
            infowindow_4.open(map, marker);
    };
}
function makeOutListener_1(marker) {
    return function () {
        if (bMarker_1) {
            infowindow_1.close();
        }
    };
}
function makeOutListener_2(marker, infowindow) {
    return function () {
        if (bMarker_2) {
            infowindow_2.close();
        }
    };
}
function makeOutListener_3(marker, infowindow) {
    return function () {
        if (bMarker_3) {
            infowindow_3.close();
        }
    };
}
function makeOutListener_4(marker, infowindow) {
    return function () {
        if (bMarker_4) {
            infowindow_4.close();
        }
    };
}
function makeClickListener_1(marker) {
    return function () {
        if (bMarker_1) {
            marker.setImage(markerImage)
            infowindow_1.close();
            bMarker_1 = 0;
        }
    };
}
function makeClickListener_2(marker) {
    return function () {
        if (bMarker_2) {
            marker.setImage(markerImage)
            infowindow_2.close();
            bMarker_2 = 0;
        }
    };
}

function makeClickListener_3(marker) {
    return function () {
        if (bMarker_3) {
            marker.setImage(markerImage)
            infowindow_3.close();
            bMarker_3 = 0;
        }
    };
}

function makeClickListener_4(marker) {
    return function () {
        if (bMarker_4) {
            marker.setImage(markerImage)
            infowindow_4.close();
            bMarker_4 = 0;
        }
    };
}


// for (var i = 0; i < positions.length; i ++) {
//     // 마커를 생성합니다


//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
//     var marker = new kakao.maps.Marker({
//         map: map, // 마커를 표시할 지도
//         position: positions[i].latlng, // 마커의 위치
//         image: markerImage // 마커이미지 설정
//     });

//     // 마커에 표시할 인포윈도우를 생성합니다 

//     kakao.maps.event.addListener(marker, 'custom_action', function(map, marker, infowindow, data){
//         console.log(data + '가 발생했습니다.');
//     });

// }
// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// function makeOverListener(map, marker, infowindow) {

//     return function() {
//         var imageSrc = "../bang.png" // 마커이미지의 주소입니다    
//     var imageSize = new kakao.maps.Size(32, 36); // 마커이미지의 크기입니다
//     var imageOption = {};
//     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
//     marker.setImage(markerImage);
//         infowindow.open(map, marker);
//     };
// }