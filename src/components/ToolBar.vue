<template>
  <v-toolbar color="#4DBA87" dark fixed app clipped-right flat>
    <v-btn icon @click.stop="leftButtonClick">
      <v-icon>{{ leftButton }}</v-icon>
    </v-btn>
    <v-toolbar-title>{{ msg }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="editMsg" v-if="false">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn icon @click.stop="copyMsg" v-if="mode === 'selected'">
      <v-icon>file_copy</v-icon>
    </v-btn>
    <v-btn icon @click.stop="forwardMsg" v-if="mode === 'selected'">
      <v-icon>forward</v-icon>
    </v-btn>
    <v-btn icon @click.stop="deleteMsg" v-if="mode === 'selected'">
      <v-icon>delete</v-icon>
    </v-btn>
    <v-btn icon @click.stop="mergeMsg" v-if="mode === 'selected'">
      <v-icon>merge_type</v-icon>
    </v-btn>
    <v-btn icon @click.stop="rightButtonClick" v-if="mode === 'normal'">
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
            leftButton: 'menu',
            msg: 'Agileffy',
        };
    },
    watch: {
        $props: {
            immediate: true,
            deep: true,
            handler() {
                // console.log(this.mode);
                if (this.mode === 'selected') {
                    this.leftButton = 'close';
                    this.msg = String(this.numMessages);
                } else {
                    this.leftButton = 'menu';
                    this.msg = 'Agileffy';
                }
            },
        },
    },
    methods: {
        refresh() {
            // console.log(this.mode);
            if (this.mode === 'selected') {
                this.leftButton = 'close';
                this.msg = String(this.numMessages);
            } else {
                this.leftButton = 'menu';
                this.msg = 'Agileffy';
            }
        },
        leftButtonClick() {
            if (this.mode === 'normal') {
                this.$emit('showLeftDrawer');
            } else if (this.mode === 'selected') {
                this.$emit('revertMode');
            }
        },
        editMsg() {
            this.$emit('edit');
        },
        copyMsg() {
            this.$emit('copy');
        },
        deleteMsg() {
            this.$emit('delete');
        },
        forwardMsg() {
            this.$emit('forward');
        },
        mergeMsg() {
            this.$emit('merge');
        },
        rightButtonClick() {
            this.$emit('showRightDrawer');
        },
    },
};
</script>