
// import HomePage from '../pages/home.f7.html';
import LoginPage from '../pages/login.f7.html';
import RecoveryPage from '../pages/recovery.f7.html';
import RegisterS1Page from '../pages/register-step1.f7.html';
import RegisterS2Page from '../pages/register-step2.f7.html';
import RegisterS3Page from '../pages/register-step3.f7.html';
import RegisterS4Page from '../pages/register-step4.f7.html';
import RegisterS5Page from '../pages/register-step5.f7.html';
import RecoverySentPage from '../pages/recovery-sent.f7.html';
import AboutPage from '../pages/about.f7.html';
import FormPage from '../pages/form.f7.html';
import RecoveryPassPage from '../pages/recovery-pass.f7.html';
import AsistentesInvitar01 from '../pages/asistentes-invitar-01.f7.html';   
import AsistentesInvitar02 from '../pages/asistentes-invitar-02.f7.html';    
import AsistentesInvitar03 from '../pages/asistentes-invitar-03.f7.html';               

import LeftPage1 from '../pages/left-page-1.f7.html';
import LeftPage2 from '../pages/left-page-2.f7.html';
import DynamicRoutePage from '../pages/dynamic-route.f7.html';
import RequestAndLoad from '../pages/request-and-load.f7.html';
// import NotFoundPage from '../pages/404.f7.html';

var routes = [
  
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/register-s1',
    component: RegisterS1Page,
  },
  {
    path: '/register-s2',
    component: RegisterS2Page,
  },
  {
    path: '/register-s3',
    component: RegisterS3Page,
    
  },
  {
    name: 'register-s4',
    path: '/register-s4',
    component: RegisterS4Page,
  },
  {
    name: 'register-s5',
    path: '/register-s5',
    component: RegisterS5Page,
  },
  {
    name: 'asistentes-invitar-01',
    path: '/asistentes-invitar-01',
    component: AsistentesInvitar01,
  },
  {
    name: 'asistentes-invitar-02',
    path: '/asistentes-invitar-02',
    component: AsistentesInvitar02,
  },
  {
    name: 'asistentes-invitar-03',
    path: '/asistentes-invitar-03',
    component: AsistentesInvitar03,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/account/password/reset',
    component: RecoveryPage,
  },
  {
    path: '/recovery-sent/',
    component: RecoverySentPage,
  },
  {
    path: '/account/password/confirmation',
    component: RecoveryPassPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },

  {
    path: '/left-page-1/',
    component: LeftPage1,
  },
  {
    path: '/left-page-2/',
    component: LeftPage2,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  }
];

export default routes;