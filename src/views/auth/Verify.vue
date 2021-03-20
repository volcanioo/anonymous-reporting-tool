<template>
  <div class="verify-page">
    test
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
</style>
