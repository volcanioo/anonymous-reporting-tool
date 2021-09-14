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

export default {
  name: 'CompanySettings',
  components: {
    Sidebar,
    InputGenerator,
    Form
  },
  methods: {
    submit() {
      alert('hello');
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