<template>
  <div>
  <div class="page-title">
    <h3>Аккаунт</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <div class="row">
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Максимум учеников</span>

          <p class="currency-line">
            <span v-if="this.user">{{this.user.account.maxPupils}}</span>
            <span v-else>Нет данных</span>
          </p>
        </div>
        <div class="card-content white-text">
          <span class="card-title">Сейчас учеников</span>

          <p class="currency-line">
            <span v-if="this.user">{{this.user.account.pupils}}</span>
            <span v-else>Нет данных</span>
          </p>
        </div>
      </div>
    </div>

    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>руб</td>
              <td>12121</td>
              <td>12.12.12</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data: () => ({
    account: null,
    user: null
  }),
  async mounted(){
    this.user = this.$store.getters.user
    console.log(this.user)
     // const result = await this.$store.dispatch('getAccount')
     // this.account = result
  }
}
</script>
<style>
.bill-card{
  height: 400px
}
</style>
