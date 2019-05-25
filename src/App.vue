<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">AGIL</span>
        <span>EFFY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/agileffy/Agileffy" target="_blank">
        <span class="mr-2">Contribute</span>
      </v-btn>
    </v-toolbar>

    <!-- <v-content>
      <HelloWorld/>
    </v-content> -->
    <!-- <Login/> -->
    <router-view/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Login from './views/Login';
export default {
    name: 'App',
    // components: {
    //     // HelloWorld,
    //     Login,
    // },
    data() {
        return {
            //
        };
    },
};
</script>
