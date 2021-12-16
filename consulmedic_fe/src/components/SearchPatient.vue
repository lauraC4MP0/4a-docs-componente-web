<template>
  <div class="container">
    <div class="search">
      <h1>Buscar paciente</h1>
      <form class="form" v-on:submit.prevent="patientById">
        <label for="form">
          <i class="ion-location"></i>
        </label>
        <input
          type="number"
          placeholder="Documento de identificación"
          v-model="idPatient"
        />
        <input type="submit" value="Buscar" />
      </form>
      <div id="madeby">
        <span>
          Photo by
          <a
            href="https://24x7doctorsansweringservice.com/improving-doctor-patient-communication/"
            target="_blank"
            >24x7doctorsansweringservice</a
          >
        </span>
      </div>
      <br />
      <br />
    </div>
    <div class="info">
      <div class="patient">
        <form class="form">
          <h2>Paciente</h2>
          <p type="Documento de identidad: ">
            {{ patient.id }}<input disabled />
          </p>
          <p type="Nombres: ">{{ patient.name }}<input disabled /></p>
          <p type="Apellidos: ">{{ patient.lastname }}<input disabled /></p>
          <p type="Fecha de nacimiento: ">
            {{ patient.dateBirth }}<input disabled />
          </p>
          <p type="Número de teléfono: ">
            {{ patient.phoneNumber }}<input disabled />
          </p>
          <p type="Email: "><input disbaled />{{ patient.email }}</p>
          <p type="Tipo de sangre: ">
            {{ patient.bloodType }}<input disabled />
          </p>
        </form>
      </div>
      <!--
      <div class="reports">
        <ul class="list">
          <li>
            <p type="Fecha: ">Hola<input disabled /></p>
            <p type="Peso: "><input disabled /></p>
            <p type="Motivo de consulta: "><input disabled /></p>
            <p type="Enfermedad actual: "><input disabled /></p>
            <p type="Antecedentes: "><input disabled /></p>
            <p type="Diagnóstico: "><input disbaled /></p>
            <p type="Alergias: "><input disabled /></p>
            <p type="Historia familiar de enfermedades: "><input disabled /></p>
            <p type="Examen físico: "><input disabled /></p>
            <p type="Fórmula médica: "><input disabled /></p>
          </li>
        </ul>
      </div>-->
      <ul id="navigationMenu">
        <li>
          <b class="home">
            <router-link to="../patients"
              ><span>Crear Paciente</span></router-link
            ></b
          >
        </li>
        <li>
          <b class="about">
            <router-link to="/user/searchPatient"
              ><span>Buscar paciente</span></router-link
            ></b
          >
        </li>

        <li>
          <b class="portfolio">
            <router-link to="/user/deletePatient"
              ><span>Eliminar paciente</span></router-link
            >
          </b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "searchPatient",
  data: function () {
    return {
      idPatient: null,
      patient: {
        id: null,
        name: "",
        lastname: "",
        dateBirth: "",
        phoneNumber: null,
        email: "",
        bloodType: "",
      },
    };
  },
  methods: {
    patientById: async function () {
      console.log(this.idPatient);
      await this.$apollo
        .query({
          query: gql`
            query Query($patientByIdId: Int) {
              patientById(id: $patientByIdId) {
                id
                name
                lastname
                dateBirth
                phoneNumber
                email
                bloodType
                is_active
              }
            }
          `,
          variables: { patientByIdId: this.idPatient },
        })
        .then((result) => {
          console.log(result.data);
          this.patient = result.data.patientById;
          console.log(this.patient);
          alert("Paciente " +this.patient.name +" " +this.patient.lastname +
              " encontrado exitosamente."
          );
        })
        .catch((error) => {
          console.log(error);
          if (error == "Error: 404: Not Found") {
            alert("No existe ningún paciente con el id " + this.idPatient);
          } else {
            alert("Ha ocurrido un error, verifique el documento por favor");
          }
        });
    },
  },
};
</script>

<style >
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

::-webkit-input-placeholder {
  color: #000;
}

::-moz-placeholder {
  color: #000;
}

:-moz-placeholder {
  color: #000;
}

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.container {
  /*width: 1920;
    height: 1282;*/
  font-family: "Lato", sans-serif;
  margin: 0;
  background: url("https://24x7doctorsansweringservice.com/wp-content/uploads/2018/08/doctor-patient-communication.jpg")
    no-repeat center center fixed;
  color: #000;
  overflow: hidden;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 1.5rem;
}

i {
  font-size: 1.3rem;
}

.search {
  height: 100vh;
  background-color: #fff;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0.05)),
    to(rgba(0, 0, 0, 0))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 20px 50px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-direction: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.form input[type="submit"] {
  background-color: #252787;
  border: 1px solid #252787;
  color: #fff;
  padding: 0 30px;
  cursor: pointer;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

.form input[type="submit"]:hover {
  background-color: #252787;
  border: 1px #000;
  font-family: "Lato", sans-serif;
  font-size: 18px;
}

.form {
  display: -webkit-box;
  display: flex;
  z-index: 10;
  position: relative;
  width: 500px;
  height: 40px;
  box-shadow: 4px 8px 16px rgb(0, 0, 0, 0.3);
}

input[type="number"] {
  outline: none;
  padding-left: 15px;
  flex-basis: 500px;
  font-family: "Lato", sans-serif;
  font-size: 18px;
}

#madeby {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 25px 100px;
  color: #fff;
}

@media all and (max-width: 800px) {
  .container {
    font-size: 0.9rem;
  }
  .form {
    width: 100%;
  }

  input[type="search"] {
    flex-basis: 100%;
  }

  .form > * {
    font-size: 0.9rem;
  }

  h1 {
    font-size: 2rem;
  }

  .search {
    padding: 20px;
  }
  #madeby {
    padding: 30px 20 px;
  }
}

@media all and (max-width: 360px) {
  .form {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  input[type="search"] {
    flex-basis: 0;
  }

  label {
    display: none;
  }
}

/*-----*/
.info {
  align-items: center;
  background: #f2f4f8;
  border: 0;
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  height: 400px;
  justify-content: center;
}

.info form {
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.info form .number,
form .number a {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.825rem;
  order: 4;
  text-align: center;
  margin-top: 0.25rem;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  display: inline;
}

.info form a:hover {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  transition: color 0.25s;
}

.info form a:focus {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

.info form > div {
  order: 2;
}

label {
  display: flex;
  flex-direction: column;
}

.label-show-password {
  order: 3;
}

label > span {
  color: var(--borderDarker);
  display: block;
  font-size: 0.825rem;
  margin-top: 0.625rem;
  order: 1;
  transition: all 0.25s;
}

label > span.required::after {
  content: "*";
  color: #dd6666;
  margin-left: 0.125rem;
}

label input {
  order: 2;
  outline: none;
}

label input::placeholder {
  color: var(--borderDark);
}

/* trick from https://css-tricks.com/snippets/css/password-input-bullet-alternatives/ */
label input[name="password"] {
  -webkit-text-security: disc;
}

input[name="show-password"]:checked ~ div label input[name="password"] {
  -webkit-text-security: none;
}

label:hover span {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

input[type="checkbox"] + div label:hover span::before,
label:hover input.text {
  border-color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

label input.text:focus,
label input.text:active {
  border-color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  box-shadow: 0 1px
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
}

input.text:focus + span,
input.text:active + span {
  color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
}

.info input {
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-sizing: border-box;
  font-size: 1rem;
  height: 2.25rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  order: 2;
  padding: 0.25rem 0.5rem;
  width: 15rem;
  transition: all 0.25s;
}

.info input[type="submit"] {
  color: hsl(var(--bgColorH), var(--bgColorS), var(--bgColorL));
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.625rem;
  order: 4;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  padding-left: 0;
  text-transform: uppercase;
}

input[type="checkbox"]:focus + label span::before,
input[type="submit"]:focus {
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

input[type="submit"]:focus {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type="submit"]:hover {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type="submit"]:active {
  background: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  transition: all 0.125s;
}

/** Checkbox styling */
.a11y-hidden {
  position: absolute;
  top: -1000em;
  left: -1000em;
}

.info input[type="checkbox"] + label span {
  padding-left: 1.25rem;
  position: relative;
}

.info input[type="checkbox"] + label span::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
}

input[type="checkbox"]:checked + label span::after {
  content: "";
  display: block;
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 0.375rem;
  height: 0.375rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

/** PERSON */
figure {
  --skinH: 30;
  --skinS: 100%;
  --skinL: 87%;
  --hair: rgb(180, 70, 60);
  background: hsl(var(--fgColorH), calc(var(--fgColorS) * 2), 95%);
  border: 1px solid rgba(0, 0, 0, 0.0625);
  border-radius: 50%;
  height: 0;
  margin: auto auto;
  margin-bottom: 2rem;
  order: 1;
  padding-top: 60%;
  position: relative;
  width: 60%;
  overflow: hidden;
}

figure div {
  position: absolute;
  transform: translate(-50%, -50%);
}

figure .skin {
  background: hsl(var(--skinH), var(--skinS), var(--skinL));
  box-shadow: inset 0 0 3rem
    hsl(var(--skinH), var(--skinS), calc(var(--skinL) * 0.95));
}

figure .head {
  top: 40%;
  left: 50%;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  box-shadow: 0 -0.175rem 0 0.125rem var(--hair);
}

figure .ears {
  top: 47%;
  left: 50%;
  white-space: nowrap;
}

figure .ears::before,
figure .ears::after {
  content: "";
  background: hsl(var(--skinH), var(--skinS), var(--skinL));
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin: 0 2.1rem;
}

figure .head .eyes {
  top: 55%;
  left: 50%;
  white-space: nowrap;
}

@-webkit-keyframes blink {
  0%,
  90%,
  100% {
    height: 10px;
  }
  95% {
    height: 0;
  }
}

@keyframes blink {
  0%,
  90%,
  100% {
    height: 10px;
  }
  95% {
    height: 0px;
  }
}

figure .head .eyes::before,
figure .head .eyes::after {
  content: "";
  background: var(--borderDarker);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin: 0 0.5rem;
  -webkit-animation: blink 5s infinite;
  animation: blink 5s infinite;
  transition: all 0.15s;
}

input[name="show-password"]:checked ~ figure .head .eyes::before,
input[name="show-password"]:checked ~ figure .head .eyes::after {
  height: 0.125rem;
  animation: none;
}

figure .head .mouth {
  border: 0.125rem solid transparent;
  border-bottom: 0.125rem solid var(--borderDarker);
  width: 25%;
  border-radius: 50%;
  transition: all 0.5s;
}

form:invalid figure .head .mouth {
  top: 75%;
  left: 50%;
  height: 10%;
}

form:valid figure .head .mouth {
  top: 60%;
  left: 50%;
  width: 40%;
  height: 40%;
}

figure .hair {
  top: 40%;
  left: 50%;
  width: 66.66%;
  height: 66.66%;
  border-radius: 100%;
  overflow: hidden;
}

figure .hair::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hair);
  border-radius: 50%;
  top: -60%;
  left: -50%;
  box-shadow: 4rem 0 var(--hair);
}

figure .neck {
  width: 10%;
  height: 40%;
  top: 62%;
  left: 50%;
  background: hsl(var(--skinH), var(--skinS), calc(var(--skinL) * 0.94));
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 0.25rem var(--border);
}

figure .person-body {
  width: 60%;
  height: 100%;
  border-radius: 50%;
  background: red;
  left: 50%;
  top: 126%;
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

figure .shirt-1,
figure .shirt-2 {
  width: 12%;
  height: 7%;
  background: hsl(var(--bgColorH), var(--bgColorS), var(--bgColorL));
  top: 76%;
  left: 36.5%;
  transform: skew(-10deg) rotate(15deg);
}

figure .shirt-2 {
  left: 52.5%;
  transform: skew(10deg) rotate(-15deg);
}

.info {
  height: auto;
  font-family: "Montserrat", sans-serif;
}

.patient form {
  width: 340px;
  height: auto;
  background: #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 0 40px -10px #000;
  margin: calc(50vh - 220px) auto;
  padding: 20px 30px;
  max-width: calc(100vw - 40px);
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  position: relative;
}
.patient h2 {
  margin: 10px 0;
  padding-bottom: 10px;
  width: 180px;
  color: #78788c;
  border-bottom: 3px solid #78788c;
}
.patient input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: none;
  outline: none;
  resize: none;
  border: 0;
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s;
  border-bottom: 2px solid #bebed2;
}
.patient input:focus {
  border-bottom: 2px solid #78788c;
}
.patient p:before {
  content: attr(type);
  display: block;
  margin: 28px 0 0;
  font-size: 14px;
  color: #5a5a5a;
}
.patient button {
  float: right;
  padding: 8px 12px;
  margin: 8px 0 0;
  font-family: "Montserrat", sans-serif;
  border: 2px solid #78788c;
  background: 0;
  color: #5a5a6e;
  cursor: pointer;
  transition: all 0.3s;
}
.patient button:hover {
  background: #78788c;
  color: #fff;
}
.patient div {
  content: "Hi";
  position: absolute;
  bottom: -15px;
  right: -20px;
  background: #50505a;
  color: #fff;
  width: 320px;
  padding: 16px 4px 16px 0;
  border-radius: 6px;
  font-size: 13px;
  box-shadow: 10px 10px 40px -14px #000;
}
.patient span {
  margin: 0 5px 0 15px;
}

.list {
  counter-reset: li;
  list-style: none;
  *list-style: decimal;
  font: 15px;
  padding: 20px;
  margin-bottom: 4em;
  text-shadow: 0 1px 0 #000;
}
.list ul {
  margin: 0 0 0 2em;
  padding: 16px;
}
.list li {
  position: relative;
  display: block;
  padding: 0.4em 0.4em 0.4em 2em;
  *padding: 0.4em;
  margin: 0.5em 0;
  background-color: #e6e6e6;
  color: #000;
  text-decoration: none;
  border-radius: 0.3em;
  transition: all 0.3s ease-out;
}
.list li:hover {
  background: #e6e6e6;
  border: 1px solid #000;
}
.list li:hover:before {
  transform: rotate(360deg);
}
.list li:before {
  content: counter(li);
  counter-increment: li;
  position: absolute;
  left: -1.3em;
  top: 50%;
  margin-top: -1.3em;
  background: #e6e6e6;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: 1px solid #000;
  text-align: center;
  font-weight: bold;
  border-radius: 2em;
  transition: all 0.3s ease-out;
}
</style>