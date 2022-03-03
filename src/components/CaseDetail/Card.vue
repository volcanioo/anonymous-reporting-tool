<template>
  <div>
    <div class="case-detail__content">
      <p
        class="case-detail__object"
        v-if="details.category"
        :class="{
          'case-detail__object--noAnswer': !hasCategory
        }"
      >
        <b>{{ $t('category') }}</b>
        <span>{{ details.category }}</span>
      </p>
      <p
        class="case-detail__object"
        v-if="details.company"
      >
        <b>{{ $t('company') }}</b>
        <span>{{ details.company.companyName }}</span>
      </p>
      <p
        class="case-detail__object case-detail__object--half"
        v-if="details.created"
      >
        <b>{{ $t('date') }}</b>
        <span>{{ convertDate(details.created.toDate()) }}</span>
      </p>
      <p
        class="case-detail__object case-detail__object--half"
        v-for="detail in Object.keys(details)"
        :key="detail.id"
        :class="{
          'case-detail__object--noAnswer': !(details[detail] && details[detail] !== '-1'),
          'case-detail__object--hide': isCurrentElementVisible(detail, ['company', 'category', 'created', 'message', 'feedbackType', 'status', 'id']),
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
    <div
      v-if="isCompany"
      class="case-status"
    >
      <div class="status-indicator">
        <span class="status-indicator__title">
          Status
          <span
            class="badge"
            :class="{
              'generalFeedbackOrQuestion': details.status,
              'diversityEquityAndInclusion': !details.status,
            }"
          />
          {{ currentStatus }}
        </span>
        <p
          v-html="getStatusDescription(details.status)"
        />
      </div>
    </div>
    <select
      v-if="isCompany"
      v-model="details.status"
      @change="statusChangeConfirmationModal"
    >
      <option value="true">Active</option>
      <option value="false">Hide from public</option>
    </select>
  </div>
</template>

<script>
import utilities from '../../utilities';
import API from '../../api';

export default {
  props: {
    details: {
      type: Object,
      default: () => {},
    },
    isCompany: {
      type: Boolean,
      default: () => false,
    },
    caseId: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentStatus() {
      return this.details.status ? this.$t('active') : this.$t('hide_from_public');
    },
    hasCategory() {
      return (this.details.category && this.details.category !== '-1');
    },
  },
  methods: {
    getStatusDescription(status) {
      return status ? this.$t('active_description') : this.$t('hide_from_public_description')
    },
    convertDate(date) {
      return utilities.dateMapper(date);
    },
    camelCaseToNormal(string) {
      return utilities.camelCaseToNormal(string);
    },
    removeHTMLTags(string) {
      return string.replace(/(<([^>]+)>)/gi, '');
    },
    isCurrentElementVisible(element, hiddenElements) {
      let value = 0;
      hiddenElements.forEach((word) => {
        value += element.includes(word);
      });
      return (value === 1);
    },
    statusChangeConfirmationModal() {
      const caseStatus = (this.details.status === 'true');
      if (caseStatus) {
        this.updateCaseStatus();
        return;
      }
      this.$swal({
        title: this.$t('are_you_sure'),
        text: this.$t('reporter_warning'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1a1a1a',
        cancelButtonColor: '#f63131',
        confirmButtonText: this.$t('yes_hide_from_public'),
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.updateCaseStatus();
          } else {
            this.details.status = !caseStatus;
          }
        });
    },
    updateCaseStatus() {
      const caseStatus = (this.details.status === 'true');
      API.cases.postById(this.caseId, {
        ...this.details,
        status: caseStatus,
      })
        .then(() => {
          this.$emit('status-updated');
          this.$swal({
            icon: 'success',
            position: 'center',
            title: 'Case status changed',
            text: this.removeHTMLTags(this.getStatusDescription(caseStatus)),
          });
        })
        .catch((err) => {
          console.warn(err);
        });
    },
  },
}
</script>

<style lang="scss" scoped>
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

.case-status {
  .wrapper {
    padding: 12px 12px 12px 18px;
    background: white;
    margin-top: 8px;
  }
  strong {
    font-size: 16px;
    font-weight: 500;
    color: var(--dark-black);
  }
  p {
    font-size: 14px;
    margin: 4px 0 0 0;
    color: var(--gray);
  }
  button {
    max-width: 200px;
    margin-right: 0;
    margin-left: auto;
    font-size: 16px;
  }
}

.status-indicator {
  margin-top: 24px;
  background: white;
  padding: 12px 18px;
  font-size: 16px;

  .badge {
    margin-left: 4px;
  }
}

@media (max-width: 992px) {

  .case-detail__object--half {
    max-width: 100%;
    flex: 0 0 100%;
  }

  .case-detail__content {
    margin-bottom: 16px;
  }

}
</style>
