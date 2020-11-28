<template>
  <div> 
      <div>
        <fieldset :disabled="isFormDisabled">         

          <b-row class="form-group">
            <b-col cols="4">
              <div class="label">Street Address *</div>
            </b-col>
            <b-col cols="8">
              <div class="value">
                <!-- <BaseInput
                  v-model="data.address1"
                  name="address1"
                  class="no-margin form-control"
                /> -->
                 <b-input v-model="data.address1" name="address1" placeholder="Street Address"  />
              </div>
            </b-col>
          </b-row>
          <b-row class="form-group"> 
             <b-col cols="4">
              <div class="label">Street Address 2</div>
            </b-col>         
            <b-col cols="8">
              <div class="value">
                <b-input v-model="data.address2" name="address2" placeholder="Street Address2"  />
              </div>
            </b-col>
          </b-row>     
          <b-row class="form-group">
            <b-col cols="4">
              <div class="label">City *</div>
            </b-col>
            <b-col cols="8">       
                <b-input v-model="data.city" name="city" placeholder="City"  />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="4">              
                District *              
            </b-col>
            <b-col cols="8">
              <!-- <DropDown                
                v-model="data.districtId"
                label
                :options="getDistricts"
                class="form-control"
                name="district"
                @onChanged="onDistrictChange"
              /> -->
                <b-form-select
                v-model="selectedOption"              
                @change="onChange()"
                :name="districtName"
              >
                <b-form-select-option :value="null">--Select--</b-form-select-option>
                <b-form-select-option
                  v-for="option in options"
                  :value="option.id"
                  v-bind:key="option.id"
                  >{{ option.name }}</b-form-select-option
                >
              </b-form-select>
              <b-input               
                v-model="data.districtName"
                name="districtName"
                class="form-control"
              />
            </b-col>
          </b-row>              
        </fieldset>
        
      </div>
  
  </div>
</template>
<script>
import lodash from 'lodash'
import BaseInput from '@/components/common/Input'
import DropDown from '@/components/common/DropDown'
import { mapState, mapGetters } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'
import integer from 'vuelidate/lib/validators/integer'
import { RequestOperationType } from '@/models/enums/RequestOperationType'
import BaseDatePicker2 from '@/components/common/DatePicker'
import  moment  from 'moment'

export default {
  components: {
    BaseInput,
    DropDown,
    BaseDatePicker2
  },
  props: {
    data: {
      type: Object,
      default: {}
    }    
  },
  mounted() {    
  },
  data() {
    return {
      errorMessages: [],
      iid: lodash.uniqueId()
    }
  },
  computed: {   
  },
  validations: {
    data: {
      address1: { required },
      postalCode: {required },
      city: {required },
      districtId: {required }
      
    }
  },
  methods: {
 
    clear() {
      this.$emit('clearAddress')
      this.$v.$reset()
    },
    clearValidations() {
      this.$v.$reset()
    },
  
    isValid() {
      this.$v.$touch() //it will validate all fields
      let status = !this.$v.$invalid
      this.$emit('valid', status)
      if (this.$v.$invalid) return false
      else
      return true
    }
  }

}
</script>
