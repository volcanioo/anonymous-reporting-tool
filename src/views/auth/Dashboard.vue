<template>
  <main class="dashboard z-index-1">
    <Sidebar />
    <div class="content">
      <div
        v-if="!isVerified"
        class="notification"
      >
        Please approve your email. Otherwise, your emplooyes won't see your company in the company list.
      </div>
      <div 
        v-if="cases.length > 0"
        class="dashboard__content"
      >
        <div class="dashboard__card dashboard__card--welcome">
          <strong class="card__title">Welcome! <span>{{ companyName }}</span></strong>
          <div class="card__content">
            <p></p>
          </div>
        </div>
        <div class="dashboard__card dashboard__card--overall">
          <strong class="card__title">Overall Numbers ({{ monthlyReport.total }}) <span>as of {{ lastUpdated }}</span> </strong>
          <div class="card__content">
            <div class="dashboard__chart">
              <apex-chart width="100%" height="400" type="pie" :options="options" :series="series" />
            </div>
            <div class="dashboard__categories">
              <ul>
                <li
                  v-for="report in monthlyReport.cases"
                  :key="report.name"
                >
                  <span>{{ report.name }}</span>
                  <b>{{ (report.total) ? report.total : '0' }}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="dashboard__card dashboard__card--cases"
          v-if="cases.length > 0"
        >
          <div class="card__content">
            <div class="card__list card__list--title">
              <div class="card__item--short">
                Passcode
              </div>
              <div>
                Feedback Type
              </div>
              <div>
                Since
              </div>
              <div>
                Relationship To Company
              </div>
              <div>
                City
              </div>
              <div class="card__item--short">
                Status
              </div>
            </div>
            <router-link
              class="card__list"
              v-for="report in Object.assign([], cases).reverse()"
              :key="report.id"
              :to="{ name: 'CaseDetail', params: { id: report.id } }"
            >
              <div class="card__item--short">{{ (report.passcode) ? report.passcode : '-' }}</div>
              <div> <span class="badge" :class="getCamelCase(report.feedbackType)"></span> {{ report.feedbackType }}</div>
              <div>{{ (report.created) ? getMappedDate(report.created.toDate()) : '-' }}</div>
              <div>{{ (report.relationshipToCompany) ? report.relationshipToCompany : '-' }}</div>
              <div>{{ (report.whichCityDidThisHappen) ? report.whichCityDidThisHappen : '-' }}</div>
              <div class="card__item--short">
                <span 
                  class="badge generalFeedbackOrQuestion"
                  :class="{
                    'diversityEquityAndInclusion': (report.status === false)
                  }"></span> 
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div 
        v-else
        class="dashboard__content"
      >
        <div class="dashboard__card dashboard__card--full">
          <strong class="card__title">Welcome! <span>{{ companyName }}</span></strong>
          <div class="card__content">
            <p>You don't have any case at the moment.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import API from '../../api';
import utilities from '../../utilities';
import TYPES from "../report/form/TYPES";
import Sidebar from './Sidebar.vue';
import _ from 'lodash';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  computed: {
    companyName() {
      return this.$store.state.company.company_name; 
    },
    userUid() {
      return this.$store.state.company.userUid; 
    },
    isVerified() {
      return this.$store.state.company.is_mail_verified; 
    },
    oobCode() {
      return this.$route.query.oobCode; 
    },
    mode() {
      return this.$route.query.mode; 
    },
    lang() {
      return this.$route.query.lang; 
    }
  },
  data() {
    return {
      monthlyReport: {
        cases: []
      },
      lastUpdated: null,
      cases: [],
      options: {
        labels: [],
      },
      series: [],
    }
  },
  watch: {
    cases(newValue, oldValue) {
      const date = utilities.dateMapper(new Date());
      const types = [TYPES.CULTURE_ISSUES, TYPES.GENERAL, TYPES.HARASSMENT_OR_BIAS, TYPES.DIVERSITY];
      types.forEach((type) => {
        this.monthlyReport.cases.push({
          name: type,
          total: newValue.filter(report => report.feedbackType === type).length,
          data: newValue.filter(report => report.feedbackType === type)
        })
      })
      this.lastUpdated = date;
    },
    monthlyReport(newValue) {
      const listData = [];
      newValue.cases.forEach((report) => {
        listData.push({
          name: report.name,
          data: [report.total]
        })
        this.series.push(report.total)
      });
      this.options = {
        ...this.options,
        labels: [TYPES.CULTURE_ISSUES, TYPES.GENERAL, TYPES.HARASSMENT_OR_BIAS, TYPES.DIVERSITY]
      }
    },
  },
  created() {
    this.fetchCases();
  },
  methods: {
    fetchCases() {
      API.cases.list(this.$store.state.company.userUid)
      .then((query) => { 
        this.monthlyReport = {
          ...this.monthlyReport,
          total: query.size,
        }
        query.forEach((doc) => {
          if (doc.exists) {
            this.cases.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        })
      })
      .catch((err) => {
        console.warn(err);
      });
    },
    getCamelCase(text) {
      return _.camelCase(text);
    },
    getMappedDate(date) {
      return utilities.dateMapper(date);
    },
  },
};
</script>

<style lang="scss">
.dashboard {
  padding-left: 295px;
}

.content {
  padding: 20px;
}

.sidebar {
  background: var(--dark-black);
  height: 100vh;
  text-align: center;
  color: white;
  padding: 20px;
  position: fixed;
  width: 295px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.sidebar img {
  display: block;
  max-width: 50px;
  margin: 0 auto;
  border-radius: 100%;
}

.sidebar__logo {
  margin: 0;

  img {
    background: white;
    border-radius: 100%;
    width: 50%;
    max-width: initial;
    margin: 0 auto;
  }
}

.sidebar__nav {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.sidebar__nav a {
  color: white;
  line-height: 55px;
  background: rgba(255, 255, 255, .04);
  margin: 20px;
  transition: .3s;
  
  &:hover {
    margin: 20px 10px;
    background: rgba(255, 255, 255, .1);
  }
}

.notification {
  background: #d01f09;
  padding: 20px;
  color: white;
  font-size: 17px;
  font-weight: 600;
  margin: -20px;
  margin-bottom: 20px;
}

.dashboard__card {
  background: white;
  padding: 14px 18px;
}

.dashboard__card--full {
  flex: 0 0 100%;
}

.dashboard__card--overall {
  flex: 0 0 60%;
}

.dashboard__card--welcome {
  flex: 0 0 calc(40% - 20px);
  margin-right: 20px;
}

.dashboard__card--cases {
  flex: 0 0 100%;
  margin-top: 20px;
}

.dashboard__card--cases .card__content {
  flex-direction: column;
}

.dashboard__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card__title {
  font-size: 16px;
  border-bottom: 1px solid var(--light-gray);
  font-weight: 400;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: block;
  flex: 0 0 100%;

  span {
    display: block;
    font-size: 10px;
    opacity: .4;
  }
}

.card__content {
  flex: 0 0 100%;
  display: flex;
}

.dashboard__chart {
  flex: 0 0 70%;
}
.dashboard__categories {
  flex: 0 0 30%;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
  }

  li {
    display: block;
    height: 25%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--light-gray);
    border-left: 1px solid var(--light-gray);

    &:last-child {
      border-bottom: none;
    }
    &:first-child {
      margin-top: -10px;
    }

    span {
      color: #9FA2B4;
      font-size: 14px;
    }
    b {
      font-weight: 600;
      font-size: 18px;
      color: var(--dark-black);
    }
  }
}

a {
  text-decoration: none;
}

.card__list {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  flex-direction: row;
  margin: 0;
  padding: 20px 0px;
  color: gray;
  position: relative;
  transition: .2s;

  &:nth-child(2n + 1) {
    background: var(--light-gray);
  }
  &:first-child {
    border-bottom: 1px solid var(--light-gray);
    background: transparent;
  }
  div {
    flex: 0 0 20%;
    text-align: center;
  }

  &:not(:first-child):hover {
    background: var(--primary-color);
    color: var(--dark-black);
    cursor: pointer;
  }
}

.card__list--title {
  font-weight: 500;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 10px;
  color: black;
  padding-top: 0;
}

.badge {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 100%;
  margin: 0 4px 0 18px;
}

.card__item--short {
  max-width: 10%;
}
</style>
