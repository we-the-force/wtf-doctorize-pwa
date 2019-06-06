import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import { orderBy } from 'lodash';
// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.sass';

// Import Routes
import routes from './routes.js';

var app = new Framework7({
  root: '#app', // App root element

  name: 'doctorize-pwa', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      specialties:
        {
          values: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
          displayValues: ["Alergología", "Anestesiología", "Cardiología", "Gastroenterología", "Endocrinología", "Geriatría", "Hematología", "Infectología", "Nefrología", "Neumología", "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Rehabilitación", "Reumatología", "Toxicología", "Urología"],
        },
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
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
});

$$(document).on('page:init', '.page[data-name="register-step3"]', function (e) {
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

  

  /* Utils */

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
  
});


//login button
$$('#login .login-button').on('click', function(){
  var username = $$('[name="username"]').val();
  var password = $$('[name="password"]').val();
  //cristof_tb@hotmail.com Torres2015
  app.request.postJSON('http://api.mydoctorize.com/account/login', { "email": username , "password": password }, function(e){
    console.log(e);
  });
});

//recuperar contrase
$$(document).on('page:init', '.page[data-name="recovery"]', function (e) {
  $$('.login-button').on('click', function(){
    var email = $$('[name="username"]').val();
    app.request.postJSON('http://api.mydoctorize.com/account/password/reset', { "email": email }, function(e){
      console.log(e);
    });
  });
});


$$(document).on('page:init', '.page[data-name="recovery-pass"]', function (e) {
  var loc = document.location.href;
  
  if(loc.indexOf('?')>0)
  {
    var val = loc.split('?')[1];
    var param1 = val.split('&')[0];
    var mail = param1.split('=')[1];
    var param2 = val.split('&')[1];
    var code = param2.split('=')[1];
  }

  var pass1 = $$('[name="password1"]').val();
  var pass2 = $$('[name="password2"]').val();

  $$('#recovery-pass .login-button').on('click', function(){

    if(pass1 !== pass2){
      notification.open();
    }else if(pass1 == "" || pass2 ==""){
      notification.open();
    }else{
      app.request.postJSON('http://api.mydoctorize.com/account/password/confirmation', { 
        "email": mail , 
        "password": pass1 , 
        "passwordConfirmation": pass2 , 
        "code": code 
      }, function(e){
        console.log(e);
      });
      //location.href = '/';
    }
  });
});

var notification = app.notification.create({
  icon: '<i></i>',
  title: 'Doctorize',
  titleRightText: 'ahora',
  subtitle: 'Contraseña invalida',
  text: 'Las contraseñas no coinciden',
  closeTimeout: 3000,
});