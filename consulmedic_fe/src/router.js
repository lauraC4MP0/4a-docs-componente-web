import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import App                      from './App.vue'
import LogIn                    from './components/LogIn.vue' // Jira y Mockup
import SignUp                   from './components/SignUp.vue' //JM
import Home                     from './components/home.vue' //JM
import NewPatient               from './components/NewPatient.vue' //JM
import UpdatePatient            from './components/UpdatePatient.vue' //JM
import ReportEvolution          from './components/ReportEvolution.vue' //JM
import HistoricReport           from './components/HistoricReport.vue' //JM
//import SuccessfullOperation     from './components/SuccessfullOperation.vue' //Solo mockup




const routes = [
    {
        path: '/',
        name: 'root',
        component: App,
        
      },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp,

        meta: { requiresAuth: false }
    },
    {
        path: '/user/home',
        name: "home",
        component: Home,
        meta: { requiresAuth: false }
    },
   /* {
        path: '/user/userCreate',
        name: "userCreate",
        component: UserCreate,
        meta: { requiresAuth: true }
    },*/
    {
        path: '/user/newPatient',
        name: "newPatient",
        component: NewPatient,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/updatePatient',
        name: "updatePatient",
        component: UpdatePatient,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/reportEvolution',
        name: "reportEvolution",
        component: ReportEvolution,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/historicReport',
        name: "historicReport",
        component: HistoricReport,
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://consulmedic-api.herokuapp.com/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return access_token && refresh_token;
}

router.beforeEach(async (to) => {
    if (to.meta.requireAuth) {
        if (await isAuth()) {
            return true
        } else {
            return { name: 'logIn' };
        }
    } else {
        return true;
    }
});

export default router;