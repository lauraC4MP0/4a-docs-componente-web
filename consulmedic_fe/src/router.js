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
        meta: { requiresAuth: true }
    },
   /* {
        path: '/user/userCreate',
        name: "userCreate",
        component: UserCreate,
        meta: { requiresAuth: true }
    },*/
    {
        path: '/patients',
        name: "newPatient",
        component: NewPatient,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/updatePatient',
        name: "updatePatient",
        component: UpdatePatient,
        meta: { requiresAuth:true }
    },
    {
        path: '/user/reportEvolution',
        name: "reportEvolution",
        component: ReportEvolution,
        meta: { requiresAuth: true }
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
    link: createHttpLink({ uri: 'http://localhost:4000/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate({
            mutation: gql `
            mutation Mutation($refresh: String!) {
                refreshToken(refresh: $refresh) {
                  access
                }
              }
            `,
            variables: {
                refresh: localStorage.getItem("token_refresh"),
            },
        })

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch {
        localStorage.clear();
        alert("Su sesión expiró, por favor vuelva a iniciar sesión");
        return false;
    }
}

router.beforeEach(async(to, from) => {
    var is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) return true
    if (is_auth) return { name: "home" };
    return { name: "logIn" };
})

export default router;