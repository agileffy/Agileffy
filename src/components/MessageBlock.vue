<template>
  <!-- <div class="message" ref="msgBlock" @click="edit"></div> -->
  <div class="message" @click="edit">
    <div ref="msgBlock"></div>
    <div class="status">last edit: {{ timeToRender }}</div>
  </div>
</template>
<script>
import marked from 'marked';
import Message from '../storage/message.ts';
import getTimeText from '../utils/time.ts';
export default {
    props: {
        // content: String,
        // timestamp: String,
        msg: Message,
    },
    data() {
        return {
            timeToRender: '',
        };
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            const renderedContent = marked(this.msg.content);
            this.$refs.msgBlock.innerHTML = renderedContent;
            this.timeToRender = getTimeText(this.msg.updateTime);
        },
        edit() {
            this.$emit('edit-block', this.msg);
        },
    },
};
</script>
<style>
.message {
    margin: 5px;
    padding: 5px;
}
.status {
    text-align: right;
    font-size: 50%;
}
</style>

