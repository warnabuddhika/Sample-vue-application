<template>
  <form-group :name="getname()">
    <date-picker
      slot-scope="{ attrs, listeners }"
      v-bind="attrs"
      v-on="listeners"
      v-model="date"
      format="DD-MMM-YYYY"
      placeholder="DD-MMM-YYYY"
      use-utc="true"
      type="date"
      language="msb"
      :name="getname()"
      @change="onChange"
      @input="onInput"
      @update="onUpdate"
      @blur="onBlur"
      :disabled="disable"
    ></date-picker>
  </form-group>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import VuelidateMixin from '~/static/VuelidateMixins'

export default {
  mixins: [VuelidateMixin],
  components: { DatePicker },
  props: {
    value: {
      type: Date,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'datePicker'
    }
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    onInput(value) {
      this.$emit('input', value)
    },
    onUpdate(value) {
      this.$emit('update', value)
    },
    onBlur(event) {
      this.$emit('blur', event)
    }
  }
}
</script>
