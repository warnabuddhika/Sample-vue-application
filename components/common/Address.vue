<template>
  <form-wrapper >
    <section class="content-body">
     

      <b-row>
        <b-col cols="6">
          <AddressInput
            ref="AddressInput"
            :data="address"
            :showAddressType="true"
            :allowToChangeAddressType="allowToChangeAddressType"
            :actionName="actionName"
            :StartDateRequired="StartDateRequired"
            @saveAddress="save"
            @clearAddress="clear"
            :isFormDisabled="false"
          />
        </b-col>    
      </b-row>
      <b-row class="form-group">
        <b-col></b-col>
      </b-row>

      <div>
        <!-- <div
          class="panel-message-error"     
        >
          <p class="semibold red">Errors</p>
          <ul class="error-list">
            <li           
            >
             
            </li>
          </ul>
        </div> -->
      </div>
    </section>
    <!--  <form-summary/>-->
  </form-wrapper>
</template>

<script>
import BaseDatePicker from '@/components/common/DatePicker'
import AddressInput from '@/components/common/AddressInput'

import { AddressModel } from '@/models/AddressModel'
import { mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'
import { formatDate } from '@/static/datehelper'
import lodash from 'lodash'
import { ValidationMixin } from '@/mixins/ValidationMixin'

export default {
  mixins: [ValidationMixin],
  components: {
    AddressInput, 
    BaseDatePicker
  },
  computed: {
    ...mapGetters('application', [
      'getAddresses',
      'getApplicationId',
      'getRegistrationDate',
      'getEntityApplicationTypeId',
      'getBusinessNameTypeId',
      'getValidateBusinessName'
    ]),
    ...mapGetters('masterData', [
      'getCountries'
    ]),
    
    maintain_Maintainmode() {
      if (this.getEntityApplicationTypeId == 2) {
        return true
      } else {
        return false
      }
    }
  },
  props: {
    metaData: {
    //   type: Object,
    //   default: {}
    }
  },
  data() {
    return {        
      address: Object.assign({}, AddressModel),
      index: -1, 
      allowToChangeAddressType: true,
      actionName: 'Add Address',
      sectionDirty: false,
      dateOfChange: null,
      ceaseDate: null,
      isCeaseDateDisabled: true,
      StartDateRequired: false
    }
  },
  mounted() {
    // let routePath = this.$route.params.action.toString()
    // if(routePath == 'maintenance' || routePath == 'maintenance_draft') {
    //   this.StartDateRequired = true
    // }
    // else {
    //   this.StartDateRequired= false
    // }

    this.address.isPrimaryAddress = true
    this.address.countryId = 32
    this.address.countryName = 'Brunei Darussalam'
  },
  methods: {
    editAddress(index) {
      this.index = index
      const address = this.getAddresses[index]
      this.address = lodash.cloneDeep(address)
      this.address = Object.assign({}, address)
      this.actionName = 'Save'
    },
    unceaseAddress(index) {
      const address = this.getAddresses[index]

      const unceaseAddress = Object.assign({}, address)

      unceaseAddress.isEdited = false
      unceaseAddress.requestOperationType = RequestOperationType.EDIT

      this.$store.dispatch('application/updateAddress', {
        address: unceaseAddress,
        index: index
      })
    },
    deleteAddress(index) {
      const address = this.getAddresses[index]
      if (
        address.id == 0 ||
        address.addressId == null ||
        address.addressId == 0
      )
        this.$store.commit('application/deleteAddress', index)
      else {
        this.address = lodash.cloneDeep(address)
        this.address = Object.assign({}, address)

        this.actionName = 'Save'
        this.address.requestOperationType = RequestOperationType.CEASE
        this.isCeaseDateDisabled = false
        this.index = index
      }

      this.$store.dispatch('application/validateBusinessName')
    },
    save(options) {
      
      if (this.address.requestOperationType != RequestOperationType.CEASE) {
        if (this.index === -1) {
          this.address.isEdited = true
          this.$store.dispatch('application/addAddress', this.address)
          this.clearValidations()
          this.sectionDirty = true
        } else {
        
          this.address.isEdited = true

          if (this.address.addressId > 0) {

            if (this.isValid()) {
              //approved address cannot be changed without adding dateofchange
              if (this.address.addressId > 0) {
                this.address.requestOperationType = RequestOperationType.EDIT
              }
              this.address.changedDate = this.dateOfChange
              this.address.effectiveDate = this.address.lastUpdated
              this.$store.dispatch('application/updateAddress', {
                address: this.address,
                index: this.index
              })
              this.clearValidations()

              this.dateOfChange = null
            } else {
              return
            }
          } else {
            this.$store.dispatch('application/updateAddress', {
              address: this.address,
              index: this.index
            })
            this.clearValidations()
          }
        }
      } else {

        if (this.isValid()) {
          this.address.changedDate = this.dateOfChange
          this.address.endDate = this.ceaseDate
          this.address.effectiveDate = this.ceaseDate
          this.address.isEdited = true

          this.$store.dispatch('application/ceaseAddress', {
            address: this.address,
            index: this.index
          })

          this.dateOfChange = null
          this.ceaseDate = null
          this.isCeaseDateDisabled = true
        } else {
          return
        }
      }
      this.address = Object.assign({}, AddressModel)
      this.address.countryId = 32
      this.address.countryName = this.getCountries.find(x => x.id == 32).name

      this.actionName = 'Add Address'
      this.index = -1
      this.$v.$reset()
      this.$refs.AddressInput.clearValidations()
      this.$store.dispatch('application/validateBusinessName')
    },
    clearValidations() {
      if (this.$refs.AddressInput) {
        this.$refs.AddressInput.clearValidations()
      }
    },
    clear() {
      let isPrimaryAddress = this.address.isPrimaryAddress
      this.address = Object.assign({}, AddressModel)
      this.address.isPrimaryAddress = isPrimaryAddress
    },
    async onValueChanged(value) {
      if (!Date.parse(value)) {
        return
      }
    },
    async onDateOfChanged(value) {
      this.$store.commit('application/setDateOfChangeAddress', value)
      if (!Date.parse(value)) {
        return
      }
    },
    isValid() {
      this.$v.$touch() //it will validate all fields

      let status = false

      if (
        this.getEntityApplicationTypeId == 2 &&
        this.isCeaseDateDisabled == false
      ) {
        status = !this.$v.$invalid
        this.$emit('valid', status)
      } else {
       // status = !this.$v.data.dateOfChange.$invalid
        this.$emit('valid', status)
      }
      if (status) {
        //invalid, becomes true when a validations return false
        return true
      } else {
        return false
      }
    },
    DateFormat(dob) {
      return formatDate(dob)
    }
  },
  validations: {
    data: {
      dateOfChange: {
        required() {
          if (this.dateOfChange == '' || this.dateOfChange == null) {
            return false
          } else {
            return true
          }
        },
        futureDateValidate() {
          var today = new Date()
          var selectdate = new Date(this.dateOfChange)

          if (selectdate > today) {
            return false
          } else {
            return true
          }
        },
        previousDateValidate() {
          var registrationDate = new Date(this.getRegistrationDate)
          var changedDate = new Date(this.dateOfChange)

          if (Date.parse(changedDate) < Date.parse(registrationDate)) {
            return false
          } else {
            return true
          }
        }
      },
      ceaseDate: {
        required() {
          if (this.ceaseDate == '' || this.ceaseDate == null) {
            return false
          } else {
            return true
          }
        },
        futureDateValidate() {
          var today = new Date()
          var selectdate = new Date(this.ceaseDate)
          if (selectdate > today) {
            return false
          } else {
            return true
          }
        },
        previousDateValidate() {
          var registrationDate = new Date(this.getRegistrationDate)
          var changedDate = new Date(this.ceaseDate)
          if (Date.parse(changedDate) < Date.parse(registrationDate)) {
            return false
          } else {
            return true
          }
        }
      }
    }
  }
}
</script>
