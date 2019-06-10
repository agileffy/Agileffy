<template>
  <div>
    <v-navigation-drawer fixed right clipped app v-model="drawerRight">
      <v-list dense>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="userinfo.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ userinfo.username }}</v-list-tile-title>
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

    <Toolbar
      :numMessages="numSelected"
      :mode="mode"
      v-on:edit="editSelected"
      v-on:copy="copySelected"
      v-on:delete="removeSelected"
      v-on:forward="showLeftDrawer"
      v-on:merge="mergeSelected"
      v-on:revertMode="revertMode"
      v-on:showLeftDrawer="showLeftDrawer"
      v-on:showRightDrawer="showRightDrawer"
    ></Toolbar>

    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon @click.stop="createDoc">add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-text-field
                v-model="newDocName"
                type="text"
                placeholder="Create New Document"
                required
              ></v-text-field>
            <v-list-tile-title>Create New Document</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Documents</v-subheader>
        <draggable :list="msgLists" group="doc" style="min-height: 10px">
          <template v-for="lst in msgLists">
            <v-list-tile :key="lst.id" @click.stop="clickOnDoc(lst)">
              <v-list-tile-content>
                <v-list-tile-title v-html="lst.name"></v-list-tile-title>
                <v-list-tile-sub-title>It has {{ lst.list.length }} messages</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </draggable>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-navigation-drawer temporary v-model="left" fixed></v-navigation-drawer> -->
    <!-- <v-navigation-drawer right temporary v-model="right" fixed></v-navigation-drawer> -->

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
import { constants } from 'crypto';

import MessageBlock from '../components/MessageBlock';
import Toolbar from '../components/ToolBar';
// import ProfileDrawer from '../components/ProfileDrawer';

import { lstStore, MessageList } from '../storage/list';
import { msgStore, Message } from '../storage/message';
import Tag, { tagDB } from '../storage/tag.ts';

import extractTag from '../utils/extractTag.ts';

// import TypeWriter from './TypeWriter';

export default {
    components: {
        MessageBlock,
        draggable,
        Toolbar,
        // ProfileDrawer,
        // TypeWriter
    },
    props: {
        source: String,
    },
    data() {
        return {
            drawer: false,
            drawerRight: false,
            msgLists: null,
            listId: '',
            messages: new MessageList('TempMessagePile'),
            msgToEdit: null,
            numSelected: 0,
            mode: 'normal',
            userinfo: {
                avatar:
                    'https://avatars2.githubusercontent.com/u/49611995?s=200&v=4',
                username: 'Admin',
            },
            syncStatus: true,
            numDocs: 0,
            newDocName: '',
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
            if (this.messages.name === 'TempMessagePile') {
                this.messages.name = 'MessagePile';
                if (!this.msgLists.includes(this.messages)) {
                  lstStore.putMsgList(this.messages);
                  this.msgLists.push(this.messages);
                }
            }
        });
    },
    methods: {
        revertMode() {
            // console.log('Revert mode');
            this.mode = 'normal';
            for (const msg of this.messages.list) {
                msg.selected = false;
            }
            this.numSelected = 0;
        },
        clickOnDoc(lst) {
            // console.log(lst);
            if (this.mode === 'normal') {
                this.messages = lst;
            } else {
                this.forwardSelected(lst);
            }
        },
        createDoc() {
            const lst = new MessageList(this.newDocName || 'New Document');
            this.msgLists.push(lst);
            lstStore.putMsgList(lst);
        },
        listChanges(evt) {
            // console.log(evt);
            // console.log(this.messages);
            lstStore.updateMsgList(this.messages);
        },
        updateMsgList() {
            lstStore.updateMsgList(this.messages);
        },
        select(msg) {
            msg.selected = !msg.selected;
            if (msg.selected) {
                this.numSelected++;
            } else {
                this.numSelected--;
            }
            if (this.numSelected === 0) {
                this.mode = 'normal';
            } else {
                this.mode = 'selected';
            }
            // console.log(this.mode);
        },
        removeSelected() {
            this.messages.removeSelected();
            this.updateMsgList();
        },
        forwardSelected(to) {
            const selectedMsgs = this.messages.extractSelected();
            to.appendMsgList(selectedMsgs);
            // console.log(selectedMsgs, to);
            this.messages.removeSelected();
            lstStore.updateMsgList(to);
            lstStore.updateMsgList(this.messages);
            // this.revertMode();
            this.messages = to;
        },
        mergeSelected() {
            const selectedMsgs = this.messages.extractSelected();
            const newMsg = selectedMsgs.toMsg();
            // console.log(newMsg);
            this.messages.push(newMsg);
            lstStore.updateMsgList(this.messages);
        },
        showLeftDrawer() {
            // console.log('left signal');
            this.drawer = !this.drawer;
        },
        showRightDrawer() {
            // console.log('right signal', this.drawerRight);
            this.drawerRight = !this.drawerRight;
            // this.drawerRight = true;
        },
        editSelected() {
            setTimeout(() => {
                alert('糙米吗');
            }, 1000);
        },
        copySelected() {
            const selectedMsgs = this.messages.extractSelected();
            this.messages.appendMsgList(selectedMsgs.duplicate());
            lstStore.updateMsgList(this.messages);
            // this.revertMode();
        },
        inputting() {
            this.resetHeight();
        },
        spark() {
            const sparkMsg = async () => {
                const tagNames = extractTag(this.$refs.userInput.innerText);
                const tags = new Array();
                if (tagNames) {
                    for (const tagName of tagNames) {
                        const tag = await tagDB.getTagByName(tagName);
                        // console.log(tag);
                        tags.push(tag);
                    }
                }
                if (!this.msgToEdit) {
                    const newMsg = new Message(this.$refs.userInput.innerText);
                    newMsg.setTags(tags);
                    msgStore.putMsg(newMsg);
                    this.messages.push(newMsg);
                } else {
                    this.msgToEdit.updateContent(
                        this.$refs.userInput.innerText,
                    );
                    this.msgToEdit.setTags(tags);
                    msgStore.updateMessage(this.msgToEdit);
                    this.msgToEdit = null;
                }
                setTimeout(this.scrollView, 1); // TODO: should use nextTick
                this.clearTypeWriter();
                this.resetHeight();
                // resize after clearing
            };
            sparkMsg();
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
