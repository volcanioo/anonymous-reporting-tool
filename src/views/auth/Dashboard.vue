<template>
  <main class="dashboard z-index-1 main-container">
    <Sidebar />
    <div class="content">
      <div
        v-if="!isVerified"
        class="notification"
        v-text="$t('verify_email')"
      />
      <div
        v-if="cases.length > 0"
        class="dashboard__content"
      >
        <div class="dashboard__card dashboard__card--overall dashboard__card--full">
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
import Sidebar from './Sidebar.vue';
import TYPES from "../report/codables/TYPES.js";
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
    userId() {
      return this.$store.state.company.user_uid;
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
      loading: false,
      messages: {
        error: {
          icon: 'error',
          title: this.$t('oops'),
          text: this.$t('we_couldnt_find'),
        },
        success: {
          icon: 'success',
          title: this.$t('congratulations'),
          text: this.$t('approved_email'),
        },
        invalid_oob: {
          icon: 'error',
          title: this.$t('oops'),
          text: this.$t('invalid_oob'),
        }
      },
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
    userUid() {
      // to run after the userUid is updated after login
      this.fetchCases();
    },
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
    if (!this.isVerified && this.oobCode) {
      this.verifyUser();
    }

    this.fetchCases();
  },
  methods: {
    fetchCases() {
      if (!this.userId) {
        return;
      }

      API.cases.list(this.userId)
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
    verifyUser() {
      API.users.verify(this.oobCode)
        .then(() => {
          API.companies.createNewObject(this.companyName, this.userId).then(() => {
            this.$swal(this.messages.success).then(() => {
              this.$router.go({
                name: 'Dashboard',
                query: null
              })
            });
          });
        }).catch((err) => {
          this.$swal(this.messages.invalid_oob);
        })
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

.dashboard__card {
  background: white;
  padding: 14px 18px;
}

.dashboard__card--full {
  flex: 0 0 100%;
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

@media (max-width: 992px) {
  .dashboard__card--overall,
  .dashboard__card--welcome,
  .dashboard__card--chart {
    display: none;
  }

  .dashboard__card {
    overflow: scroll;
  }
  .card-content {
    width: 768px;
  }
}
</style>
