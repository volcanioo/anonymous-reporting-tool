<template>
  <main class="company-settings z-index-3 main-container">
    <Sidebar>
      <router-link
        :to="{ name: 'CaseDetail' }"
      >
        Case Detail
      </router-link>
      <router-link
        :to="{ name: 'UserSettings' }"
      >
        Settings
      </router-link>
    </Sidebar>
    <div class="content">
      <Form :elements="settingsInputs" :submitAction="submit" :submitLabel="$t('save')"/>
    </div>
  </main>
</template>

<script>
import Sidebar from '@/views/auth/Sidebar.vue';
import InputGenerator from '@/components/InputGenerator.vue';
import Form from '@/components/Form.vue';
import API from '@/api';

export default {
  name: 'UserSettings',
  components: {
    Sidebar,
    InputGenerator,
    Form
  },
  methods: {
    submit(e) {
      const userUid = this.$store.state.company.userUid;
      const values = {};
      e.target.elements.forEach(e => (e.name) ? values[e.name] = e.value : null);

      API.companies.post(
        userUid,
        values.company_name,
        values.photo_url,
        values.phone_number,
        values.company_email,
        false
      ).then( () => {
        this.$swal({
          icon: 'success',
          showConfirmButton: false,
          position: 'top-end',
          title: `Settings saved!`,
          toast: true,
          timer: 1500,
          timerProgressBar: true,
        });
      }).catch(( error ) => {
        console.error(error);
        this.$swal({
          icon: 'error',
          showConfirmButton: false,
          position: 'top-end',
          title: `Error!`,
          toast: true,
          timer: 1500,
          timerProgressBar: true,
        });
      });
    },
  },
  computed: {
    settingsInputs() {
      return [
        {
          id: 'company_name',
          placeholder: 'Name',
          type: 'input',
          required: true,
          value: this.companyData.company_name,
          validate: (value) => {
            if (value === -1 || value === '') {
              return false;
            }

            return true;
          },
        },
        {
          id: 'company_email',
          placeholder: 'Email',
          type: 'input',
          required: true,
          value: this.companyData.company_email,
          validate: (value) => {
            if (value === -1 || value === '') {
              return false;
            }

            return true;
          },
        },
        {
          id: 'phone_number',
          placeholder: 'Phone number',
          type: 'input',
          required: true,
          value: this.companyData.phone_number,
          validate: (value) => {
            if (value === -1 || value === '') {
              return false;
            }

            return true;
          },
        },
      ];
    },
    companyData() {
      return this.$store.state.company;
    },
  },
}
</script>
