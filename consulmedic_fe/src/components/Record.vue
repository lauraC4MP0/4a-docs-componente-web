<template>

<div id="Transaction" class="transaction">
    <div class="container_transaction">
      <div class="display-flex">
        <h2>Historico de Reportes</h2>
       <img class= "icon-home" src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8aGhoAAAAWFhby8vImJiYPDw9XV1ebm5sYGBjS0tJoaGjIyMgUFBQQEBAICAjd3d3s7Oz5+fmOjo4yMjJMTEzl5eW2trasrKx9fX2ioqIgICA3NzdFRUXo6Oh2dnbU1NS0tLS/v79gYGBUVFSKioqLi4s0NDRtbW1ISEgqKiqmpqZ4eHg/Pz+VlZWCgoI0MxxKAAAH00lEQVR4nO2dbXuiPBNA64AoSkDxBVu1vlS7Xav2//+7J7pPW5EJE6JAvK85H/aTlBwgk8kkLE9PDMMwDMMwDHMjyaKV4W3Qq7tZdyPeQORlAZjU3bJ78QENFAfGdTdNTdyPtX/rKgQbDTiW2MRb6A+GADAc9PV+HigNo49yG2pI/BKCkM0TELa1bqTa0OuW3VgT1kNwfvrRcK1xxGMZ9kbn+/eNgBEd8h/J0H0G77qR8OUSRz2Q4UsDaytMiWHtYQzXf346YBoBhyDvwAcx7LVSHTBNCN2csfshDN2vTAdME0VH5cjxCIaTKfi5go2GD7tEcbT9hsFM0QHTKEcO2w3H3ZwOeNVgeMZGDrsN3S1Emn4noPGS/RtWG67oDpjGgT+ZkcNiw45eB0wj4O1q5LDWcPwBYWG/ExEMUiOHpYbxwFM2jAR2q4s/Zadh4hs8oL8ImP+OHDYaduY3+Z0IYfFdArDP8FWjA/oOGWNBtC01PIZUB/QAomYk/8m3dGC2ttAwEdQDGsFbcIqVcfBBZQMhtMaWGS43lJ8c7n5jSO+Nyug82MYdewz7C2KOJGcQV7Wn9ZBKemC4V/7Rqg3bZAcEyNYPX4A4Sqgf5WoN11PqAfVggU0dXPLOW2G4zCtSnHFg0zE+uHZDd09FRR+Eagp/Yl10DlKx4UtEte86mc5yLDSPrNbwokyvIITuK/ln+h/Fu2MlhvSQ5sA8txz6Q2dUNJutwDD+ojtggZXaFRTrjuUbTsgWRfClvxQqr1ixsk7ZhsGB8pMdULG0FMcK8XG3QGWgXMMe2RRftR7R27bms3nrHa/k0xeuEkOtDviJHup2ATwhhJxDIaXDE5+63bFEQzokRLBH1wXj9u+lkTcZT3Po61eyYUAWKQS0luihSXouoeyo9CBUouGrRgds4uvzwd9MuyO8ki8TiR09OpZiGL+TD5CcI6GHjlvYpfGxKdWZNjWvaoi55oaVAiQh1QE9+EBP28+u4f84Kta56XlVSOa7BaHzKgdGaPCI2yLnhsjEDn+sO1RVRHaIO25uc8ncWD5xK/TQFdWpQmjhIYd8aKhdAPrE9Pwmgnf00GCmERjl041PQAYRcV4Bm3vsw0yaVLcPM4tG/9AL/I1ThNqiYZUO3h4s6OlZPssN1UpViiYDjHYuLTsVngbRAzB46p0OGmh1QLxtg2LzIQFDvNhBzmIccuORmpgelyLF1q2VU7j8ImCOB2MykXNgZhZy1n+oVqbK2JdHHoxWoFSZHN2fVQ3JJXcr0xkfduhYJhtktgSsfiQCsiKkzAFVaBRrFSmaSV3pF9mt8f3N5LxKeSRKTBbcZZjeYymaeySPJB2naO6A7N/UPBKB7kYObJbYkZOdUX03jVCU6OgCuYC/OiEHnwik/Xw0sgcHwxr9NapMjl4hUSUfF7h7ugNG6AO/HN3J74RqnnKM6PErP+T0NFI0NIscm68j4cjAgbX0VSMENnNGjvGUONzBh+V4S17bwsjBCM2WOn/Jxbyp+kkd5WcPPgg0QfoUdwgwWYTinQVyz1w0Ugkm+TdCzpGwJJdeoDFGwGiJnDF+J+ZVoFrQO+QFUYHnVB3TRU49ZMjBHjmiQB4ecEH1i1Tnt1ywoUbO4O4bYLJAhGZy+fuPAY+n6u0rsgNiVWpXs357G6qa3GfO/AXwkX+tMsRfb4lfbtiEWAg/vWXx4gKrHiDA61sKQ4FnGInJLllTZMjB7opyAqQwXGKGDl7G7mSL2OXinfeBZe9KE73OsEQNnxBDCLE50g1TQHMU05m2gzUbF3xaXP82hD2SolUTYBDwTA6pqcNCYdhL33E5jVliF81sC8w9kCEHS6quk34HlJlpcvFL2QGxzGBFzmBKRZHJJZfdUShTGsna+f8vfYiwpY9gXnGAySLQ2Xd8/N68JA1y38DtP0dwZo9ErloCTBY8kxvv/zU8eqYW3tx1+9hOkB7tFihilwxEW+QBcxPZ8nWxktslx4KbekrFVy3GmrO6R43pnviqZQAzLAgwWRSZnAljOwJMltCkmJ+lT1ff6sP7fcHGlLh9/xrTXYEIrclpM9HY21IzDp7J6aG1DF8/Aq+waOBG9nbANJ5n9qS6Tduf0G+cJhuyoe2wIRvaDxuyof2wIRvaDxuyof2wIRvaDxuyof2wIRvaDxuyof2wIRvaDxuyof2wIRvaDxuyof3UYehDIW7c+1i9oQOwTTraBJ+j2/Y/Vm4Yeor/j01Nb3PLFsiqDcOdyb7WwQ2KFRs6kdmn+77MFSs2zHtjJZeh8VbPag3DjaFgzjusdhmaf0Ez3pnexIoNzbfPL0zfyanU0Jmab54/mj6m1RruzLfOt9mQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDdmQDf/jhruHMTQ8aTwzeIelFkMxM/z6eMvgtcdaDL2W4RmfDc5YiyE8G55R+blA6wxzv/CUQ2wQTOswdJqG3dDoVas6DIt8c/yasHA0rcFQhOaCT0HhrzxVb+grPjqqyWdRxcoNfUA//azPpOD/d1C1YWj+Vu43y0Mhx2oNQzgsbxWUJKPTR/c8PaLpLYaaJ/l3JtmqEfYVXRPGk/duS5M3c8PJSPckJ7qDidl/bcAwDMMwDMNYyP8AmibOYq4YefwAAAAASUVORK5CYII="  />
      </div>
      <form class= " display-flex" v-  on:submit.prevent="processTransaction">
        <label class="label">  Documento:  </label>
        <input class="documento"
          type="number"
          v-model="createTransaction.value"
          placeholder="Documento"
        />
        <button type="submit"> Buscar </button>
      </form>
       <ul class= "ListaReportes"> 
         <li> Reporte 1 </li>
          <li> Reporte 2 </li>
          <li> Reporte 3 </li>
      </ul>
    </div>
  </div>

 
</template>


<script>
import gql from "graphql-tag";

export default {
  name: "Transaction",

  data: function() {
    return {
      createTransaction: {
        usernameOrigin: localStorage.getItem("username"),
        usernameDestiny: "",
        value: "",
      },
    };
  },

  methods: {
    processTransaction: async function() {
      
      if (localStorage.getItem("token_access")  === null ||
          localStorage.getItem("token_refresh") === null ) {
        this.$emit("logOut");
        return;
      }

      localStorage.setItem("token_access", "");

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        })
        .catch((error) => {
          this.$emit("logOut");
          return;
        });
      
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($transaction: TransactionInput!) {
              createTransaction(transaction: $transaction) {
                date
                id
                usernameDestiny
                usernameOrigin
                value
              }
            }
          `,
          variables: {
            transaction: this.createTransaction,
          },
        })
        .then((result) => {
          alert("Transacción Realizada de Manera Correcta, Revise Historial");
        })
        .catch((error) => {
          alert("Saldo Insuficiente o Destino Incorrecto");
        });
    },
  },
};
</script>


<style>

.transaction {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container_transaction {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 50%;
  background:#a6e3fa;;
  

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.transaction h2 {
  color: #283747;
}

.transaction form {
  width: 50%;
}

.transaction input {
  height: 40px;
  width: 150px;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid #283747;
}

.transaction button {
  width: 100%;
  height: 40px;

  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

.transaction button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
.display-flex {
  display: flex;
  align-items:center;
  gap:20px;
}
.icon-home {
  width:40px;
  margin-left:10px
}
.label{
  font-size:18px
}
.documento{
  width:100px;
}
.ListaReportes{
  background: white;
  width:80%;
  border-radius:5px;
}
.ListaReportes li{
  text-decorate:none;
}
</style>


