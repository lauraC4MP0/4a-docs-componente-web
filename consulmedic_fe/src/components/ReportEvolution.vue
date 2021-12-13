<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__featured">
        <div class="modal__circle"></div>
        <img
          src="https://th.bing.com/th/id/R.6cb7c5bd661c6fcc83f879ce700b8683?rik=BE2%2bcdiUfcgz6g&riu=http%3a%2f%2fpngimg.com%2fuploads%2fdoctor%2fdoctor_PNG16040.png&ehk=rBsfv%2fzzBQUxOHjioTN8rph0vBrs%2fpqtEWiSkhSH9n8%3d&risl=&pid=ImgRaw&r=0"
          class="modal__product"
        />
      </div>
      <div class="modal__content">
        <h2>REPORTE MÉDICO DEL PACIENTE</h2>
        <form v-on:submit.prevent="processReportEvolution">
          <ul class="form-list">
            <li class="form-list__row form-list__row--inline">
              <div>
                <label>Fecha de reporte<br><br><div class="date">{{this.date.toDateString()}}</div></label>
                <br />
              </div>
            </li>

            <li class="form-list__row">
              <label>Doc. de identidad</label>
              <input type="text" name="" required="" v-model="reportEvolution.idPatient"/>
            </li>

            <li class="form-list__row">
              <label>Peso</label>
              <input type="text" name="" required="" v-model="reportEvolution.weight" />
            </li>

            <li class="form-list__row">
              <label>Motivo de la consulta</label>
              <input type="text" name="" required="" v-model="reportEvolution.reason_for_consultation"/>
            </li>

            <li class="form-list__row">
              <label>Enfermedad actual</label>
              <input type="text" name="" required="" v-model="reportEvolution.current_illness"/>
            </li>

            <li class="form-list__row">
              <label>Antecedentes</label>
              <input type="text" name="" required="" v-model="reportEvolution.background"/>
            </li>

            <li class="form-list__row">
              <label>Diagnóstico</label>
              <input type="text" name="" required="" v-model="reportEvolution.diseaes"/>
            </li>

            <li class="form-list__row">
              <label>Alergias</label>
              <input type="text" name="" required="" v-model="reportEvolution.allergies"/>
            </li>

            <li class="form-list__row">
              <label>Historia familiar de enfermedades</label>
              <input type="text" name="" required="" v-model="reportEvolution.hereditary_family_history"/>
            </li>

            <li class="form-list__row">
              <label>Examen físico</label>
              <input type="text" name="" required="" v-model="reportEvolution.physical_exam"/>
            </li>

            <li class="form-list__row">
              <label>Fórmula médica</label>
              <input type="text" name="" required="" v-model="reportEvolution.medicines"/>
            </li>

            <li>
              <button type="submit" class="button">
                Crear Reporte
              </button>
            </li>
          </ul>
        </form>
      </div>
       <ul id="navigationMenu">
    <li>
        <b class="home"> <router-link to="/user/reportEvolution"><span>Crear Reporte</span></router-link></b>
    </li>

    <li>
          <b class="about"> <router-link to="/user/historicReport"><span>Consultar Reportes</span></router-link>
        </b>
    </li>
    
</ul>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "ReportEvolution",
  data: function () {
    return {
      reportEvolution: {
        idPatient: null,
        weight: "",
        reason_for_consultation: "",
        current_illness: "",
        background: "",
        diseases: "",
        allergies: "",
        hereditary_family_history: "",
        physical_exam: "",
        medicines: "",
      },
      date: null,
    };
  },
  created: async function () {
    let now=Date.now();
    this.date=new Date(now);
    console.log(this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate());
  },

  methods: {
    processReportEvolution: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateReportEvolution(
              $reportEvolution: ReportEvolutionInput!
            ) {
              createReportEvolution(reportEvolution: $reportEvolution) {
                date
                idPatient
                age
                weight
                reason_for_consultation
                current_illness
                background
                diseases
                allergies
                hereditary_family_history
                physical_exam
                medicines
              }
            }
          `,

          variables: {
            reportEvolution: this.reportEvolution,
          },
        })

        .then((result) => {
          let dataReportEvolution = {
            date: result.data.createReportEvolution.date,
            idPatient: result.data.createReportEvolution.idPatient,
            age: result.data.createReportEvolution.age,
            weight: result.data.createReportEvolution.weight,
            reason_for_consultation:
              result.data.createReportEvolution.reason_for_consultation,
            current_illness: result.data.createReportEvolution.current_illness,
            background: result.data.createReportEvolution.background,
            diseases: result.data.createReportEvolution.diseases,
            allergies: result.data.createReportEvolution.allergies,
            hereditary_family_history:
              result.data.createReportEvolution.hereditary_family_history,
            physical_exam: result.data.createReportEvolution.physical_exam,
            medicines: result.data.createReportEvolution.medicines,
          };
          this.$emit("completedReportEvolution", dataReportEvolution);
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR 404: Verifique que el documento de identidad del paciente es correcto"
          );
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
  background-color: #f0f0f0;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 600;
}
.date{
    width: calc(100% - 10px);
  min-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  letter-spacing: 0.5px;
  border: 0;
  border-bottom: 2px solid #f0f0f0;
  color:#000;

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
}
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

#input--cc {
  position: relative;
  padding-top: 6px;
}
#input--cc input {
  padding-left: 46px;
  width: calc(100% - 46px);
}
#input--cc:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 36px;
  height: 45px;
  background-image: url("reporteFoto.jpg") no-repeat center center fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.modal {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding-top: 600px; /*aumenté de 200 a 600px*/
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

.modal__content h2 {
  padding-top: 50px;
}
</style>
