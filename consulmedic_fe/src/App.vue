<template>
  <div modal id="app" class="app">
    
    <div class="menu">
      <nav>
        <a href="#" class="metricas-AccesosRapidos" data-seccion="Bienvenido a Consulmedic">
        <img src="https://images.emojiterra.com/google/android-11/512px/2695.png" alt="Consulmedic" class="desktop" loading="lazy" width="100" height="80">
        <img src="./ConsulMedic.png"  class="desktop" loading="lazy" width="230" height="30">
      </a>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="header">

    </div>
    <div class="menu_bar">
      
    <nav>
  <ul>


    
      <li>
      <a v-if="!is_auth"> Inicio</a>
      </li>
      <li><a v-if="!is_auth"> Nosotros</a></li>
      <li><a v-if="!is_auth"> Servicios</a></li>
      <li><a v-if="!is_auth"> Contactenos</a></li>

     <li> <a v-if="is_auth"><router-link to="/user"> Inicio</router-link></a>
    </li>
    
    <li>
      <a v-if="is_auth"><router-link to="/user/edit"> Perfil</router-link></a>
    </li>
    <li>
      <a v-if="is_auth"><router-link to="../patients">Pacientes</router-link></a>
    </li>
		<li><a v-if="is_auth"><router-link to="/user/reportEvolution">Reportes</router-link></a></li>  
    <li>
      <a v-if="is_auth" v-on:click="logout"> Cerrar sesión</a>
    </li>
  </ul>
</nav>

      </div>
    
    
    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:completedNewPatient="completedNewPatient"
        v-on:completedReportEvolution="completedReportEvolution"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
   computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() { }
    }
  },
  data: function () {
    return {
      is_auth: false,
    };
  },
  components: {},
  methods: {
    
    
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      console.log("test singup");
      this.$router.push({ name: "signUp" });
    },
    loadDeletePatient:function(){
      this.$router.push({name:"deletePatient"});
    },
    loadSearchPatient:function(){
      this.$router.push({name:"searchPatient"});
    },
    logout: function (data) {
     localStorage.clear();
			alert("Sesión Cerrada");
      this.loadLogIn();
    },
    completedLogIn: function(data) {
			localStorage.setItem('username', data.id);
			localStorage.setItem('token_access', data.token_access);
			localStorage.setItem('token_refresh', data.token_refresh);
      console.log(data.id);
      console.log(localStorage.getItem('username'));
			alert("Autenticación Exitosa");
			this.loadHome();
    },
    loadHome: function() {
      this.$router.push({ name: "home" });
    },
    /*completedLogIn: function (data) {
      //const userId = "123";
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      /*para mantener la sesion*/
     // this.is_auth = true;
      //this.verifyAuth();
      //this.$session.start();
      //this.$router.push({name: "newProduct", params:{ username: username }})
      //this.$router.push({ path: '/user', params: {username} })
      //this.$router.push({ name: "home" });
   // },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.$router.push("logIn");
    },
    completedNewPatient: function (data){
      alert("Paciente agregado correctamente");
       location.reload();
      },
      completedReportEvolution: function (data){
      alert("Reporte agregado correctamente");
       location.reload();
      },
      completedDeletePatient:function(data){
        alert(data.data.deletePatient);
        this.$router.push("home");
      },
      completedSearchPatient:function(data){
        tihs.$router.push("home");
      }
    
    
      },
 
};
</script>

<style>
body{
margin: 10 0 0 0;
background: rgb(255 255 255 / 60%)#ffffff;
}
.menu nav button{
  cursor: pointer;
color: #E5E7E9;
background: rgb(24 127 175);
border: 1px solid #E5E7E9;
align-items: right;
border-radius: 50px;
padding: 10px 20px;
float: right;
 
       
        
        
        display: block;
       
}
.menu nav button:hover
{
color: #283747;
background: #E5E7E9;
border: 1px solid #E5E7E9;
}
.main-component{
height: 75vh;
margin: 0%;
padding: 0%;
background: #ffffff;
}
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.menu_bar html {
  height:100%;
  background-image: linear-gradient(to right top, #8e44ad 0%, #3498db 100%);
}
.menu_bar nav {
  max-width: 960px;
  mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%);
  margin: 0 auto;
  padding: 10px 0;
}
.menu_bar nav ul {
  text-align: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
}
.menu_bar nav ul li {
  cursor: pointer;
  display: inline-block;
}
.menu_bar nav ul li a {
  padding: 12px;
  font-family: "Open Sans";
  text-transform:uppercase;
  color: rgb(24 127 175);
  font-size: 18px;
  text-decoration: none;
  display: block;
}
.menu_bar nav ul li a:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(0, 35, 122, 0.7);
}
</style>