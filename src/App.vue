<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-layout justify-center>
        <span class="title">Shaw and Partners</span>
      </v-layout>
    </v-app-bar>

    <v-content justify-center>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>
