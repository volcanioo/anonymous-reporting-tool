<template>
  <div class="case-detail z-index-3">
    <div
      class="container"
      v-if="details"
    >
      <h1 class="passcode">
        Case: <input ref="passcode" type="text" readonly :value="details.passcode"  @click="copyToClipboard"> 
        <span @click="copyToClipboard">COPY</span>
      </h1>
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
            <span class="badge">{{ details.category }}</span>
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
      </aside>
      <div class="case-detail__chat">
         <messages
          :case-id="pageId"
         />
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import Messages from '@/components/Messages.vue';
import utilities from '../utilities';
import API from '../api';

export default {
  props: ['id'],
  name: 'CaseDetail',
  components: {
    BaseHeader,
    Messages,
  },
  data() {
    return {
      details: null,
      pageId: null,
    }
  },
  created() {
    this.pageId = (this.id) ? this.id : localStorage.getItem('caseId');
    if (!this.pageId) {
      this.$router.push({ name: 'home' });
    }
    API.cases.getById(this.pageId).then((doc) => {
      this.details = {
        category: doc.data().feedbackType,
        id: this.id,
        ...doc.data(),
      };
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding-top: 42px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
  box-sizing: border-box;

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

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 

  input {
    background: #bbddcd;
    padding: 0 12px;
    color: #000000;
    font-size: 32px;
    width: 210px;
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
}

.case-detail__chat {
  width: 50%;
}
</style>
