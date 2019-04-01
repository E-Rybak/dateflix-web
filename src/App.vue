<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"><img height="40" src="./assets/logo.png" alt=""></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="loggedIn">
          <b-nav-item to="/">Forside</b-nav-item>
          <b-nav-item to="bans">Bandlyste brugere</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="loggedIn" class="ml-auto">
          <b-button variant="success" v-b-modal.register-modal>Opret ny administrator</b-button>
          <b-button variant="danger" v-on:click="logOut">Log ud</b-button>
        </b-navbar-nav>

        <b-navbar-nav v-else-if="!loggedIn" class="ml-auto">
          <b-button variant="success" v-b-modal.login-modal>Log ind</b-button>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view />
    <!-- Login modal & form -->
    <b-modal id="login-modal" title="Log ind">
      <b-form @submit.prevent="loginSubmit" @reset="reset">
        <b-form-group
        id="login-input-group-1"
        label="Email adresse:"
        label-for="login-email"
        >
        <b-form-input
        v-model="login_form.email"
        id="login-email"
        type="email"
        required
        placeholder="Email">
        </b-form-input>
      </b-form-group>

      <b-form-group
      id="login-input-group-2"
      label="Password:"
      label-for="login-password">
      <b-form-input
      v-model="login_form.password"
      id="login-password"
      type="password"
      placeholder="Password"
      required>
      </b-form-input>
      </b-form-group>

      <b-button class="float-left" type="reset" variant="danger">Nulstil</b-button>
      <b-button class="float-right" type="submit" variant="primary">Log ind</b-button>

      </b-form>
      <div slot="modal-footer"></div> <!-- This line removes the default footer buttons on modals -->
    </b-modal>

    <b-modal id="register-modal" title="Opret ny administrator">
      <b-form @submit.prevent="registerAdminSubmit" @reset="reset">
        <b-form-group
        id="register-input-group-1"
        label="Email adresse:"
        label-for="register-input-1"
        >
        <b-form-input
        v-model="register_form.email"
        id="register-input-1"
        type="email"
        required
        placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
      id="register-input-group-2"
      label="Kodeord:"
      label-for="register-password">
      <b-form-input
      v-model="register_form.password"
      id="register-password"
      type="password"
      placeholder="Kodeord"
      required>
      </b-form-input>
      </b-form-group>

      <b-form-group
      id="register-input-group-3"
      label="Navn:"
      label-for="register-firstName">
      <b-form-input
      v-model="register_form.firstName"
      id="register-firstName"
      type="text"
      placeholder="Navn"
      required>
      </b-form-input>
      </b-form-group>

      <b-form-group
      id="register-input-group-4"
      label="By:"
      label-for="register-city">
      <b-form-input
      v-model="register_form.city"
      id="register-city"
      type="text"
      placeholder="By"
      required>
      </b-form-input>
      </b-form-group>

      <b-form-group
      id="register-input-group-5"
      label="Beskrivelse af dig selv:"
      label-for="register-description">
      <b-form-textarea
      v-model="register_form.description"
      id="register-description"
      type="text"
      placeholder="Beskrivelse"
      required>
      </b-form-textarea>
      </b-form-group>
      
      <b-form-select v-model="register_form.gender" :options="genderOptions" required></b-form-select>

      <hr>
      <b-button class="float-right" variant="success" type="submit">Opret administrator</b-button>
      <b-button class="float-left" variant="danger" type="reset">Nulstil</b-button>
      </b-form>
      <div slot="modal-footer"></div>
    </b-modal>

  </div>
</template>

<script>
import userService from "./services/UserService.js"
export default {
  name: "App",
  data() {
    return {
      login_form: {
        email: '',
        password: ''
      },
      register_form: {
        email: '',
        password: '',
        firstName: '',
        city: '',
        gender: null,
        description: '',
        roles: [
          {
            roleId: 1 // Assign administrator role with id 1
          }
        ]
      },
      genderOptions: [
        { value: null, text: "Vælg venligst en mulighed" },
        { value: 0, text: "Mand" },
        { value: 1, text: "Kvinde" },
        { value: 2, text: "Andet" },
      ],
      loggedIn: localStorage.user
    }
  },
  methods: {
    loginSubmit() {
      if (this.login_form.email && this.login_form.password) {
        let credentials = {
          email: this.login_form.email,
          password: this.login_form.password
        }
        userService.authenticate(credentials).then(response => {
          location.reload()
        }).catch(error => {
          console.log(error.message)
        })
      }
    },
    reset() {
      console.log("Reset")
      this.login_form.password = ''
      this.login_form.email = ''
      this.register_form.email = ''
      this.register_form.password = ''
    },
    registerAdminSubmit(){
      if (this.register_form.email && this.register_form.password) {
            let user = this.register_form
            userService.register(user).then(response => {
              this.$store.dispatch("fetchUsers")
            }).catch(error => {
              console.log(error.message)
            })
          }
    },
    logOut() {
      localStorage.removeItem("user")
      location.reload()
    }
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CCCECF;
}
</style>
