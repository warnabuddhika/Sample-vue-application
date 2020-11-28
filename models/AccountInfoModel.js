import { AddressModel } from '@/models/AddressModel'


export const AccountInfoModel = {  
  id: 0,
  contactPerson: '',
  businessName: '',
  countryCode: '',
  phoneNumber: '',
  email: '',
  startDate: '',
  address:AddressModel
  
}
export class AccountInfoDecorator {
  constructor(accountInfo) {
    this.accountInfo = accountInfo
  }

}
