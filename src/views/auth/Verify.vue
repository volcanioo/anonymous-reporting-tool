<template>
  <div class="verify-page">
    <base-header></base-header>
    <div class="banner">
      <span class="banner__image">
        <img src="@/assets/check.svg" :alt="this.$t('approved_email')">
      </span>
      <div class="banner__content">
        <strong>{{ this.$t('congratulations') }}</strong>
        <span>{{ this.$t('approved_email') }}</span>
      </div>
    </div>
    <router-link
      :to="'/dashboard'"
      class="button button--small go-dashboard-button"
      v-text="'Go Dashboard'"
    />
  </div>
</template>

<script>
import BaseHeader from '../../components/BaseHeader.vue';
import API from "../../api";

export default {
  name: 'Verify',
  components: {
    BaseHeader
  },
  data() {
    return {
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
      }
    }
  },
  computed: {
    photoURL() {
      return this.$store.state.company.photo_url; 
    },
    companyName() {
      return this.$store.state.company.company_name; 
    },
    userUid() {
      return this.$store.state.company.userUid; 
    },
    email() {
      return this.$store.state.company.company_email; 
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
  mounted () {
    this.verifyUser();
  },
  methods: {
    verifyUser() {
      if (! this.oobCode) this.$swal(this.messages.error);
      if (this.isVerified || ! this.oobCode) {
        this.$router.push({
          name: 'Dashboard',
        });

        return;
      }
      
      API.users.verify(this.oobCode).then(result => {
        API.companies.post(this.userUid, this.companyName, this.photoURL, this.email).then((result) => {
          this.$swal(this.messages.success);
          return;
        });
      }).catch((err) => {
        this.$swal(this.messages.invalid_oob);
        console.warn(err);
      });
    }
  },
};
</script>

<style lang="scss">
.banner {
  max-width: 960px;
  padding: 18px 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.banner__image {
  margin-bottom: 15px;
  opacity: .4;
  img {
    display: block;
    width: 100%;
    max-width: 60px;
    height: auto;
  }
}

.banner__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  strong {
    font-size: 36px;
    line-height: 44px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--dark-black);
  }
  span {
    font-size: 16px;
    color: var(--gray);
  }
}

.go-dashboard-button {
  display: block;
  max-width: 320px;
  margin-top: 50px;
}
</style>
