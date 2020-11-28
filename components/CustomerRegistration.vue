<template>
  <div>
    <div class="page-padding">
      <div class="page-content">
        <!-- Starting Tabs Section -->
        {{hideSaveExitBtn}}
        <b-tabs
          v-model="tabIndex"
          class="register-tab"
          @activate-tab="tabChange"
          justified
        >
          <b-tab
            title="Account Info"
            active
            :disabled="false"
          >
            <div class="tab-content">
              <AccountInfo
                :meta-data="metaData"
                @changeTab="setTabIndex"                           
              />
            </div>
          </b-tab>
          <b-tab title="Billing Address">
            <div class="tab-content">
              <Address :meta-data="metaData" @changeTab="setTabIndex" ref="address" />
            </div>
          </b-tab>
          <b-tab title="Shipping Address">
            <div class="tab-content">
              <Address :meta-data="metaData" @changeTab="setTabIndex" ref="address" />
            </div>
          </b-tab>         
        </b-tabs>
      </div>
    </div>
      <div>
        <div
          class="panel-message-error danger"    
        >
         <p v-if="errorMessages.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errorMessages">{{ error }}</li>
            </ul>
        </p>
        </div>
      </div>
    <TabNavigation @clicked="onNavigate" :save-exit="showSaveExit" v-bind="buttons" ref="tabNavigation" />
  </div>
</template>
<script>
import Address from '@/components/common/Address'
import AccountInfo from '@/components/AccountInfo'
import TabNavigation from '@/components/common/TabNavigation'
import { mapState, mapGetters } from 'vuex'

import { TabNavigationMixin } from '@/mixins/TabNavigationMixin'
import { AccountInfoModel } from '@/models/AccountInfoModel'

export default {
   mixins: [TabNavigationMixin],
  components: {  
    Address,
    AccountInfo,
    TabNavigation   
  },
    props: {
    metaData: {
      type: Object,
      default: {}
    },
    applicationMode: {
      type: String,
      default: ''
    }
  },
    data() {
         debugger
    return {       
      totalTabs: 3,      
      errorMessages: [],  
      accountInfo: Object.assign({}, AccountInfoModel),
      buttons: [
        { next: true },
        { previous: false },
        { submit: false },
        { cancel: true }       
      ]
    }
  },
   methods: {
       saveDraft() {
        debugger
        if (this.isValid())
        {
            return true;
        }

    },
      setTabIndex(index) {
          debugger
      this.tabIndex = index
    },  
   tabChange(newTabIndex, prevTabIndex, event) {  
  
    debugger
      if (newTabIndex == 0) {       
        this.buttons = [
          { next: true },
          { previous: false },
          { submit: false },
          { cancel: true }         
        ]
      } else if (newTabIndex == 1) {       
        this.buttons = [
          { next: true },
          { previous: true },
          { submit: false },
          { cancel: true }        
        ]
      } else if (newTabIndex == 2) {       
        this.buttons = [
          { next: false },
          { previous: true },
          { submit: true },
          { cancel: true }        
        ]
     
      } 

      if (prevTabIndex == 0) {      
      } else if (prevTabIndex == 1) {       
      } else if (prevTabIndex == 2) {        
      }
    },
      isValid() {
          debugger
         var state = false;
       if(this.accountInfo.contactPerson == "") {
            this.errorMessages.push('Contact Person is required.');
            state = false;
       }  
         if(this.accountInfo.businessName == "") {
            this.errorMessages.push('Business Name is required.');
            state = false;
       }
         if(this.accountInfo.countryCode == "") {
            this.errorMessages.push('Country Code is required.');
            state = false;
       }
         if(this.accountInfo.phoneNumber == "") {
            this.errorMessages.push('Phone Number is required.');
            state = false;
       }  
         if(this.accountInfo.email == "") {
            this.errorMessages.push('E-mail is required.');
            state = false;
       } 
         if(this.accountInfo.startDate == "") {
            this.errorMessages.push('start Date is required.');
            state = false;
       } 
       return state; 
    },
   }
}
</script>


<style>

.faqs-header {
  padding-left: 350px;
}

@media only screen and (max-width: 1280px){
  .faqs-header {
    padding-left: 280px;
  }

  h1.section-heading-1 {
    margin-bottom: 20px;
  }
}

@media only screen and (max-width: 1023px){
  .faqs-header {
    padding-left: 200px;
  }
}

@media only screen and (max-width: 767px){
  .faqs-header {
    padding-left: 0;
  }
  
  .custom-vertical-tab > div {
    width:100%
  }
}
</style>