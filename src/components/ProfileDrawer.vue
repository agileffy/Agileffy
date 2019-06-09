<template>
  <div>
    <v-navigation-drawer  fixed right clipped app>
      <v-list dense>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon :color="syncStatus?'green':'red'">sync</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Sync Status</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
            <v-list-tile-action>
              <v-icon>storage</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Your documents: {{ numDocs }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
    props: {
        // content: String,
        // timestamp: String,
        avatar: String,
        username: String,
        syncStatus: Boolean,
        numDocs: Number,
    },
};
</script>