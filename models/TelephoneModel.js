
export const TelephoneModel = {
    iid: Math.floor(Math.random() * 100) + 1,
    id: 0,
    countryCode: '',
    phoneNumber: ''
  } 
  
  export class  TelephoneDecorator {
    constructor(telephone) {
      this.telephone = telephone
    }
  
    toRequest() {
      return {
        id: this.telephone.id,
        countryCode: this.telephone.countryCode,
        phoneNumber: this.telephone.phoneNumber
      }
    }
  }
  
