import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import FormGroup from '@/components/common/FormGroup'
import FormSummary from '@/components/common/FormSummary'

/* We need messages for validation */
const messages = {
  required: '{attribute} is required.',
  requiredCustom: '{attribute} is required.',
  notColombo: '{attribute} must not be Colombo',
  email: '{attribute} should be a valid email.',
  maxLength: '{attribute} should be less than {max} characters.',
  onlynumbers: '{attribute} should be numbers.',
  bruneiTpNumber: 'Brunei telephone number must be in 7 digits.',
  internationalTpNumber: 'Maximum length of a phone number is 15 digits',
  telephone: ' Enter valid {attribute}.',
  
  effectiveDateValidate:
    '{attribute} cannot be less than incorporation date and cannot be greater than 90 working days',
  validateName: 'please validate proposed name in order to proceed.',
  decimalNumbers: '{attribute} must be greater than numeric or greater than 0',


  PositionRequired: 'Position is required',
  dateValidate: '{attribute} must be greater than application date',

  
}

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VuelidateErrorExtractor, {
  messages,
  attributes: {
    districtId: 'District',
    address1: 'Address',
    postalCode: 'Postal Code',
    mukim: 'Mukim',
    village: 'Village',
    district: 'District',   
    selectedcountry: 'Country',   
    name: 'Name',
    designation: 'Designation or Agent Identification Document Number',
    contactNumber: 'Contact Number',
    email: 'Email Address',
    dob: 'Date of Birth',
    fullName: 'Full Name',   
    ownerTypeId: 'Owner Type',
    phoneNumber: 'Phone Number',
    countryCode: 'Country Code',
    gender: 'Gender',   
  }
})

//Vue.component('FormGroup', FormGroup)
Vue.component('FormSummary', FormSummary)
Vue.component('formWrapper', templates.FormWrapper)
