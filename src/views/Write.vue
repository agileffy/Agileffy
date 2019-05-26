<template>
  <div>
    <v-navigation-drawer fixed v-model="drawerRight" right clipped app>
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="blue-grey" dark fixed app clipped-right flat>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Agileffy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>

    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer temporary v-model="left" fixed></v-navigation-drawer>
    <v-navigation-drawer right temporary v-model="right" fixed></v-navigation-drawer>

    <v-content id="Content">
      <v-container id="MessagePile" pa-0 pb-0 ref="msgContainer">
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <v-card v-for="message in messages" :key="message.updateTime" tile>
              <div>
                <MessageBlock :msg="message" v-on:edit-block="editBlock"></MessageBlock>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container id="Typer" ma-0 pa-0 ref="typeWriterContainer">
        <!-- <v-layout row justify-center align-center>
        <v-flex xs12>-->
        <div
          ma-0
          pa-0
          contenteditable="true"
          @input="input_trigger"
          @keydown.enter.ctrl.exact="spark"
          ref="userInput"
          id="Input"
        >
          <p>Type some thing please</p>
        </div>
        <!-- </v-flex>
        </v-layout>-->
      </v-container>
    </v-content>
  </div>
</template>

<style>
body,
html {
    overflow: hidden;
}
#Content {
    height: 100vh;
}
#MessagePile {
    overflow-y: auto;
    height: 70vh;
}
#Input {
    overflow-y: auto;
    max-height: 50vh;
}
#Typer {
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    border: solid 1px black;
    min-height: 20vh;
}
</style>

<script>
import MessageBlock from '../components/MessageBlock';
import db from '../storage/db.ts';
import Message from '../storage/message.ts';
import { constants } from 'crypto';

// import TypeWriter from './TypeWriter';
function scrollView(msgContainer) {
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
export default {
    components: {
        MessageBlock,
        // TypeWriter
    },
    props: {
        source: String,
    },
    data() {
        return {
            drawer: false,
            drawerRight: false,
            right: null,
            left: null,
            messages: [],
            input_text: '',
            msgToEdit: null,
        };
    },
    created() {
        db.getAllMessages().then((msgs) => {
            this.messages = msgs;
        });
    },
    methods: {
        input_trigger() {
            this.resetHeight();
        },
        spark() {
            if (this.msgToEdit == null) {
                this.messages.push(db.newMsg(this.$refs.userInput.innerText));
            } else {
                this.msgToEdit.updateContent(this.$refs.userInput.innerText);
                db.updateMessage(this.msgToEdit);
                this.msgToEdit = null;
            }
            setTimeout(() => scrollView(this.$refs.msgContainer), 1); // TODO: should use nextTick
            this.clearTypeWriter();
            this.resetHeight();
            // resize after clearing
        },
        resetHeight() {
            // console.log(this.$refs.msgContainer);
            // console.log(this.$refs.typeWriterContainer);

            const newHeight =
                this.$refs.msgContainer.parentElement.offsetHeight -
                this.$refs.typeWriterContainer.offsetHeight;
            this.$refs.msgContainer.style.height = '' + newHeight + 'px';
        },
        clearTypeWriter() {
            this.$refs.userInput.innerText = 'And more?';
        },
        editBlock(msg) {
            this.$refs.userInput.innerText = msg.content;
            this.resetHeight();
            this.msgToEdit = msg;
        },
    },
};
</script>

