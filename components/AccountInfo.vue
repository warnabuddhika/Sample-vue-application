<template>
  <form-wrapper :validator="$v">
    <section class="content-body">  
        <b-row class="form-group">
            <b-col cols="2">
            <div class="label">Contact Person *</div>
            </b-col>
            <b-col cols="4">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.contactPerson"
                name="contactPerson"
                class="form-control"
                /> -->
                  <b-input v-model="accountInfo.contactPerson" name="contactPerson" placeholder="Contact Person"  />
            </div>
            </b-col>
            <b-col cols="4">
                </b-col>
         </b-row>
              <b-row class="form-group">
            <b-col cols="2">
            <div class="label">Business Name *</div>
            </b-col>
            <b-col cols="4">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.businessName"
                name="businessName"
                class="form-control"
                /> -->
                <b-input v-model="accountInfo.businessName" name="businessName" placeholder="Business Name" />
            </div>
            </b-col>
            <b-col cols="4">
                </b-col>
         </b-row>
              <b-row class="form-group">
            <b-col cols="2">
            <div class="label">Contact Number *</div>
            </b-col>
            <b-col cols="2">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.countryCode"
                name="countryCode"
                class="form-control"
                /> -->
                <b-input v-model="accountInfo.countryCode" name="countryCode" placeholder="Country Code"/>
            </div>
              </b-col>
            <b-col cols="2">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.phoneNumber"
                name="phoneNumber"
                class="form-control"
                /> -->
                <b-input v-model="accountInfo.phoneNumber" name="phoneNumber" placeholder="Phone Number" />
            </div>
            </b-col>
            <b-col cols="4">
                </b-col>
         </b-row>
          <Address
            ref="Address"            
          />
               <b-row class="form-group">
            <b-col cols="2">
            <div class="label">E-mail *</div>
            </b-col>
            <b-col cols="4">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.email"
                name="contactPerson"
                class="form-control"
                /> -->
                 <b-input v-model="accountInfo.email" name="email" placeholder="E-mail" />
            </div>
            </b-col>
            <b-col cols="4">
                </b-col>
         </b-row>
              <b-row class="form-group">
            <b-col cols="2">
            <div class="label">Start Date *</div>
            </b-col>
            <b-col cols="4">
            <div class="value">
                <!-- <BaseInput
                v-model="accountInfo.startDate"
                name="startDate"
                class="form-control"
                /> -->
                 <b-input v-model="accountInfo.startDate" name="startDate" placeholder="Start Date"  />
            </div>
            </b-col>
            <b-col cols="4">
                </b-col>
         </b-row>       
      
      <b-row class="form-group">
        <b-col></b-col>
      </b-row>

      <div>
        <div
          class="panel-message-error"     
        >
         <p v-if="errorMessages.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errorMessages">{{ error }}</li>
            </ul>
        </p>
        </div>
      </div>    
    </section>
    
  </form-wrapper>
</template>

<script>
import BaseInput from '@/components/common/Input'
import Address from '@/components/common/Address'
import BaseDatePicker from '@/components/common/DatePicker'
import { required } from 'vuelidate/lib/validators'
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'
import { formatDate } from '@/static/datehelper'
import lodash from 'lodash'
import { ValidationMixin } from '@/mixins/ValidationMixin'
import { AccountInfoModel } from '@/models/AccountInfoModel'
import { mapState, mapGetters } from 'vuex'
import { ApplicationStore } from '@/store/store'

export default {
  mixins: [ValidationMixin],
  components: {  
    BaseDatePicker,
    Address
  },
  computed: {    

  },
  props: {
    metaData: {
      type: Object,
      default: {}
    }
  },
  data() {
      debugger
    return {  
      errorMessages: [],      
      accountInfo: Object.assign({}, AccountInfoModel)
     
    }
  },
  validations: {
    accountInfo: {
      contactPerson: { required(){return true} }, 
      businessName:{ required }
    }
  },
  mounted() {
   
  },
  methods: {      
   saveDraft() {
       debugger
        if (this.isValid())
        {
    debugger 
        }
  
    },    
    isValid() {        
              debugger
         var state = false;
       if(!this.contactPerson) {
            this.errorMessages.push('Contact Person is required.');
            state = false;
       }
       return state;    
    },
    },
    
  
  }

</script>
