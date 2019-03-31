<template>
  <div class="home">
    <UsersTable v-if="loggedIn" :users="users" />
    <div v-if="!loggedIn" class="notLoggedIn">
      <img src="../assets/logo.png" alt="">
      <p>Log ind for at bruge hjemmesiden</p>
    </div>
  </div>
</template>

<script>
import UsersTable from "../components/UsersTable.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    UsersTable: UsersTable
  },
  data() {
    return {
      loggedIn: localStorage.user
    }
  },
  created() {
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    ...mapState(['users'])
  }
};
</script>
<style>
.notLoggedIn {
  color: red;
}
</style>
