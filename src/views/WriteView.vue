<template>
  <div>
    <div class="write_view">
      <div class="message_container" ref="msgContainer">
        <div v-for="message in messages" :key="message.updateTime">
          <MessageBlock :msg="message" v-on:edit-block="editBlock"></MessageBlock>
        </div>
      </div>
      <div
        class="type_writer_container"
        contenteditable="true"
        ref="typeWriterContainer"
        @input="input_trigger"
        @keydown.enter.ctrl.exact="spark"
      ></div>
    </div>
  </div>
</template>

<script>
import MessageBlock from '../components/MessageBlock';
import db from '../storage/db.ts';
import Message from '../storage/message.ts';

// import TypeWriter from './TypeWriter';
function resetHeight(msgContainer) {
    const newHeight =
        msgContainer.parentElement.offsetHeight -
        msgContainer.nextSibling.offsetHeight;
    // newHeight is taken from the difference of parentElement (.write_view) and nextSibling (.type_writer_container)
    if (newHeight < 10) {
        // height is at least 10
        newHeight = 10;
    }
    msgContainer.style.height = '' + newHeight + 'px';
}

function scrollView(msgContainer) {
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function clearTypeWriter(typeWriterContainer) {
    typeWriterContainer.innerText = '';
}

export default {
    components: {
        MessageBlock,
        // TypeWriter
    },
    data() {
        return {
            messages: [],
            input_text: '',
            msgtoEdit: null,
        };
    },
    created() {
        db.getAllMessages().then((msgs) => {
            this.messages = msgs;
        });
    },
    methods: {
        input_trigger() {
            resetHeight(this.$refs.msgContainer);
        },
        spark() {
            if (this.msgtoEdit == null) {
                this.messages.push(
                    db.newMsg(this.$refs.typeWriterContainer.innerText),
                );
            } else {
                this.msgtoEdit.updateContent(
                    this.$refs.typeWriterContainer.innerText,
                );
                db.updateMessage(this.msgtoEdit);
            }
            setTimeout(() => scrollView(this.$refs.msgContainer), 1); // TODO: should use nextTick
            clearTypeWriter(this.$refs.typeWriterContainer);
            resetHeight(this.$refs.msgContainer);
            // resize after clearing
        },
        editBlock(msg) {
            this.$refs.typeWriterContainer.innerText = msg.content;
            this.msgtoEdit = msg;
        },
    },
};
</script>

<style>
body,
html {
    overflow: hidden;
}
.write_view {
    overflow-y: auto;
    max-width: 600px;
    height: 100vh;
    margin: 0 auto;
}
.message_container {
    overflow-y: scroll;
    height: 80vh;
}
.type_writer_container {
    position: absolute;
    width: 600px;
    margin: 0 auto;
    bottom: 0%;
    display: block;
    border: solid 1px black;
    min-height: 20vh;
}

.typer {
    position: absolute;
    bottom: 5px;
    box-sizing: border-box;
    /* display: flex; */
    align-items: center;
    /* height: 4.9rem; */
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
}
.input {
    /* position: absolute; */
    /* left: 2.5rem; */
    padding: 1rem;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
}
</style>
