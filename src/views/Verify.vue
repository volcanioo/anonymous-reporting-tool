<template>
  <div class="verify-page">
    test
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import API from "../api";

export default {
  name: 'Verify',
  components: {
    BaseHeader
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
    if (!this.isVerified) {
      API.users.verify(this.oobCode).then(result => {
        API.companies.post(this.userUid, this.companyName, this.photoURL).then((result) => {
          this.$router.push({ name: 'Dashboard' });
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.$router.push({ name: 'Dashboard' });
    }
  },
  methods: {
  },
};
</script>

<style lang="scss">
.register-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  align-items: center;
  padding-top: 30px;

  input {
    width: 100%;
    height: 68px;
    border: none;
    background: #F6F7F9;
    font-size: 20px;
    font-family: inherit;
    font-weight: 500;
    color: #808080;
    margin-bottom: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }

  label {
    font-size: 16px;
    margin-bottom: 4px;
    width: 100%;
  }
}

.form__link {
  margin: 40px 0;
  font-size: 20px;
  font-weight: 300;
  text-decoration: none;
  color: #1a1a1a;
  padding: 0 10px;
}
</style>
