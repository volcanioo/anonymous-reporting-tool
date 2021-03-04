<template>
  <div class="case-detail z-index-3">
    <div
      class="container"
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
        Case: <input ref="passcode" type="text" readonly :value="details.passcode"  @click="copyToClipboard"> 
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
        <div class="case-detail__content">
          <p
            class="case-detail__object"
            v-if="details.category"
            :class="{
              'case-detail__object--noAnswer': !(details.category && details.category !== '-1')  
            }"
          >
            <b>Category</b>
            <span>{{ details.category }}</span>
          </p>
          <p 
            class="case-detail__object"
            v-if="details.company"
          >
            <b>Company</b>
            <span>{{ details.company.companyName }}</span>
          </p>
          <p 
            class="case-detail__object case-detail__object--half"
            v-if="details.created"
          >
            <b>Date</b>
            <span>{{ convertDate(details.created.toDate()) }}</span>
          </p>
          <p
            class="case-detail__object case-detail__object--half"
            v-for="detail in Object.keys(details)"
            :key="detail.id"
            :class="{
              'case-detail__object--noAnswer': !(details[detail] && details[detail] !== '-1'),
              'case-detail__object--hide': hideElements(detail, ['company', 'category', 'created', 'message', 'feedbackType']),
            }"
          >
          
            <b>{{ camelCaseToNormal(detail) }}</b>
            <span>
              {{ (details[detail] && details[detail] !== '-1') ? details[detail] : 'No answer added.' }}
            </span>
          </p>
          <p 
            class="case-detail__object"
            v-if="details.message"
          >
            <b>Message:</b>
            <span>{{ details.message }}</span>
          </p>
        </div>

        <div v-if="this.id && this.details.status">
          <div class="checkbox">
            <input type="checkbox" v-model="conditionsAccepted">
            <span>
              I'm aware of when I click the “Close the Case” button, and I won't be able to view the case again.
            </span>
          </div>

          <button
            class="button"
            :disabled="!conditionsAccepted"
            :class="{
              'button--signal': conditionsAccepted,
            }"
            @click="closeTheCase()"
          >Close the Case</button>
        </div>
      </aside>
      <div class="case-detail__chat">
         <messages
          :case-id="pageId"
          :disabled="!this.details.status"
         />
      </div>
    </div>
    <div v-if="!isPageActive" class="case-detail__archived">
      <h1>This case has been archived or removed.</h1>
      <router-link
        class="case-detail__button"
        :to="{ name: 'Home' }"
      >
        Back to Home
      </router-link>
    </div>
    <base-footer class="case-detail__footer"></base-footer>
  </div>
</template>

<script>
import BaseFooter from '../components/BaseFooter.vue';
import BaseHeader from '../components/BaseHeader.vue';
import Messages from '@/components/Messages.vue';
import utilities from '../utilities';
import API from '../api';

export default {
  props: ['id'],
  name: 'CaseDetail',
  components: {
    BaseHeader,
    BaseFooter,
    Messages,
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
  methods: {
    convertDate(date) {
      return utilities.dateMapper(date)
    },
    camelCaseToNormal(data) {
      return data.replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
    },
    hideElements(target, stringArray) {
      var value = 0;
      stringArray.forEach(function(word){
        value = value + target.includes(word);
      });
      return (value === 1);
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
    closeTheCase() {
      API.cases.postById(this.pageId, {
        ...this.details,
        status: false
      })
      .then((doc) => {
        this.logout({
          name: "Dashboard"
        });
      })
      .catch((err) => {
        console.warn(err)
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 85%;
  margin: 0 auto;
  padding-top: 42px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

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
    -webkit-mask: url('../assets/arrow-right.svg') no-repeat left center;
    transform: rotate(180deg);
    background-color: rgba(0, 0, 0, .6);
    margin-left: -4px;
    margin-right: 4px;
  }
}

.case-detail__content {
  display: flex;
  background: white;
  flex-wrap: wrap;
}

.case-detail__sidebar {
  flex: 0 0 48%;
  margin: 0 2% 0 0%;
}

.case-detail__wrapper {
  height: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
}

.case-detail__object {
  border: 1px solid var(--light-gray);
  border-left: none;
  border-top: none;
  margin: 0;
  padding: 12px 20px;
  font-size: 16px;
  max-width: 100%;
  flex: 0 0 100%;

  &:last-child {
    border-top: 1px solid var(--light-gray);
    margin-top: -1px;
    width: 100%;
  }

  b {
    display: block;
    font-weight: 500;
    opacity: .6;
    font-size: 14px;
  }
}

.case-detail__object--half {
  max-width: 50%;
  flex: 0 0 50%;
}

.case-detail__object--noAnswer {
  background-image: linear-gradient(rgba(223, 223, 223, 0.04) .1em, transparent .1em), linear-gradient(90deg, rgba(223, 223, 223, 0.04) .1em, transparent .1em);
  background-size: .3em .3em;
  overflow: hidden;
  opacity: .6;

  span {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: .3px;
    opacity: .2;
  }
}

.case-detail__object--hide {
  visibility: hidden;
  display: none;
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
    background: #bbddcd;
    padding: 0 12px;
    color: var(--dark-black);
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

.case-detail__chat {
  width: 50%;
}

.case-detail__archived {
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
  margin-top: 200px;
}
</style>
