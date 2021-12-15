<template>
<div>
<div class="welcome">
<h1>BIENVENIDO A CONSULMEDIC: {{ userById.username }}
            </h1> </div>
   <div class="home"> 
        <div class = "home_content">
            <br>
   
            
        </div>
        <br>
            <div class= "buttons1">
                <a v-on="is_auth"><router-link to="/user/newPatient"></router-link><input type="button" value="Crear Paciente"></a>
                <br>
                <br>
                <a v-on="is_auth"><router-link to="/user/UpdatePatient"></router-link><input type="button" value="Actualizar Paciente"></a>
                <br>
                <br>
                <a v-on="is_auth"><router-link to="/user/reportEvolution"></router-link><input type="button" value="Crear Reporte de evolución"></a>
                <br>
                <br>
                 <a v-on="is_auth"><router-link to="/user/historicReport"></router-link><input type="button" value="Consulta reportes por paciente"></a>
        
            </div>
        </div>
</div>
</template>

<script>

import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
    name: "Home",

    data: function () {
        return {
            idUser: jwt_decode(localStorage.getItem("token_refresh")).user_id,
            
            userById: {
                username: "",
                
            },
        };
    },

    apollo: {
        userById: {
            query: gql`
  query Query($idUser: Int!) {
  userById(idUser: $idUser) {
    username
  }
}
            `,

        variables() {
            return {
                idUser: this.idUser,
            };
        }
        },
    }
};

</script>

<style>
.home{
    height: 100%;
        width: 100%;
        background: url("consulmedicinicio.png") no-repeat center center fixed; 
        display: flex;
        justify-content: center;
        align-items: center;
}
.home_content{
    font-family: 'Open Sans Condensed', sans-serif;
    position: center;
    font-size: 20px;
    color: rgb(24 127 175);
    text-shadow: 3px 3px 10px rgb(175, 170, 170);
    justify-content: center;
    position: relative;
    }
.buttons1{
    display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align : center;
  -moz-box-align    : center;
  -ms-flex-align    : center;
  -webkit-align-items : center;
  align-items : center ;
  justify-content : center;
  -webkit-justify-content : center;
  -webkit-box-pack : center;
  -moz-box-pack : center;
  -ms-flex-pack : center;
  flex-direction: column;
  position: absolute;
  top: 50%;
}
.buttons1 input{
    background: #eb94d0;
    background-image: -webkit-linear-gradient(top, #dad9e0, #196fa5);
  background-image: -moz-linear-gradient(top, #dad9e0, #196fa5);
  background-image: -ms-linear-gradient(top, #dad9e0, #196fa5);
  background-image: -o-linear-gradient(top, #dad9e0, #196fa5);
  background-image: linear-gradient(to bottom, #dad9e0, #196fa5);
  -webkit-border-radius: 20;
  -moz-border-radius: 20;
  border-radius: 15px;
  -webkit-box-shadow: 6px 5px 24px #666666;
  -moz-box-shadow: 6px 5px 24px #666666;
  box-shadow: 6px 5px 24px #666666;
font-family:'Open Sans Condensed', sans-serif;
  color: #180c2e;
  font-size: 18px;
  padding: 19px;
  text-decoration: none;
    }
.buttons1 input:hover {
  background: #2079b0;
  background-image: -webkit-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -moz-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -ms-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -o-linear-gradient(top, #2079b0, #eb94d0);
  background-image: linear-gradient(to bottom, #2079b0, #eb94d0);
  text-decoration: none;
}
.welcome h1{

 color: rgb(24 127 175);
  font-weight: normal;
  font-size: 40px;
  font-family: Arial;
  text-transform: uppercase;
}
</style>
