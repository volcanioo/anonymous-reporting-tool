<template>
  <div class="company-settings z-index-3">
    <Sidebar />
    <div class="content">
      <Form :elements="settingsInputs" :submitButton="submitButton" :submitAction="submit"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/auth/Sidebar.vue';
import InputGenerator from '@/components/InputGenerator.vue';
import Form from '@/components/Form.vue';
import API from '@/api';

export default {
  name: 'CompanySettings',
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
    submitButton() {
      return {
        id: 'submit',
        type: 'button',
        label: 'Save Changes',
      }
    },
    settingsInputs() {
      return [
        {
          id: 'company_name',
          placeholder: 'Name',
          type: 'input',
          value: this.companyData.company_name,
        },
        {
          id: 'company_email',
          placeholder: 'Email',
          type: 'input',
          value: this.companyData.company_email,
        },
        {
          id: 'phone_number',
          placeholder: 'Phone number',
          type: 'input',
          value: this.companyData.phone_number,
        },
        {
          id: 'photo_url',
          placeholder: 'Image or logo',
          type: 'file',
          value: this.companyData.photo_url,
        },
      ]
    },
    companyData() {
      return this.$store.state.company;
    }
  },
}
</script>