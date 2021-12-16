<template>
  <div id="newPatient" class="NewPatient">
    <div class="modal__container">
      <div class="modal__featured">
        <div class="modal__circle"></div>
        <img
          src="https://th.bing.com/th/id/R.6cb7c5bd661c6fcc83f879ce700b8683?rik=BE2%2bcdiUfcgz6g&riu=http%3a%2f%2fpngimg.com%2fuploads%2fdoctor%2fdoctor_PNG16040.png&ehk=rBsfv%2fzzBQUxOHjioTN8rph0vBrs%2fpqtEWiSkhSH9n8%3d&risl=&pid=ImgRaw&r=0"
          class="modal__product"
        />
      </div>
      <div class="modal__content">
        <h2>NUEVO PACIENTE</h2>
        <form v-on:submit.prevent="signUpPatient">
          <ul class="form-list">
            <li class="form-list__row">
              <label>Número de identificación</label>
              <input type="number" name="" required v-model="patient.id" />
            </li>
            <li class="form-list__row">
              <label>Nombres</label>
              <input type="text" name="" required v-model="patient.name" />
            </li>
            <li class="form-list__row">
              <label>Apellidos</label>
              <input type="text" name="" required v-model="patient.lastname" />
            </li>
            <li class="form-list__row form-list__row--inline">
              <div>
                <label>Fecha de nacimiento</label>
                <br />
                <div class="form-list__input-inline">
                  <input
                    type="text"
                    name="db_day"
                    placeholder="DD"
                    required
                    minlength="2"
                    maxlength="2"
                    id="day"
                  />
                  <input
                    type="text"
                    name="db_month"
                    placeholder="MM"
                    required
                    minlength="2"
                    maxlength="2"
                    id="month"
                  />
                  <input
                    type="text"
                    name="db_year"
                    placeholder="YYYY"
                    required
                    minlength="4"
                    maxlength="4"
                    id="year"
                  />
                </div>
              </div>
            </li>
            <li class="form-list__row">
              <label>Número de celular</label>
              <input
                type="number"
                name=""
                required
                v-model="patient.phoneNumber"
              />
            </li>
            <li class="form-list__row">
              <label>Email</label>
              <input type="email" name="" required v-model="patient.email" />
            </li>
            <li class="form-list__row">
              <label>Tipo de sangre</label>
              <div class="bloodType-selected">
                <br />
                <select v-model="patient.bloodType">
                  <option value="A+" selected>A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <i></i>
              </div>
            </li>
            <li>
              <button type="submit" class="button">Crear paciente</button>
            </li>
          </ul>
        </form>
        <span>
          Photo by
          <a href="http://pngimg.com/image/16040" target="_blank">pngimg</a>.
        </span>
      </div>
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
  name: "NewPatient",
  data: function () {
    return {
      year: document.getElementById("year"),
      month: document.getElementById("month"),
      day: document.getElementById("day"),
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
  created: async function () {},
  methods: {
    signUpPatient: async function () {
      this.patient.dateBirth =
        "" +
        document.getElementById("year").value +
        "-" +
        document.getElementById("month").value +
        "-" +
        document.getElementById("day").value +
        "";
      console.log(this.patient.dateBirth);
      console.log(this.patient);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation SignUpPatient($patientInput: SignUpInputPatient) {
              signUpPatient(patientInput: $patientInput) {
                id
                name
                lastname
                dateBirth
                phoneNumber
                email
                bloodType
              }
            }
          `,
          variables: {
            patientInput: this.patient,
          },
        })
        .then((result) => {
          let dataNewPatient = {
            id: this.patient.id,
            name: this.patient.name,
            lastname: this.patient.lastname,
            dateBirth: this.patient.dateBirth,
            phoneNumber: this.patient.phoneNumber,
            email: this.patient.email,
            bloodType: this.patient.bloodType,
          };
          console.log(result);
          this.$emit("completedNewPatient", dataNewPatient);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: " + error);
        });
    },
  },
};
</script>

<style>
.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

body {
  font-family: "Open Sans", sans-serif;
  color: #1a1a1a;
  background-color: rgb(255 255 255 / 60%);
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 600;
}

.button {
  color: #ffffff;
  background-color: #252787;
  padding: 12px 25px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 0;
  border-radius: 2px;
  outline: 0;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}
.button:hover,
.button:active,
.button:focus {
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.button--transparent {
  background: transparent;
  border: 0;
  outline: 0;
}

.button--close {
  position: absolute;
  top: 10px;
  left: 10px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #ffffff;
  border-radius: 50%;
  transition: all 0.25s;
  z-index: 10;
}
.button--close svg {
  width: 20px;
  height: 20px;
}
.button--close svg * {
  fill: currentColor;
}
.button--close:hover,
.button--close:active,
.button--close:focus {
  color: #252787;
  background-color: #ffffff;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
}

.button--info {
  position: absolute;
  top: 0;
  right: 0;
}

input {
  width: calc(100% - 10px);
  min-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  letter-spacing: 0.5px;
  border: 0;
  border-bottom: 2px solid #f0f0f0;
}
input:valid {
  border-color: #252787;
}
input:focus {
  outline: none;
  border-color: #252787;
}

.form-list {
  padding-left: 0;
  list-style: none;
}
.form-list__row {
  margin-bottom: 25px;
}
.form-list__row select {
  /*
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;*/
  display: inline-block;
  width: 80px;
  cursor: pointer;
  padding: 7px 10px;
  height: 42px;
  outline: 0;
  border: 0;
  border-radius: 0;
  background: #f0f0f0;
  color: #7b7b7b;
  font-size: 1em;
  color: #999;
  font-family: "Quicksand", sans-serif;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;
} /*
      .bloodType-selected select:hover{
        background: #B1E8CD;
    }
    .bloodType-selected i{
        position:static;
        right: 0;
        top: calc(50% - 13px);
        width: 10px;
        height: 10px;
        display: block;
        border-left:4px solid #252787;
        border-bottom:4px solid #252787;
        transform: rotate(-45deg); 
        transition: all 0.25s ease;
    }
    .bloodType-selected:hover i{
        margin-top: 3px;
    }*/
.form-list__row select::-ms-expand {
  display: none;
}
.bloodType-selected {
  max-width: 250px;
  position: relative;
}
.form-list__row label {
  position: relative;
  display: block;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.5px;
  color: #939393;
}
.form-list__row--inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.form-list__row--inline > :first-child {
  -ms-flex: 2;
  flex: 2;
  padding-right: 20px;
}
.form-list__row--inline > :nth-child(2n) {
  -ms-flex: 1;
  flex: 1;
}
.form-list__input-inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.form-list__input-inline > * {
  width: calc(50% - 10px - 10px);
}
.form-list__row--agree {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 12px;
}
.form-list__row--agree label {
  font-weight: 400;
  text-transform: none;
  color: #676767;
}
.form-list__row--agree input {
  width: auto;
  margin-right: 5px;
}

.NewPatient {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding-top: 200px;
  z-index: 100;
  overflow-y: auto;
}
.modal__container {
  display: -ms-flexbox;
  display: flex;
  max-width: 675px;
  min-height: 400px;
  margin-bottom: 125px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
  padding-top: 160px;
}
.modal__featured {
  position: relative;
  -ms-flex: 1;
  flex: 1;
  min-width: 230px;
  padding: 20px;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.modal__circle {
  position: absolute;
  top: 0;
  left: 0;
  height: 200%;
  width: 200%;
  background-color: #f0f2f7;
  border-radius: 50%;
  -ms-transform: translateX(-50%) translateY(-25%);
  transform: translateX(-50%) translateY(-25%);
}
.modal__product {
  position: absolute;
  padding-top: 120px;
  left: 50%;
  -ms-transform: translateX(calc(-50% - 10px));
  transform: translateX(calc(-50% - 10px));
}
.modal__content {
  -ms-flex: 3;
  flex: 3;
  padding: 40px 30px;
}
.modal {
  padding-top: 100px;
}

.modal__content h2 {
  padding-top: 50px;
}
#navigationMenu li {
  list-style: none;
  height: 39px;
  padding: 2px;
  width: 40px;
}
#navigationMenu span {
  /* Container properties */
  width: 0;
  left: 38px;
  padding: 0;
  position: absolute;
  overflow: hidden;

  /* Text properties */
  font-family: "Myriad Pro", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.6px;
  white-space: nowrap;
  line-height: 39px;

  /* CSS3 Transition: */
  -webkit-transition: 0.25s;

  /* Future proofing (these do not work yet): */
  -moz-transition: 0.25s;
  transition: 0.25s;
}

#navigationMenu b {
  /* The background sprite: */
  background: url("./navigation.jpg") no-repeat;

  height: 39px;
  width: 38px;
  display: block;
  position: relative;
}

/* General hover styles */

#navigationMenu b:hover span {
  width: auto;
  padding: 0 20px;
  overflow: visible;
}
#navigationMenu b:hover {
  text-decoration: none;

  /* CSS outer glow with the box-shadow property */
  -moz-box-shadow: 0 0 5px #9ddff5;
  -webkit-box-shadow: 0 0 5px #9ddff5;
  box-shadow: 0 0 5px #9ddff5;
}
/* Green Button */

#navigationMenu .home {
  background-position: 0 0;
}
#navigationMenu .home:hover {
  background-position: 0 -39px;
}
#navigationMenu .home span {
  background-color: #7da315;
  color: #3d4f0c;
  text-shadow: 1px 1px 0 #99bf31;
}

/* Blue Button */

#navigationMenu .about {
  background-position: -38px 0px;
}
#navigationMenu .about:hover {
  background-position: -38px -39px;
}
#navigationMenu .about span {
  background-color: #1e8bb4;
  color: #223a44;
  text-shadow: 1px 1px 0 #44a8d0;
}

/* Yellow Button */

#navigationMenu .portfolio {
  background-position: -114px 0;
}
#navigationMenu .portfolio:hover {
  background-position: -114px -39px;
}
#navigationMenu .portfolio span {
  background-color: #d0a525;
  color: #604e18;
  text-shadow: 1px 1px 0 #d8b54b;
}

.main-component {
  padding-top: 30px;
}
</style>
