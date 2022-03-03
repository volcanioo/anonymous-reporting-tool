<template>
  <div>
    <div
      class="chat"
      ref="chat"
      v-if="messages"
      :class="{
        'chat--company': (userCheck() === 'company'),
        'chat--anonymous': (userCheck() === 'anonymous'),
        'chat--disabled': disabled,
      }"
    >
      <span
        v-for="(message, index) in messages"
        :key="index"
        class="chat__message"
        :data-sender="message.sender"
      >
        {{message.content}}
        <i>{{ convertDate(message.created.toDate()) }}</i>
      </span>
      <strong>Last Updated: {{ convertDate(lastUpdate) }}</strong>
    </div>
    <form action="javascript:void(0)" class="chat__send" v-if="!disabled">
      <textarea
        v-model="message"
        required
        placeholder="Message here..."
        @keydown.enter.exact.prevent
        @keyup.enter.exact="sendMessage"
        @keydown.enter.shift.exact="newline"
      ></textarea>
      <button
        class="button"
        @click="sendMessage"
      >Send Message</button>
    </form>
    <div class="chat__info" v-else>
      <p>This case has been hide from public.</p>
    </div>
  </div>
</template>

<script>
import API from '@/api';
import isEmpty from 'lodash/isEmpty';
import utilities from '../../utilities';

export default {
  props: {
    caseId: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: '',
      messages: [],
      lastUpdate: '',
    }
  },
  created() {
    this.getMessages();
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.chat.scrollTop = 9999999999;
      }, 10);
    },
  },
  methods: {
    convertDate(date) {
      return utilities.dateMapper(date);
    },
    getMessages() {
      this.messages = [];
      this.lastUpdate = new Date();
      API.messages.get(this.$props.caseId)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.doc.data().created !== null) {
              this.messages.push(change.doc.data());
            }
          });
        });
    },
    userCheck() {
      if (this.$store.state.company.user_uid) {
        localStorage.removeItem('caseId');
        return 'company';
      }

      return 'anonymous';
    },
    sendMessage() {
      if (isEmpty(this.message)) return;

      const sender = this.userCheck();
      API.messages.post(this.$props.caseId, sender, this.message)
        .then((querySnapshot) => {
          this.message = '';
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  },
}
</script>

<style lang="scss" scoped>

.chat {
  background: white;
  max-height: 400px;
  min-height: 400px;
  overflow-x: hidden;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  overflow-y: scroll;
  margin-top: auto;

  strong {
    bottom: 0;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    line-height: 50px;
    opacity: .3;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.chat__message {
  font-weight: 400;
  opacity: .8;
  padding: 10px;
  width: auto;
  overflow: hidden;
  border-radius: 0px;
  font-size: 14px;
  padding: 12px 20px;
  max-width: 50%;
  flex: 0 0 100%;
  border-radius: 10px 20px 20px 0;
  margin-top: 10px;
  height: fit-content;

  i {
    display: block;
    font-size: 12px;
    font-style: normal;
    opacity: .5;
  }
}

.chat.chat--company .chat__message[data-sender=company],
.chat.chat--anonymous .chat__message[data-sender=anonymous] {
  margin-right: 20px;
  margin-left: auto;
  color: var(--dark-color);
  position: relative;
  background: var(--light-gray);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 10px;
}

.chat.chat--company .chat__message[data-sender=anonymous],
.chat.chat--anonymous .chat__message[data-sender=company] {
  margin-left: 20px;
  margin-right: auto;
  color: white;
  position: relative;
  background: #d0f6e4;
  border-bottom-left-radius: 0;
  color: black;
  border-bottom-left-radius: 0;
}

.chat__info {
  font-size: 24px;
  opacity: .4
}

@media (max-width: 992px) {

  .chat__message {
    max-width: 90% !important;
  }

}
</style>
