'use strict'
import Vue from 'vue'
import { AccountInfoModel } from '@/models/AccountInfoModel'
import { AddressModel } from '@/models/AddressModel'
import lodash from 'lodash'
import moment from 'moment'

const state = () => ({
  id: 0,
  accountInfo: '',  
  addresses: [],  
    errors: [],
    summary: [],
    validationErrors: {
        showErrors: {
          accountInfo: false,
          address: false,        
          summary: false
        },
        errors: [],
        summary: []
      }
  
})

const getters = {
  
  getAddresses: state => {
    return state.addresses
  },
  getAccountInfo: state => {
    return state.accountInfo
  },
}
const mutations = { 
  initialize: state => {
    ;(state.id = 0),
      (state.addresses = []),      
      (state.addresses = [])
     
  }, 
  validateAccountInfo: state => {
    state.validationErrors.errors = []
    state.validationErrors.summary = []

    //AccountInfo
    

    //Address
    
   
  },

  showAccountInfoErrors: (state, payload) => {
    state.validationErrors.showErrors.accountInfo = payload
  },
  showAddressErrors: (state, payload) => {
    state.validationErrors.showErrors.address = payload
  },
  
}
const actions = {
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
