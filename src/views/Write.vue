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
        <v-subheader>Document List</v-subheader>
        <draggable v-model="msgLists" group="list" style="min-height: 10px">
          <template v-for="lst in msgLists">
            <v-list-tile :key="lst.id" avatar>
              <v-list-tile-avatar>
                <img :src="lst.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="lst.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="lst.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </draggable>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="#4DBA87" dark fixed app clipped-right flat>
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
        <v-subheader>SECOND LIST</v-subheader>
        <draggable :list="items2" group="people" style="min-height: 10px">
          <template v-for="item in items2">
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </draggable>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer temporary v-model="left" fixed></v-navigation-drawer>
    <v-navigation-drawer right temporary v-model="right" fixed></v-navigation-drawer>

    <v-content id="Content">
      <v-container id="MessagePile" pa-0 ref="msgContainer">
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <draggable :list="messages.list" group="messages" @change="listChanges">
              <template v-for="msg in messages.list">
                <v-card
                  :key="msg.updateTime"
                  @dblclick="select(msg)"
                  flat
                  pa-3
                  ma-3
                  :class="{selected: msg.selected}"
                >
                  <div>
                    <MessageBlock :msg="msg" v-on:edit-block="editBlock"></MessageBlock>
                  </div>
                </v-card>
              </template>
            </draggable>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container id="Typer" ma-0 pa-0 ref="typeWriterContainer">
        <v-layout row fill-height>
          <v-flex xs11>
            <div
              ma-0
              pa-0
              contenteditable="true"
              @input="inputting"
              @keydown.enter.ctrl.exact="spark"
              ref="userInput"
              id="Input"
            >
              <p>Type some thing please</p>
            </div>
          </v-flex>
          <v-flex xs1>
            <v-btn
              icon
              small
              absolute
              right
              depressed
              fab
              color="#4DBA87"
              style="buttom: 10px; position: absolute;"
              @click="spark"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import MessageBlock from '../components/MessageBlock';
import { lstStore, MessageList } from '../storage/list';
import { msgStore } from '../storage/message';
// import db from '../storage/db.ts';
// import Message from '../storage/message.ts';
import { constants } from 'crypto';

// import TypeWriter from './TypeWriter';

export default {
    components: {
        MessageBlock,
        draggable,
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
            msgLists: null,
            listId: '',
            messages: new MessageList('MessagePile'),
            msgToEdit: null,
            items: [
                {
                    id: 1,
                    avatar:
                        'https://s3.amazonaws.com/vuetify-docs/images/lists/1.jpg',
                    title: 'Brunch this life?',
                    subtitle: 'Subtitle 1',
                },
                {
                    id: 2,
                    avatar:
                        'https://s3.amazonaws.com/vuetify-docs/images/lists/2.jpg',
                    title: 'Winter Lunch',
                    subtitle: 'Subtitle 2',
                },
                {
                    id: 3,
                    avatar:
                        'https://s3.amazonaws.com/vuetify-docs/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: 'Subtitle 3',
                },
            ],
            items2: [
                {
                    id: 4,
                    avatar:
                        'https://s3.amazonaws.com/vuetify-docs/images/lists/4.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: 'Subtitle 4',
                },
                {
                    id: 5,
                    avatar:
                        'https://s3.amazonaws.com/vuetify-docs/images/lists/5.jpg',
                    title:
                        'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: 'Subtitle 5',
                },
            ],
        };
    },
    created() {
        lstStore.getAllList().then((lsts) => {
            this.msgLists = lsts;
            for (const lst of lsts) {
                if (lst.name === 'MessagePile') {
                    this.messages = lst;
                    this.listId = lst.id;
                }
            }
        });
    },
    methods: {
        listChanges(evt) {
            console.log(evt);
            console.log(this.messages);
        },
        updateMsgList() {
            lstStore.updateMsgList(this.messages);
        },
        select(msg) {
            msg.selected = !msg.selected;
        },
        removeSelectedMsg() {
            this.messages.removeSelected();
            this.updateMsgList();
        },
        forwardSelectedMsg(to) {
            var selectedMsgs = this.messages.extractSelected();
            to.appendMsgList(selectedMsgs);
            this.messages.removeSelected();
            lstStore.updateMsgList(to);
            lstStore.updateMsgList(this.messages);
        },
        mergeSelectedMsg() {},

        inputting() {
            this.resetHeight();
        },
        spark() {
            if (this.msgToEdit == null) {
                this.messages.push(
                    msgStore.newMsg(this.$refs.userInput.innerText),
                );
            } else {
                this.msgToEdit.updateContent(this.$refs.userInput.innerText);
                msgStore.updateMessage(this.msgToEdit);
                this.msgToEdit = null;
            }
            setTimeout(this.scrollView, 1); // TODO: should use nextTick
            this.clearTypeWriter();
            this.resetHeight();
            // resize after clearing
        },
        resetHeight() {
            const newHeight =
                this.$refs.msgContainer.parentElement.offsetHeight -
                this.$refs.typeWriterContainer.offsetHeight;
            this.$refs.msgContainer.style.height = '' + newHeight + 'px';
        },
        scrollView() {
            this.$refs.msgContainer.scrollTop = this.$refs.msgContainer.scrollHeight;
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
    mounted() {
        this.resetHeight();
        setTimeout(this.scrollView, 10); // TODO: should use nextTick
    },
};
</script>


<style>
body,
html {
    overflow: hidden;
}
.selected {
    background-color: #f9c7c8 !important;
    border: solid red 1px !important;
}
#Content {
    height: 100vh;
}
#MessagePile {
    overflow-y: auto;
    height: 80vh;
}
#Input {
    overflow-y: auto;
    max-height: 40vh;
    height: 100%;
    /* padding: 0 3px; */
}
#Typer {
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    border: solid 1px black;
    min-height: 10vh;
}
</style>
