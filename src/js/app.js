import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.sass';

// Import Routes
import routes from './routes.js';


import register from './register.js';

var app = new Framework7({
    root: '#app', // App root element

    name: 'doctorize-pwa', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function() {
        return {
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
                email: '',
                consultorio: [],
                permisos: [],
            }


        };
    },
    // App root methods
    methods: {
        helloWorld: function() {
            app.dialog.alert('Hello World!');
        },
        redirectTo: function(pathTo) {
            // console.log(app);

            app.views.main.router.navigate({
                name: pathTo
            });
        },
        isEmpty: function(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
    },
    // App routes
    routes: routes,
    // Enable panel left visibility breakpoint
    panel: {
        leftBreakpoint: 960,
    },
    // Register service worker
    serviceWorker: {
        path: '/service-worker.js',
    },
    view: {
        pushState: true
    }

});


//login
var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var email_login, password_login;
var dynamicPopup = app.popup.create({
    content: '<div class="popup popup-swipe-to-close">' +
        '<div class="block text-align-center">' +
        '<p>Bienvenido!</p>' +
        '<div class="list"> <ul> <li><a class="item-link list-button popup-close" href="#">Cerrar</a></li> </ul> </div>' +

        '</div>' +
        '</div>',
    // Events
    on: {
        open: function(popup) {
            console.log('Popup open');
        },
        opened: function(popup) {
            console.log('Popup opened');
        },
    }
});
var errorPopup = app.popup.create({
    content: '<div class="popup popup-swipe-to-close">' +
        '<div class="block text-align-center">' +
        '<p>Tus datos de acceso son incorrectos. <br/><br/>Intenta nuevamente.</p>' +
        '<div class="list"> <ul> <li><a class="item-link list-button popup-close" href="#">Cerrar</a></li> </ul> </div>' +

        '</div>' +
        '</div>',
    // Events
    on: {
        open: function(popup) {
            console.log('Popup open');
        },
        opened: function(popup) {
            console.log('Popup opened');
        },
    }
});

app.init(function() {
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
            app.request.postJSON('http://api.mydoctorize.com/account/login', { "email": email_login, "password": password_login }, function(e) {
                console.log(e);
                dynamicPopup.open();
            }, function(e) {
                errorPopup.open();
            });
        });
    }
});




//recuperar contrase
$$(document).on('page:init', '.page[data-name="recovery"]', function(e) {

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email_recovery;

    $$('#recovery .login-button').addClass('grey');
    $$('#recovery .login-button').off('click');

    $$(document).on('input:notempty', '#username', function(e) {
        email_recovery = $$('#recovery #username').val();

        if (regex.test(email_recovery)) {
            $$('#recovery .login-button').removeClass('grey');
            $$('#recovery .login-button').off('click');
            $$('#recovery .login-button').on('click', function() {
                app.request.postJSON('http://api.mydoctorize.com/account/password/reset', { "email": email_recovery }, function(e) {
                    console.log(e);
                });
            });
        }
    });
});





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