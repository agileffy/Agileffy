<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="#4DBA87">
              <v-toolbar-title>Create a new account</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-tooltip bottom>
                <v-btn icon large :href="source" target="_blank" slot="activator">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip>-->
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="userdata.username"
                  :rules="[rules.required,rules.min,rules.max,rules.username]"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                  counter
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userdata.password"
                  :rules="[rules.required,rules.password]"
                  :error="passwordRepeatRule()"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  v-model="userdata.passwordRepeat"
                  :rules="[rules.required]"
                  :error="passwordRepeatRule()"
                  :error-messages="passwordRepeatMsg()"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  prepend-icon="lock"
                  name="password2"
                  label="Password Again"
                  id="password2"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userdata.email"
                  :rules="[rules.required,rules.email]"
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="text"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[rules.required,rules.checkbox]"
                  label="Do you agree?"
                  required
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
              <v-btn :disabled="!valid" color="primary" @click="register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        userdata: {
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
        },
        checkbox: false,
        showPassword: false,
        rules: {
            required: (v) => !!v || 'This is required!',
            min: (v) => (v || '').length >= 6 || 'Min 6 characters required!',
            max: (v) => (v || '').length <= 30 || 'Max 30 characters required!',
            username: (v) => {
                const pattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){5,29}$/;
                return (
                    pattern.test(v) ||
                    'Username should start with a letter, following with letters,digits and special characters(._-).'
                );
            },
            password: (v) => {
                // const pattern = new RegExp (['^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z.,_!@#$%^&*`~()-+=]+$)',
                //     '(?![a-z0-9]+$)(?![a-z.,_!@#$%^&*`~()-+=]+$)(?![0-9.,_!@#$%^&*`~()-+=]+$)',
                //     '[a-zA-Z0-9.,_!@#$%^&*`~()-+=]{8,30}$'].join(''));
                const pattern = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,30}$/;
                return (
                    pattern.test(v) ||
                    'Password should contains at least two of these four types of characters: lowercase letters, \
                        uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=) \
                        and should have a length between 8 and 30.'
                );
            },
            email: (value) => {
                const pattern = /.+@.+/;
                return pattern.test(value) || 'Invalid e-mail.';
            },
            checkbox: (v) => !!v || 'You must agree to continue!',
        },
    }),
    // props: {
    //      source: String,
    // },
    methods: {
        passwordRepeatRule() {
            return this.userdata.password !== this.userdata.passwordRepeat;
        },
        passwordRepeatMsg() {
            if (this.userdata.password !== this.userdata.passwordRepeat) {
                return 'Password does not match!';
            }
        },
        register() {
            // if (this.$refs.form.validate()) {
            // }
        },
        cancel() {
            this.$router.push('/');
        },
    },
};
</script>

