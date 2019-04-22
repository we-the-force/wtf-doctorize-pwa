
// import HomePage from '../pages/home.f7.html';
import LoginPage from '../pages/login.f7.html';
import RecoveryPage from '../pages/recovery.f7.html';
import RegisterS1Page from '../pages/register-step1.f7.html';
import RegisterS2Page from '../pages/register-step2.f7.html';
import RegisterS3Page from '../pages/register-step3.f7.html';
import RegisterS4Page from '../pages/register-step4.f7.html';
import RecoverySentPage from '../pages/recovery-sent.f7.html';
import AboutPage from '../pages/about.f7.html';
import FormPage from '../pages/form.f7.html';

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
    path: '/register-s4',
    component: RegisterS4Page,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/recovery/',
    component: RecoveryPage,
  },
  {
    path: '/recovery-sent/',
    component: RecoverySentPage,
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