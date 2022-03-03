<template>
  <div class="case-detail z-index-3">
    <div class="main-container">
      <div
        class="content"
        v-if="details"
      >
        <router-link
          v-if="id"
          class="case-detail__button"
          :to="{ name: 'Dashboard' }"
        >
          Back to Dashboard
        </router-link>
        <div class="passcode">
          Case:
          <input
            ref="passcode"
            type="text"
            readonly
            :value="details.passcode"
            @click="copyToClipboard"
          >
          <span @click="copyToClipboard">COPY</span>
          <button
            v-if="!id"
            class="button button--red"
            @click="logout({
              name: 'Home'
            })"
          >
            Logout
          </button>
        </div>
        <aside class="case-detail__sidebar">
          <card
            :case-id="pageId"
            :details="details"
            :is-company="isCompany"
            @status-updated="fetchCase"
          />
        </aside>
        <div class="case-detail__chat">
          <messages
            :case-id="pageId"
            :disabled="!details.status"
          />
        </div>
      </div>
      <div
        v-if="!isPageActive"
        class="case-detail__deactive"
      >
        <h1>This case has been concluded. Please click here if the problem is not solved yet.</h1>
        <router-link
          class="case-detail__button"
          :to="{ name: 'Home' }"
        >
          Back to Home
        </router-link>
      </div>
    </div>
    <base-footer class="case-detail__footer"></base-footer>
  </div>
</template>

<script>
import Sidebar from '@/views/auth/Sidebar.vue';
import Messages from '../../components/CaseDetail/Messages.vue';
import Card from '../../components/CaseDetail/Card.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import BaseHeader from '../../components/BaseHeader.vue';
import API from '../../api';

export default {
  props: ['id'],
  name: 'CaseDetail',
  components: {
    BaseHeader,
    BaseFooter,
    Messages,
    Card,
    Sidebar,
  },
  computed: {
    isCompany() {
      if (this.id) {
        return true;
      }

      return false;
    },
  },
  data() {
    return {
      isPageActive: true,
      details: null,
      pageId: null,
      conditionsAccepted: false,
    }
  },
  created() {
    this.fetchCase();
  },
  methods: {
    fetchCase() {
      this.pageId = (this.id) ? this.id : localStorage.getItem('caseId');
      if (!this.pageId) {
        this.$router.push({ name: 'home' });
      }
      API.cases.getById(this.pageId).then((doc) => {
        if (doc.exists && !((!doc.data().status) && !(this.id))) {
          this.details = {
            category: doc.data().feedbackType,
            id: this.id,
            ...doc.data(),
          };
        } else {
          this.isPageActive = false;
          this.logout();
        }
      })
      .catch((err) => {
        console.warn(err)
      });
    },
    copyToClipboard() {
      var copyText = this.$refs.passcode;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    logout(toObject) {
      localStorage.removeItem('caseId');
      if (toObject) {
        setTimeout(() => {
          this.$router.push(toObject)
        }, 400)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.case-detail__button {
  display: flex;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, .6);
  margin-bottom: 35px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: var(--dark-black);
    &:before {
      background-color: var(--dark-black);
    }
  }

  &:before {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    -webkit-mask: url('../../assets/arrow-right.svg') no-repeat left center;
    transform: rotate(180deg);
    background-color: rgba(0, 0, 0, .6);
    margin-left: -4px;
    margin-right: 4px;
  }
}
.content {
  max-width: 85%;
  margin: 0 auto;
  padding-top: 42px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.passcode {
  display: flex;
  flex: 0 0 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  font-size: 36px;
  line-height: 1;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    background: #97A9BE;
    padding: 0 12px;
    color: #F6F7F9;
    font-size: 32px;
    width: 250px;
    outline: none;
    margin: 0 10px;
    font-weight: 600;
  }
  span {
    font-size: 12px;
    opacity: .3;
    font-weight: 800;
    cursor: pointer;
  }
  button {
    max-width: fit-content;
    margin-right: 0;
    padding: 0 30px;
  }
}

.case-detail__chat,
.case-detail__sidebar {
  width: 50%;
}

.case-detail__sidebar {
  padding-right: 24px;
}

.case-detail__deactive {
  position: fixed;
  width: 100%;
  height: 100%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-black);
  flex-direction: column;
}

@media screen and (max-width: 992px) {
  .container {
    flex-direction: column;
  }
  .case-detail__chat,
  .case-detail__sidebar {
    width: 100%;
  }
  .case-detail__chat {
    margin-bottom: 26px;
  }
  .case-detail__sidebar {
    padding-right: 0;
  }
  .case-detail__deactive {
    position: fixed;
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark-black);
    flex-direction: column;
  }
  .case-detail__footer {
    margin-top: 0;
  }
  .chat__message {
    max-width: 90%;
  }
  .passcode {
    font-size: 16px !important;
  }

  .passcode input {
    line-height: 26px !important;
    width: 140px !important;
    height: 37px !important;
    min-height: initial;
  }

  .logout-button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    padding: 0 16px;
    min-height: 32px !important;
    height: 32px !important;
    line-height: 32px !important;
  }

}
</style>
