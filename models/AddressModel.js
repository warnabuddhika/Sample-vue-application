import { TelephoneModel } from '@/models/TelephoneModel'
import { CountryModel } from '@/models/CountryModel'
import { DistrictModel } from '@/models/DistrictModel'
import { RequestOperationType } from '@/models/enums/RequestOperationType'

export const AddressModel = {
  iid: Math.floor(Math.random() * 100) + 1,
  id: 0,
  address1: '',
  address2: '',
  address3: '',
  postalCode: '',
  city: '',
  village: '',
  isPrimaryAddress: '',
  effectiveDate: null,
  resolutionDate: null,
  endDate: null,
  telephones: [Object.assign({}, TelephoneModel)],
  district: DistrictModel,
  country: [Object.assign({}, CountryModel)],
  districtId: '',
  countryId: '',
  districtName: '',
  dateOfChange: '',
  requestOperationType: RequestOperationType.ADD,
  isEdited: false,
  addressId: '',
  changedDate: null
}
export class AddressDecorator {
  constructor(address) {
    this.address = address
  }

  get get_address() {
    const address = [
      this.address.address1,
      this.address.address2,
      this.address.address3,
      this.address.district === null ? '' : this.district.name,
      this.address.country === null ? '' : this.country.name,
      this.address.postalCode,
      this.address.village,
      this.address.mukim
    ]

    const info = []
    Object.entries(address).forEach(entity => {
      info.push(entity[1])
    })

    return info.join(', ')
  }

  toRequest() {
    return {
      id: this.address.id,
      address1: this.address.address1,
      address2: this.address.address2,
      address3: this.address.address3,
      countryId: this.address.countryId,
      districtId: this.address.districtId,
      postalCode: this.address.postalCode,
      mukim: this.address.mukim,
      village: this.address.village,
      requestOperationType: this.address.requestOperationType,
      isEdited: this.address.isEdited,
      addressId: this.address.addressId,
      changedDate: this.address.changedDate
    }
  }

  toStorageString() {
    return JSON.stringify({
      id: this.address.id,
      address1: this.address.address1,
      address2: this.address.address2,
      address3: this.address.address3,
      countryId: this.address.country === null ? 0 : this.address.country.id,
      districtId: this.address.district === null ? 0 : this.address.district.id,
      postalCode: this.address.postalCode,
      mukim: this.address.mukim,
      village: this.address.village,
      requestOperationType: this.address.requestOperationType,
      isEdited: this.address.isEdited,
      changedDate: this.address.changedDate
    })
  }
}
