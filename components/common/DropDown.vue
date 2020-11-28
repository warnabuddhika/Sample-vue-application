<template>
  <form-group :name="getname()" :label="label">
    <b-form-select
      v-model="selectedOption"
      slot-scope="{ attrs }"
      v-bind="attrs"
      @change="onChange()"
      :name="getname()"
    >
      <b-form-select-option :value="null">--Select--</b-form-select-option>
      <b-form-select-option
        v-for="option in options"
        :value="option.id"
        v-bind:key="option.id"
        >{{ option.name }}</b-form-select-option
      >
    </b-form-select>
  </form-group>
</template>
<script>
import VuelidateMixin from '~/static/VuelidateMixins'
export default {
  mixins: [VuelidateMixin],
  props: {
    label: null,
    value: null,
    options: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      default: 'dropDown'
    }
  },
  data() {
    return {}
  },
  computed: {
    selectedOption: {
      get() {
        return this.value === '' ? null : this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    onChange(event) {      
      this.$emit('onChanged')
    }
  }
}
</script>
