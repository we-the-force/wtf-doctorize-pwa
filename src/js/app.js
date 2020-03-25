import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

import localForage from "localforage";

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/font-face.css';
import '../css/icons.css';
import '../css/app.sass';

// Import Routes
import routes from './routes.js';

import register from './register.js';

Framework7.request.setup({
  contentType: "application/json",
  referrerPolicy: "origin-when-downgrade",
  crossDomain: true,
  "Access-Control-Allow-Origin": "*"
});


var app = new Framework7({
  root: '#app', // App root element

  name: 'Doctorize', // App name
  theme: 'auto', // Automatic theme detection
  // App root data

  data: function () {
    return {
      store: localForage.createInstance({
        name: "datastore"
      }),
      specialties: {
        values: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
        displayValues: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
      },
      register: {
        username: '',
        password: '',
        email: '',
        phone: '',
      },
      assistant: {
        id: '',
        flag: false,
        edit: false,
        addOffice: false,
        code: '',
        name: '',
        password: '',
        email: '',
        consultorio: {
          id: '',
          name: '',
        },
        permisos: [],
      },
      doctor: {
        id: '',
        email: '',
        name: '',
        cellphone: '',
        specialty: {
          id: '',
          name: '',
        },
        photo: '',
      },
      consultorio: {
        id: '',
        nombre: '',
        email: '',
        phone: '',
        hospital: '',
        address: '',
        number: '',
        startTime: '',
        closeTime: '',
        lunchStartTime: '',
        lunchCloseTime: '',
        days: [],
        edit: false,
      },
      paciente: {
        nombre: '',
        email: '',
        phone: '',
        birthdate: '',
        civilStatus: '',
        weight: '',
        height: '',
        blood: '',
        pressure: '',
      },
      /* url: '//api.mydoctorize.com' */
      url: '//localhost:1337'
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    previousPage: function () {
      app.views.main.router.back();
    },
    redirectTo: function (pathTo) {
      // console.log(app);

      app.views.main.router.navigate({
        name: pathTo
      });
    },
    isEmpty: function (obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    },
    cuteHide: function (el) {
      el.animate({ opacity: '0' }, {
        duration: 150,
        complete: function () {
          el.animate({ height: '0px' }, {
            duration: 150,
            complete: function () {
              el.remove();
            }
          });
        }
      });
    }
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
    swipe: 'left',
    swipeOnlyClose: true,
  },
  // Register service worker
  serviceWorker: {
    path: '/OneSignalSDKWorker.js',
  },
  view: {
    pushState: true
  },
  navbar: {
    showOnPageScrollEnd: false
  },
  flow: 'default' //RA registrar asistente, RD registrar doctor, RP registrar paciente, UA update asistente, UD update doctor, UP update patient
});

if (getCookie("landingPage") != 'visited') {
  app.methods.redirectTo('intro-splash-01');
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

app.init(function () {
  console.log('init');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
  });

});



let newWorker;
//let isSubscribed = false;
//let swRegistration = null;
//const applicationServerPublicKey = '';

var toastWithCallback = app.toast.create({
  text: 'A new version of this app is available.',
  closeButton: true,
  closeButtonText: 'Update',
  on: {
    close: function () {
      newWorker.postMessage({ action: 'skipWaiting' });
    },
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./OneSignalSDKWorker.js').then(reg => {
    reg.addEventListener('updatefound', () => {

      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener('statechange', () => {

        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':

            // There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              toastWithCallback.open();
            }

            break;
        }
      });
    });

    /*     swRegistration = reg;
        Notification.requestPermission();
        initializeUI(); */

  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });

  let refreshing;
  // The event listener that is fired when the service worker updates
  // Here we reload the page
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

//suscribe notifications

/* function initializeUI() {

  if (!isSubscribed) {
    subscribeUser();
  }

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      isSubscribed = !(subscription === null);
      update();
    });
} */

/* function update() {
  if (Notification.permission === 'denied') {
    updateSubscriptionOnServer(null);
    return;
  }
} */

/* function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      update();
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
      update();
    });
} */

/* function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
} */

/* function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
  let jsonSubscription;
  if (subscription) {
    jsonSubscription = JSON.stringify(subscription);
  } else {
    jsonSubscription = null;
  }
} */
/* $$(document).on('panel:open',function (e) {
  app.data.store.getItem('doctor').then(function (value) {
    app.data.doctor = value;
    $$(".doctor .name").text(app.data.doctor.name);
    $$(".doctor .mail").text(app.data.doctor.email);
    $$(".panel .avatar").html('<img src="' + app.data.url + '/' + app.data.doctor.photo + '200.png" alt="not found">');
  });
  var panel = app.panel.create({
    el: '.panel',
  });
  panel.open();

  $$(".panel .avatar").click(function (e) {
    panel.close();
    app.data.flow = 'UD';
    app.data.store.setItem('flow', app.data.flow).then(function (value) {
      app.methods.redirectTo('photo-module');
    });
  });
}); */

/*
$$('#login .login-button').addClass('grey');
$$('#login .login-button').off('click');

$$(document).on('input:notempty', '#username', function(e) {
    email_login = $$('[name="username"]').val();
    if (regex.test(email_login)) {
        $$('#login .login-button').removeClass('grey');
        $$('#login .login-button').off('click');
        $$('#login .login-button').on('click', function(e) {
            e.preventDefault();
            password_login = $$('[name="password"]').val();
            app.request.postJSON(app.data.url + '/account/login', { "email": email_login, "password": password_login }, function(e) {
                app.data.doctor.id = e.id;
                app.data.doctor.email = e.email;
                app.data.doctor.name = e.name;
                app.data.doctor.cellphone = e.cellphone;
                app.data.doctor.specialty = e.specialty;
                console.log(app.data.doctor);
                app.methods.redirectTo('home');
            }, function(e) {
                errorPopup.open();
            });
        });
    }
});


 */

//recuperar contrase
/* $$(document).on('page:init', '.page[data-name="recovery"]', function (e) {

  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var email_recovery;

  $$('#recovery .btn-rounded').addClass('grey');
  $$('#recovery .btn-rounded').off('click');

  $$(document).on('input:notempty', '#username', function (e) {
    email_recovery = $$('#recovery #email').val();

    if (regex.test(email_recovery)) {
      $$('#recovery .btn-rounded').removeClass('grey');
      $$('#recovery .btn-rounded').off('click');
      $$('#recovery .btn-rounded').on('click', function () {
        app.request.postJSON(app.data.url + '/account/password/reset', { "email": email_recovery }, function (e) {
          console.log(e);
        });
      });
    }
  });
}); */





//restaurar contrasena
// $$(document).on('page:init', '.page[data-name="recovery-pass"]', function (e) {
//   //parametros

//   // app.panel.swipePanel = false;
//   let urlParams = (new URL(document.location)).searchParams;
//   let mail = urlParams.get("email");
//   let code = urlParams.get("code");
//   var pass1,pass2;

//   $$('#recovery-pass .login-button').addClass('grey');
//   $$('#recovery-pass .login-button').off('click');

//   $$(document).on('input:notempty', '#password2', function(e){
//     console.log(mail+' '+code);

//     pass1 = $$('[name="password1"]').val();
//     pass2 = $$('[name="password2"]').val();
//     console.log(pass1);

//     $$('#password2').attr('pattern', pass1);

//     if(pass1 === pass2){
//       $$('#recovery-pass .login-button').removeClass('grey');
//       $$('#recovery-pass .login-button').off('click');
//       $$('#recovery-pass .login-button').on('click', function(){
//         app.request.postJSON('http://api.mydoctorize.com/account/password/confirmation', {
//           "email": mail ,
//           "password": pass1 ,
//           "passwordConfirmation": pass2 ,
//           "code": code
//         }, function(e){
//           console.log(e);
//         });
//         location.href = '/';
//       });
//     }
//   });
// });


/**$$(document).on('page:init', '.page[data-name="register-step3"]', function (e) {
  var specialties = app.data.specialties;
  _.orderBy(specialties, specialties.values, 'desc');
  console.log(specialties);

  var picker = app.picker.create({
    inputEl: '#specialty-picker',
    cols: [
      {
        values: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
        displayValues: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
      }
    ]
  });

  var imageCapture;
  const input = document.querySelector('input[type="range"]');
  $$('.web-cam').on('click', function(){
    dynamicPopup.open();

    $$('.popup #takephoto').on('click', function(){
      dynamicPopup.close();

      navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        document.querySelector('video').srcObject = mediaStream;

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);

        return imageCapture.getPhotoCapabilities();
      })
      .then(photoCapabilities => {
        const settings = imageCapture.track.getSettings();

        // input.min = 600;
        input.min = photoCapabilities.imageWidth.min;
        // input.max = 600;
        input.max = photoCapabilities.imageWidth.max;
        input.step = photoCapabilities.imageWidth.step;

        return imageCapture.getPhotoSettings();
      })
      .then(photoSettings => {
        input.value = photoSettings.imageWidth;
      })
      .catch(error => console.log('Argh!', error.name || error));
      document.querySelector('video').addEventListener('play', function () {
        document.querySelector('#takePhotoButton').disabled = false;
      });
    });

    if (window.File && window.FileReader && window.FormData) {
      var $inputField = $$('#file-upload');

      $inputField.off('change');
      $inputField.on('change', function (e) {
        var file = e.target.files[0];

        if (file) {
          if (/^image\//i.test(file.type)) {
            readFile(file);
          } else {
            alert('Not a valid image!');
            console.log('Not a valid image!');
          }
        }else{
          console.log('Not a FILE');
        }
      });
    } else {
      alert("File upload is not supported!");
      console.log('File upload is not supported!');
    }

  });
  function processFile(dataURL, fileType) {
    var maxWidth = 200;
    var maxHeight = 200;

    var image = new Image();
    image.src = dataURL;

    image.onload = function () {
      var width = image.width;
      var height = image.height;
      var shouldResize = (width > maxWidth) || (height > maxHeight);

      if (!shouldResize) {
       console.log('enviar archivo');
        return;
      }

      var newWidth;
      var newHeight;

      if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
      } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
      }

      var canvas = document.createElement('canvas');

      canvas.width = newWidth;
      canvas.height = newHeight;

      var context = canvas.getContext('2d');

      context.drawImage(this, 0, 0, newWidth, newHeight);

      dataURL = canvas.toDataURL(fileType);

      //sendFile(dataURL);
      console.log(dataURL);
      var imgHtml = '<img src="'+dataURL+'" alt="">';
      $$('.web-cam').html(imgHtml);
    };

    image.onerror = function () {
      alert('There was an error processing your file!');
    };
  }
  function readFile(file) {
    var reader = new FileReader();

    reader.onloadend = function () {
      $$('.popup #uploadphoto').on('click', function(){
        console.log('procesing');
        dynamicPopup.close();
        processFile(reader.result, file.type);
      });
    }

    reader.onerror = function () {
      alert('There was an error reading the file!');
    }

    reader.readAsDataURL(file);
  }

  var dynamicPopup = app.popup.create({
    content:
      '<div class="popup">' +
        '<div class="block">' +
          '<div class="list">'+
          '<div class="item-inner">'+
          '<div class="item-input-wrap">'+
                '<div class="row">'+
                  '<div class="col-15"></div>'+
                  '<div class="col-70">'+
                    '<a href="#" data-view=".view-main" id="takephoto" class="item-link list-button login-button">'+
                      'Take Photo' +
                      '<i class="material-icons">chevron_right</i>' +
                    '</a>' +
                  '</div>' +
                  '<div class="col-15"></div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="item-inner">'+
          '<div class="item-input-wrap">'+
                '<div class="row">' +
                  '<div class="col-15"></div>'+
                  '<div class="col-70">'+
                    '<a href="#" data-view=".view-main" for="file-upload" id="uploadphoto" class="item-link list-button login-button">' +
                    'Update photo <i class="material-icons">chevron_right</i>' +
                    '</a>' +
                    '<input id="file-upload" type="file"/>' +
                  '</div>'+
                  '<div class="col-15"></div>'+
                '</div>'+
                '</div>'+
                '</div>'+
          '</div>' +
          '</div>' +
        '</div>' +
      '</div>',
    // Events
    on: {
      open: function (popup) {
        console.log('Popup open');
      },
      opened: function (popup) {
        console.log('Popup opened');
      },
    }
  });



  function onTakePhotoButtonClick() {
    console.log('click');

    imageCapture.takePhoto({ imageWidth: input.value })
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        drawCanvas(imageBitmap);
        console.log(`Photo size is ${imageBitmap.width}x${imageBitmap.height}`);
      })
      .catch(error => console.log(error));
  }



  /* Utils

  function drawCanvas(img) {
    const canvas = document.querySelector('canvas');
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);
  }

  document.querySelector('#takePhotoButton').addEventListener('click', onTakePhotoButtonClick);

});*/