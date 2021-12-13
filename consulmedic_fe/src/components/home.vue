<template>

   <div class="home">
    <div class = "home_container">
        <div class = "home_content">
            <br>
            <br>
            <br>
            <h1>BIENVENIDO A CONSULMEDIC: 
                <span>{{userDetailById.name}}</span>
            </h1> 
            <br>
            <br>
            <br>    
            <h2>Selecciona una opción</h2>
        </div>
        <br>
        <div class = "home_patient">
            <h3>Pacientes</h3>
        </div>
        <br>
        <div class= "home_buttons_patient">
            <a href="PENDIENTE" target="_blank" onClick="window.open(this.href, this.target, 'width=900,height=800'); return false;"><input type="button" value="Crear Paciente"></a>
            <a href="PENDIENTE" target="_blank" onClick="window.open(this.href, this.target, 'width=900,height=800'); return false;"><input type="button" value="Actualizar Paciente"></a>
        </div>
        <div class = "home_report">
            <h3>Historia Clínica</h3>
        </div>
        <div class= "home_buttons_report">
            <a href="PENDIENTE" target="_blank" onClick="window.open(this.href, this.target, 'width=900,height=800'); return false;"><input type="button" value="Crear Reporte de Evolución"></a>
            <a href="PENDIENTE" target="_blank" onClick="window.open(this.href, this.target, 'width=900,height=800'); return false;"><input type="button" value="Reporte Histórico por paciente"></a>
        </div>

        <div class = "logout">
            <button type="button">Cerrar sesión</button>
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
            userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
            userDetailById: {
                username: "",
                contraseña: "",
            },
        };
    },

    apollo: {
        userDetailById: {
            query: gql`
                query ($userId: Int!) {
                    userDetailById(userId: $userId) {
                        username
                    }
                }
            `,

        variables() {
            return {
                userId: this.userId,
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

.home_buttons_patient{
    width: 260px;
    height: 260px;
    border-radius: 5px;
    background: rgba(3,3,3,0.25);
    box-shadow: 1px 1px 50px #000;
    display: inline-block;    
}

.home_buttons_report{
    width: 260px;
    height: 260px;
    border-radius: 5px;
    background: rgba(3,3,3,0.25);
    box-shadow: 1px 1px 50px #000;
    display: inline-block;
}


.home_content{
    font-family: 'Open Sans Condensed', sans-serif;
    position: relative;
    text-align: center;
    font-size: 20px;
    color: rgb(24 127 175);
    margin: 20px 5px 30px 20px;
    text-shadow: 3px 3px 10px rgb(175, 170, 170);
    }

</style>