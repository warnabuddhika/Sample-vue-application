<template>
  <form-wrapper >
    <fieldset :disabled="isFormDisabled">
      <div class="panel-owner-telephone">
        <b-row class="custom-padding form-group">
          <b-col cols="3">
            <div class="label">Country *</div>
            <BaseInput
              v-model="data.countryCode"
              class="no-margin"
              id="countryCode"
            />
          </b-col>
          <b-col cols="9">
            <div class="label">Number *</div>
            <BaseInput
              v-model="data.phoneNumber"
              class="no-margin"
              id="phoneNumber"
            />
          </b-col>
        </b-row>
      </div>
    </fieldset>
  </form-wrapper>
</template>

<script>
import BaseInput from '@/components/common/Input'
import {
  required,
  helpers,
  telephone,
  maxLength
} from 'vuelidate/lib/validators'
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'

export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isFormDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  components: {
    BaseInput
  },
  validations: {
    data: {
      countryCode: {
        required,
        onlynumbers(value) {
          const regex = /^(\+?\d{1,3}|\d{1,4})$/
          const regexExp = new RegExp(regex)

          if (regexExp.test(value) !== true) return false
          else return true
        },
        maxLength: maxLength(4)
      },
      phoneNumber: {
        required,
        onlynumbers(value) {
          const regex = /^[0-9]*$/
          const regexExp = new RegExp(regex)
          if (regexExp.test(value) !== true) return false
          else return true
        },
        bruneiTpNumber(value) {
          if (value != null) {
            if (
              this.data.countryCode == '+673' ||
              this.data.countryCode == '673'
            ) {
              return value.length == 7
            } else {
              return true
            }
          } else {
            return true
          }
        },
        internationalTpNumber(value) {
          if (value != null) {
            if (
              this.data.countryCode == '+673' ||
              this.data.countryCode == '673'
            ) {
              return true
            } else {
              return value.length <= 15
            }
          } else {
            return true
          }
        }
      }
    }
  },
  methods: {
    isValid() {
      this.$v.$touch()
      let status = !this.$v.$invalid
      this.$emit('valid', status)
      return !this.$v.$invalid
    },
    clearValidations() {
      this.$v.$reset()
    }
  }
}
</script>

<style>
.panel-owner-telephone {
  position: relative;
}
</style>
