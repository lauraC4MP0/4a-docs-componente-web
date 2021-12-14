<template>

    <div class="logIn_user">

        <div class="container_logIn_user">

            <h1>CONSULMEDIC</h1>
            

            <form v-on:submit.prevent="processLogInUser" >
                <input type="text" v-model="user.username" placeholder="Usuario">
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script>

import gql from "graphql-tag";

export default {
        name: "LogIn",

    data: function() {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },

    methods: {
        processLogInUser: async function() {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($credentials: CredentialsInput!) {
                            logIn(credentials: $credentials) {
                            refresh
                            access
                        }
                    }
                `,
                variables: {
                    credentials: this.user,
                },
            })

            .then((result) => {
                let dataLogIn = {
                    id: this.user.username,
                    token_access: result.data.logIn.access,
                    token_refresh: result.data.logIn.refresh,
                };
                this.$emit('completedLogIn', dataLogIn)
            })

            .catch((error) => {
                if (error.response.status == "401")
                    alert("ERROR 401: Datos incorrectos, por favor intente de nuevo.");
            });
        },
    },
}
</script>

<style>
    .logIn_user{
        
        
        height: 100%;
        width: 100%;
        background: url("consulmedicinicio.png") no-repeat center center fixed; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    
    .container_logIn_user {
  
      
        
        width: 260px;
        height: 260px;
        border-radius: 5px;
        background: rgba(3,3,3,0.25);
        box-shadow: 1px 1px 50px #000;
        display: inline-block;
    }
  
    .logIn_user h1{
        font-family: 'Open Sans Condensed', sans-serif;
        position: relative;
        text-align: center;
        font-size: 20px;
        color: rgb(24 127 175);
        margin: 20px 5px 30px 20px;
        text-shadow: 3px 3px 10px rgb(175, 170, 170);
    }
    
    .logIn_user input{
        font-family: 'Open Sans Condensed', sans-serif;
        text-decoration: none;
        position: relative;
        width: 80%;
        display: block;
        margin: auto;
        font-size: 17px;
        color: rgb(2, 1, 1);
        padding: 4px;
        border-radius: 6px;
        -webkit-transition: all 2s ease-in-out;
        -moz-transition: all 2s ease-in-out;
        -o-transition: all 2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }
  
    .logIn_user input:focus{
        outline: none;
        box-shadow: 3px 3px 10px #333;
        background: #c4f8ffec;
    }
  
    .logIn_user button{
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 30px;
        margin: auto;
         width: 200px;   
        background: rgb(24 127 175);
        color: #ffffff;
        background: rgb(24 127 175);
        border: 1px solid #E5E7E9;
        border-radius: 50px;
        padding: 10px 20px;
        overflow: hidden;
        display: block;
        box-shadow: 10px 10px 30px #000;
    }
    
  
    .logIn_user button:hover{
        color: #283747;
background: #E5E7E9;
border: 1px solid #E5E7E9;
    }
  
    </style>