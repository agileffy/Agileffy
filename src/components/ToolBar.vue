<template>
  <v-toolbar color="#4DBA87" dark fixed app clipped-right flat>
    <v-btn icon @click.stop="leftButtonClick" :v-show="isNormalMode">
      <v-icon>{{ leftButton }}</v-icon>
    </v-btn>
    <v-toolbar-title>{{ msg }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="editMsg" :v-show="isSelectedMode">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn icon @click.stop="copyMsg" :v-show="isSelectedMode">
      <v-icon>file_copy</v-icon>
    </v-btn>
    <v-btn icon @click.stop="forwardMsg" :v-show="isSelectedMode">
      <v-icon>forward</v-icon>
    </v-btn>
    <v-btn icon @click.stop="deleteMsg" :v-show="isSelectedMode">
      <v-icon>delete</v-icon>
    </v-btn>
    <v-btn icon @click.stop="mergeMsg" :v-show="isSelectedMode">
      <v-icon>merge-type</v-icon>
    </v-btn>
    <v-btn icon @click.stop="rightButtonClick" :v-show="isNormalMode">
      <v-icon>menu</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
    props: {
        // content: String,
        // timestamp: String,
        mode: String,
        numMessages: Number,
    },
    data() {
        return {
            isNormalMode: true,
            isSelectedMode: false,
            leftButton: 'menu',
            msg: 'Agileffy',
        };
    },
    mounted() {
        if (this.mode === 'normal') {
            this.isNormalMode = true;
            isSelectedMode = false;
            leftButton = 'menu';
            msg = 'Agileffy';
        } else if (this.mode === 'selected') {
            this.isNormalMode = false;
            isSelectedMode = true;
            leftButton = 'close';
            msg = String(numMessages);
        }
    },
    methods: {
        leftButtonClick() {
            if (this.mode === 'normal') {
                this.$emit('showLeftDrawer');
            } else if (this.mode === 'selected') {
                this.isNormalMode = true;
                isSelectedMode = false;
                leftButton = 'menu';
                msg = 'Agileffy';
            }
        },
        editMsg() {
            this.$emit('editMsg');
        },
        copyMsg() {
            this.$emit('copyMsg');
        },
        deleteMsg() {
            this.$emit('deleteMsg');
        },
        forwardMsg() {
            this.$emit('forwardMsg');
        },
        mergeMsg() {
            this.$emit('mergeMsg');
        },
        RightButtonClick() {
            this.$emit('showRightDrawer');
        },
    },
};
</script>