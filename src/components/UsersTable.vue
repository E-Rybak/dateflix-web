<template>
    <div class="container">
        <h2>Registerede brugere</h2>
        <b-form-group
        id="email-form"
        label="Søg på email:"
        label-for="email-search">
        <b-form-input
        v-model="search"
        id="email-search"
        type="text"
        placeholder="email">
        </b-form-input>
        </b-form-group>

        <b-table 
        id="userstable"
        responsive 
        dark
        hover
        striped
        :items="filteredList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage">
        
        <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>By:</b></b-col>
            <b-col>{{ row.item.city }}</b-col>
          </b-row>
          <hr>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Beskrivelse:</b></b-col>
            <b-col>{{ row.item.description }}</b-col>
          </b-row>
          <hr>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Køn:</b></b-col>
            <b-col>{{ row.item.gender }}</b-col>
          </b-row>
        </b-card>
      </template>

        </b-table>

        <b-pagination 
        v-model="currentPage" 
        :total-rows="rows" 
        :per-page="perPage" 
        aria-controls="userstable"
        align="right">        
        </b-pagination>

    </div>
</template>

<script>

export default {
    name: "UsersTable",
    props: ['users'],
    data() {
        return {
            fields: ["id", "email", "firstName", "show_details"],
            search: '',
            currentPage: 1,
            perPage: 10
        }
    },
    computed: {
        filteredList() {
            var that = this;
            if(this.search){
                return this.users.filter((user) => user.email.toLowerCase().includes(that.search.toLowerCase()))
            }
            return this.users;
        },
        rows() {
            return this.filteredList.length
        }
    },
    created() {
        console.log(this.users)
    }
}
</script>

<style scoped>

</style>

