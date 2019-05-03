<template>
  <!-- <div class="message" ref="msgBlock" @click="edit"></div> -->
  <div class="message">
      <div ref="msgBlock" @click="edit">
      </div>
      <div class="status">last edit: {{ timestamp }}</div>
  </div>
</template>
<script>
import marked from 'marked';
export default {
    props: {
        content: String,
        timestamp: String,
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            const renderedContent = marked(this.content);
            this.$refs.msgBlock.innerHTML = renderedContent;
        },
        edit() {
            this.$emit('edit-block', this.content);
        },
    },
};
</script>
<style>
.message {
    /* height: 300px; */
    /* max-width: 80%; */
    border: 1px, dotted, black;
    border-style: dotted;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
}
.status {
    text-align: right;
    font-size: 50%;
}
</style>

