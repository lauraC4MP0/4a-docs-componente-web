<template>
  <div class="container">
    <div class="search">
      <h1>Eliminar paciente</h1>
      <form class="form" v-on:submit.prevent="deletePatient">
        <label for="form">
          <i class="ion-location"></i>
        </label>
        <input
          type="number"
          placeholder="Documento de identificación"
          v-model="idPatient"
        />
        <input type="submit" value="Eliminar" />
      </form>
      <div id="madeby">
        <span>
          Photo by
          <a
            href="https://www.borgenmagazine.com/doctors-without-borders/"
            target="_blank"
            >BORGEN magazine</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "DeletePatient",
  data: function () {
    return {
      idPatient: null,
    };
  },
  methods: {
    deletePatient: async function () {
      console.log(this.idPatient);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($deletePatientId: Int) {
              deletePatient(id: $deletePatientId)
            }
          `,
          variables: { deletePatientId: this.idPatient },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.deletePatient);
          alert(result.data.deletePatient);
          this.$emit('completedDeletePatient', result);
        }).catch((error)=>{
            console.log(error);
            if(error=="Error: 404: Not Found"){
                alert("El paciente "+this.idPatient+" ya ha sido eliminado con anterioridad");
            }else{
                alert("Ha ocurrido un error, verifique el documento por favor")
            }
        })
    },
  },
};
</script>

<style>
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
  background: url("https://www.borgenmagazine.com/wp-content/uploads/2020/06/Doctors-Without-Borders.jpg")
    no-repeat center center fixed;
  color: #000;
  overflow: hidden;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1.5rem;
}

i {
  font-size: 1.3rem;
}

.search {
  height: 100vh;
  width: 100%;
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
  position: inherit;
  bottom: 0;
  right: 0;
  padding: 25px 100px;
  color: #fff;
  font-size: 9px;
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
    padding: 30px 20px;
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
</style>