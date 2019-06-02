<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="#4DBA87">
              <v-toolbar-title>Login to Agileffy</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="userdata.username"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  :rules="[rules.required]"
                  test-input-username
                ></v-text-field>
                <v-text-field
                  v-model="userdata.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  :rules="[rules.required]"
                  test-input-password
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn flat small color="primary" @click="jumpToRegister" test-btn-register>Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="primary" @click="login" test-btn-submit>Login</v-btn>
            </v-card-actions>
            <v-alert :value="errmsg" color="error" icon="warning" outline>{{errmsg}}</v-alert>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        valid: false,
        userdata: {
            username: '',
            password: '',
        },
        rules: {
            required: (v) => !!v || 'This is required!',
        },
        errmsg: '',
    }),
    props: {
        source: String,
    },
    methods: {
        login() {
            axios.post('/api/login', this.userdata)
                .then((response) => {
                    if (response.data === 'OK') {
                        this.$router.push('/write');
                    } else {
                        this.errmsg = response.data;
                    }
                })
                .catch((error) => {
                    this.errmsg =
                        'ERROR:' +
                        error.response.status +
                        ' ' +
                        error.response.statusText;
                });
        },
        jumpToRegister() {
            this.$router.push('/register');
        },
    },
};
</script>

