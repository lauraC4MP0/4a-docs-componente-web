<template>
  <div class="main-container">
    <br />
    <center>
      <div id="error" class="alert alert-danger ocultar" role="alert">
        Las contraseñas no coinciden, vuelve a intentar.
      </div>
    </center>
    <div class="signup-container">
      <form action="" class="form-signup" v-on:submit.prevent="processSingUp">
        <ul class="signup-nav">
          <li class="signup-nav__item active">
            <a href="#">Crear cuenta</a>
          </li>
        </ul>
        <label for="signup-input-id" class="signup__label">
          Número de identificación
        </label>
        <input
          id="signup-input-id"
          class="signup__input"
          type="text"
          v-model="user.id"
        />
        <label for="signup-input-name" class="signup__label"> Username </label>
        <input
          id="signup-input-name"
          class="signup__input"
          type="text"
          v-model="user.username"
        />
        <label for="signup-input-password" class="signup__label">
          Contraseña
        </label>
        <input
          id="signup-input-password"
          class="signup__input"
          type="password"
          v-model="user.password"
        />
        <label for="signup-input-password2" class="signup__label">
          Confirma tu contraseña
        </label>
        <input
          id="signup-input-password2"
          class="signup__input"
          type="password"
        />
        <label for="signup-input-name" class="signup__label"> Nombres </label>
        <input
          id="signup-input-name"
          class="signup__input"
          type="text"
          v-model="user.name"
        />
        <label for="signup-input-lastname" class="signup__label">
          Apellidos
        </label>
        <input
          id="signup-input-lastname"
          class="signup__input"
          type="text"
          v-model="user.lastname"
        />
        <label for="signup-input-user" class="signup__label"> email </label>
        <input
          id="signup-input-email"
          class="signup__input"
          type="email"
          v-model="user.email"
        />
        <label for="signup-sign-up" class="signup__label--checkbox">
          <input
            id="signup-sign-up"
            type="checkbox"
            class="signup__input--checkbox"
          />
          Quiero recibir notificaciones a mi correo
        </label>
        <button class="signup__submit" type="submit" id="signup">
          Registrarse
        </button>
      </form>
      <a href="#" class="login">¿Ya tienes cuenta? Inicia sesión</a>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",
  data: function () {
    return {
      user: {
        id: null,
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
      },
      pass1: document.getElementById("signup-input-password"),
      pass2: document.getElementById("signup-input-password2"),
      e: document.getElementById("error"),
      b: document.getElementById("signup"),
    };
  },
  methods: {
    processSingUp: async function () {
      var validation = true;
      if (pass1 != pass2) {
        document.getElementById("error").classList.add("mostrar");
        alert("Las contraseñan no coinciden, vuelve a intentar");
        validation = false;
      } else {
        document.getElementById("error").classList.remove("mostrar");
        setTimeout(function () {
          location.reload();
        }, 3000);
        validation = true;
      }
      if (validation) {
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation Mutation($userInput: SignUpInput) {
                signUpUser(userInput: $userInput) {
                  id
                  username
                  password
                  name
                  lastname
                  email
                }
              }
            `,
            variables: {
              userInput: this.user,
            },
          })
          .then((result) => {
            let dataSignUp = {
              id: result.id,
              username: result.username,
              password: result.password,
              name: result.name,
              lastname: result.lastname,
              email: result.email,
            };
            this.$emit("completedSignUp", dataSignUp);
          })
          .catch((error) => {
            console.log(error);
            alert("ERROR 400: Ingrese datos válidos, por favor");
          });
      }
    },
  },
};
</script>

<style>
body {
  background-color: rgb(255 255 255 / 60%);
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 1px;
}

* {
  box-sizing: border-box;
  transition: 0.25s all ease;
}


.signup-container {
  display: block;
  position: relative;
  z-index: 0;
  margin: 4rem auto 0;
  padding: 5rem 4rem 0 4rem;
  width: 100%;
  padding-bottom: 50px;
  max-width: 525px;
  min-height: 680px;
  background-image: image("background-signup.png");
  box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.85);
}

.signup-container:after {
  content: "";
  display: inline-block;
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: radial-gradient(
    ellipse at left bottom,
    rgba(22, 24, 47, 1) 0%,
    rgba(38, 20, 72, 0.9) 59%,
    rgba(17, 27, 75, 0.9) 100%
  );
  box-shadow: 0 -20px 150px -20px rgba(0, 0, 0, 0.5);
}

.form-signup {
  position: relative;
  z-index: 1;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.signup-nav {
  position: relative;
  padding: 0;
  margin: 0 0 3em 1rem;
}

.signup-nav__item {
  list-style: none;
  display: inline-block;
}

.signup-nav__item + .signup-nav__item {
  margin-left: 2.25rem;
}

.signup-nav__item a {
  position: relative;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
  transition: 0.2s all ease;
}

.signup-nav__item.active a,
.signup-nav__item a:hover {
  color: #ffffff;
  transition: 0.15s all ease;
}

.signup-nav__item a:after {
  content: "";
  display: inline-block;
  height: 10px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  right: 100%;
  bottom: -1px;
  left: 0;
  border-radius: 50%;
  transition: 0.15s all ease;
}

.signup-nav__item a:hover:after,
.signup-nav__item.active a:after {
  background-color: rgb(17, 97, 237);
  height: 2px;
  right: 0;
  bottom: 2px;
  border-radius: 0;
  transition: 0.2s all ease;
}
.signup__label {
  display: block;
  padding-left: 1rem;
}

.signup__label,
.signup__label--checkbox {
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.signup__label--checkbox {
  display: inline-block;
  position: relative;
  padding-left: 1.5rem;
  margin-top: 2rem;
  margin-left: 1rem;
  color: #ffffff;
  font-size: 0.75rem;
  text-transform: inherit;
}

.signup__input {
  color: white;
  font-size: 1.15rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  outline: none;
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1px;
}

.signup__input:hover,
.signup__input:focus {
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background-color: transparent;
}

.signup__input + .signup__label {
  margin-top: 1.5rem;
}

.signup__input--checkbox {
  position: absolute;
  top: 0.1rem;
  left: 0;
  margin: 0;
}

.signup__submit {
  color: #ffffff;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 2rem;
  display: block;
  width: 100%;
  background-color: rgba(17, 97, 237, 0.75);
  border: none;
  cursor: pointer;
}

.signup__submit:hover {
  background-color: rgba(17, 97, 237, 1);
}

.login {
  display: block;
  margin-top: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.75rem;
  text-decoration: none;
  position: relative;
  z-index: 1;
}

.login:hover {
  color: rgb(17, 97, 237);
}

.signup-container .ocultar {
  display: none;
}
.signup-container .mostrar {
  display: block;
}

#error {
  background-color: #f8d7da;
  height: 80px;
  color: #b53840;
  width: 400px;
  align-items: center;
  align-self: center;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-radius: 5px;
  top: 50%;
}
</style>
