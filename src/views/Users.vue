<template>
  <v-container fluid>
    <v-data-iterator
      v-if="!loading"
      :items="users"
      hide-default-footer
      no-data-text
      :items-per-page.sync="itemsPerPage"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="user in props.items"
            :key="user.id"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
            xs="12"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 18 : 2"
                @click="detailsUser(user)"
              >
                <v-card-title>
                  <v-img :src="user.avatar_url" />
                </v-card-title>
                <v-divider />
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Login:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ user.login }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Type</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ user.type }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Administrador:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ user.site_admin }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          />
        </div>
      </template>
    </v-data-iterator>
    <div
      v-else
      class="text-center"
    >
      <v-progress-circular
        :size="200"
        width="15"
        color="primary"
        indeterminate
      />
    </div>

    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          <span class="headline">{{ selectedUser.login }}</span>
          <v-spacer />
          <v-icon @click="dialog = false">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="4"
              xs="4"
            >
              <span class="ml-2 subtitle-1 font-weight-black">Login: </span>
            </v-col>
            <v-col>
              <span class="subtitle-1">{{ selectedUser.login }}</span>
            </v-col>
          </v-row>
          <v-divider />

          <v-row>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="4"
              xs="4"
            >
              <span class="ml-2 subtitle-1 font-weight-black">ID: </span>
            </v-col>
            <v-col>
              <span class="subtitle-1">{{ selectedUser.id }}</span>
            </v-col>
          </v-row>
          <v-divider />

          <v-row>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="4"
              xs="4"
            >
              <span class="ml-2 subtitle-1 font-weight-black">Profile URL: </span>
            </v-col>
            <v-col>
              <span
                class="subtitle-1"
              >{{ selectedUser.url }}</span>
              <v-icon
                class="ml-4"
                @click="goProfile(selectedUser.login)"
              >
                mdi-open-in-new
              </v-icon>
            </v-col>
          </v-row>
          <v-divider />

          <v-row>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="4"
              xs="4"
            >
              <span class="ml-2 subtitle-1 font-weight-black">Created: </span>
            </v-col>
            <v-col>
              <span class="subtitle-1">{{ dateCreated }}</span>
            </v-col>
          </v-row>
          <v-divider />
        </v-card-text>
        <v-card-text>
          <span class="title">Repos</span>
          <v-data-table
            dense
            :headers="headers"
            :items="repos"
            item-key="id"
          >
            <template v-slot:item.action="{ item }">
              <v-icon @click="goRepo(item.name)">
                mdi-open-in-new
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data: () => ({
    loading: true,
    itemsPerPage: 30,
    since: 0,
    page: 1,
    users: [],
    dialog: false,
    dateCreated: null,
    selectedUser: {},
    headers: [
      {
        text: 'ID',
        align: 'left',
        value: 'id'
      },
      { text: 'Name', value: 'name' },
      { text: 'URL', sortable: false, value: 'action' }
    ],
    repos: []
  }),

  computed: {
    ...mapGetters(['getUsers', 'getUser', 'getRepos'])
  },

  watch: {
    page () {
      this.loading = true
      this.since = (parseInt(this.page) * 30) - 30
      this.loadingUsers()
      this.$vuetify.goTo(0)
    }
  },

  created () {
    this.loadingUsers()
  },

  methods: {
    loadingUsers () {
      this.$store.dispatch('actionLoadUsers', this.since).then(() => {
        this.users = this.getUsers
        this.loading = false
      })
    },

    detailsUser (user) {
      this.$store.dispatch('actionViewDetails', user.login).then(() => {
        this.selectedUser = this.getUser
        this.dateCreated = moment(this.getUser.created_at).format('LLLL')
        this.loading = false
      })

      this.$store.dispatch('actionLoadRepos', user.login).then(() => {
        this.repos = this.getRepos
      })
      this.dialog = true
    },

    goProfile (login) {
      window.open(`https://github.com/${login}/`)
    },

    goRepo (repo) {
      window.open(`https://github.com/${this.selectedUser.login}/${repo}/`)
    }
  }
}
</script>
