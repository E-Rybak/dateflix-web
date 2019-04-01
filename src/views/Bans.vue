<template>
    <div id="Bans" class="container">
        <BansTable :bans="bans" />
        <b-button block v-b-modal.create-ban-modal variant="danger">Opret ny bandlysning</b-button>
        <hr>
        <b-modal id="create-ban-modal" title="Opret bandlysning formel">
        <b-form @submit.prevent="banSubmit" @reset="reset">
            <b-form-group
            id="input-group-1"
            label="Email adresse:"
            description="Skriv den email der skal bandlyses fra Dateflix"
            label-for="email">
            <b-form-input
            v-model="email"
            id="email"
            type="email"
            required
            placeholder="Email">
            </b-form-input>
            </b-form-group>

            <b-button class="float-left" type="reset" variant="danger">Nulstil</b-button>
            <b-button class="float-right" type="submit" variant="danger">Bandlys Email</b-button>

            </b-form>

            <div slot="modal-footer"></div>
        </b-modal>
    </div>
</template>

<script>
import BansTable from "../components/BansTable.vue"
import { mapState } from 'vuex';
export default {
    name: "Bans",
    data() {
        return {
            email: ""
        }
    },
    computed: mapState(["bans"]),
    created() {
        this.$store.dispatch("fetchBans");
    },
    components: {
        BansTable: BansTable
    },
    methods: {
        reset(){
            this.email = ""
        },
        banSubmit() {
            this.$store.dispatch("banEmail", this.email);
        }
    }
}
</script>

<style>

</style>
