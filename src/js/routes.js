// import HomePage from '../pages/home.f7.html';
import LandingPage from '../pages/landing.f7.html'
import LoginPage from '../pages/login.f7.html';
import RecoveryPage from '../pages/recovery.f7.html';
import RegisterS1Page from '../pages/register-step1.f7.html';
import RegisterS2Page from '../pages/register-step2.f7.html';
import RegisterS4Page from '../pages/register-step4.f7.html';
import RegisterS5Page from '../pages/register-step5.f7.html';
import RecoverySentPage from '../pages/recovery-sent.f7.html';
import AboutPage from '../pages/about.f7.html';
import FormPage from '../pages/form.f7.html';
import RecoveryPassPage from '../pages/recovery-pass.f7.html';
import IntroSplash1 from '../pages/intro-splash-01.f7.html';
import AsistentesInvitar01 from '../pages/asistentes-invitar-01.f7.html';
import AsistentesInvitar02 from '../pages/asistentes-invitar-02.f7.html';
import AsistentesInvitar03 from '../pages/asistentes-invitar-03.f7.html';
import AsistentesInvitar04 from '../pages/asistentes-invitar-04.f7.html';
import AsistentesConfirmar from '../pages/asistentes-confirmar.f7.html';
import AsistentesOffices from '../pages/asistentes-offices.f7.html';
import officesShow from '../pages/offices-show.f7.html';
import officesAddFormBasic from '../pages/offices-add-form-basic.f7.html';
import officesAddFormMap from '../pages/offices-add-form-map.f7.html';
import officesAddFormSchedule from '../pages/offices-add-form-schedule.f7.html';
import home from '../pages/home.f7.html';
import AgendarCita from '../pages/agendar-cita.f7.html';
import AgendarCitaFecha from '../pages/agendar-cita-fecha.f7.html';
import CitaAgendada from '../pages/cita-agendada.f7.html';
import NuevoPaciente from '../pages/nuevo-paciente.f7.html';
import schedule from '../pages/schedule.f7.html';
import DynamicRoutePage from '../pages/dynamic-route.f7.html';
import PhotoModule from '../pages/photo-module.f7.html';
import Settings from '../pages/settings.f7.html';
import SettingsEdit from '../pages/settings-edit.f7.html';
import DoctorHorariosAdd from '../pages/doctor-horarios-add.f7.html';
import DoctorHorarios from '../pages/doctor-horarios.f7.html';
import DoctorHorariosSelect from '../pages/doctor-horarios-select.f7.html';
import DoctorHorariosEdit from '../pages/doctor-horarios-edit.f7.html';
import DoctorHorariosShow from '../pages/doctor-horarios-show.f7.html';
import DoctorAgregarPago from '../pages/doctor-agregar-pago.f7.html';
import DoctorPagosPendientes from '../pages/doctor-pagos-pendientes.f7.html';
import PagosHome from '../pages/pagos-home.f7.html';
import Config from '../pages/ajustes.f7.html';

var routes = [

    {
        name: "root",
        path: '/',
        component: LoginPage,
    },
    {
        name: "config",
        path: '/doctor/configuration',
        component: Config,
    },
    {
        name: "pagos-home",
        path: '/doctor/pagos',
        component: PagosHome,
    },
    {
        name: "doctor-horarios",
        path: '/doctor/timetable',
        component: DoctorHorarios,
    },
    {
        name: "doctor-horarios-add",
        path: '/doctor/timetable/new',
        component: DoctorHorariosAdd,
    },
    {
        name: "doctor-horarios-select",
        path: '/doctor/timetable/select',
        component: DoctorHorariosSelect,
    },
    {
        name: "doctor-horarios-edit",
        path: '/doctor/timetable/edit',
        component: DoctorHorariosEdit,
    },
    {
        name: "doctor-horarios-show",
        path: '/doctor/timetable/show',
        component: DoctorHorariosShow,
    },
    {
        name: "doctor-agregar-pago",
        path: '/doctor/agregar/pago',
        component: DoctorAgregarPago,
    },
    {
        name: "doctor-pagos-pendientes",
        path: '/doctor/agregar/pago/pendientes',
        component: DoctorPagosPendientes,
    },
    {
        name: "landing",
        path: '/landing',
        component: LandingPage,
    },
    {
        name: "home",
        path: '/home',
        component: home,
    },
    {
        name: "schedule",
        path: '/schedule',
        component: schedule,
    },
    {
        path: '/account/assistant/confirmation',
        component: RegisterS1Page,
    },
    {
        name: 'register-s1',
        path: '/register-s1',
        component: RegisterS1Page,
    },
    {
        name: 'register-s2',
        path: '/register-s2',
        component: RegisterS2Page,
    },
    {
        name: 'photo-module',
        path: '/photo-module',
        component: PhotoModule,
    },
    {
        name: 'register-s4',
        path: '/register-s4',
        component: RegisterS4Page,
    },
    {
        name: 'register-s5',
        path: '/account/signup/confirmation',
        component: RegisterS5Page,
    },
    {
        name: 'settings',
        path: '/settings',
        component: Settings,
    },
    {
        name: 'settings-edit',
        path: '/settings-edit',
        component: SettingsEdit,
    },
    {
        name: 'nuevo-paciente',
        path: '/nuevo-paciente',
        component: NuevoPaciente,
    },
    {
        name: 'offices-show',
        path: '/offices-show',
        component: officesShow,
    },
    {
        name: 'offices-add-form-basic',
        path: '/offices-add-form-basic',
        component: officesAddFormBasic,
    },
    {
        name: 'offices-add-form-map',
        path: '/offices-add-form-map',
        component: officesAddFormMap,
    },
    {
        name: 'offices-add-form-schedule',
        path: '/offices-add-form-schedule',
        component: officesAddFormSchedule,
    },
    {
        name: 'intro-splash-01',
        path: '/intro-splash-01',
        component: IntroSplash1,
    },
    {
        name: 'agendar-cita',
        path: '/agendar-cita',
        component: AgendarCita,
    },
    {
        name: 'agendar-cita-fecha',
        path: '/agendar-cita-fecha',
        component: AgendarCitaFecha,
    },
    {
        name: 'cita-agendada',
        path: '/cita-agendada',
        component: CitaAgendada,
    },
    {
        name: 'asistentes-invitar-01',
        path: '/assistants-show',
        component: AsistentesInvitar01,
    },
    {
        name: 'assistants-offices',
        path: '/assistants-offices',
        component: AsistentesOffices,
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
        name: 'asistentes-invitar-04',
        path: '/asistentes-invitar-04',
        component: AsistentesInvitar04,
    },
    {
        name: 'asistentes-confirmar',
        path: '/asistentes-confirmar',
        component: AsistentesConfirmar,
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
        name: 'recovery-sent',
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
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

            // Simulate Ajax Request
            setTimeout(function() {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [{
                            title: 'Framework7 Website',
                            url: 'https://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'https://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve({
                    component: RequestAndLoad,
                }, {
                    context: {
                        user: user,
                    }
                });
            }, 1000);
        },
    }
];

export default routes;