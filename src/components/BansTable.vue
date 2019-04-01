<template>
    <div>
        <h2>Oprettede bandlysninger</h2>
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
        id="banstable"
        responsive 
        dark 
        hover
        striped 
        :items="filteredList"
        :current-page="currentPage"
        :per-page="perPage"></b-table>

        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="banstable"
        align="right"></b-pagination>

    </div>
</template>

<script>

export default {
    name: "BansTable",
    props: ['bans'],
    data() {
        return {
            search: "",
            currentPage: 1,
            perPage: 10
        }
    },
    computed: {
        filteredList: function() {
            var that = this;
            if(this.search){
                return this.bans.filter((ban) => ban.email.toLowerCase().includes(that.search.toLowerCase()))
            }
            return this.bans
        },
        rows() {
            return this.filteredList.length
        }
    }
}
</script>
