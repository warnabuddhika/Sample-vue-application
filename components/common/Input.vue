<template>
  <form-group :name="getname()" class="no-margin">
    <b-form-input
      slot-scope="{ attrs, listeners }"
      v-bind="attrs"
      v-on="listeners"
      v-model="name"
      :readonly="false"
      :name="name"
      @change="onChange"
      @input="onInput"
      @update="onUpdate"
      @blur="onBlur"
    />  
  </form-group>
</template>

<script>
import VuelidateMixin from '~/static/VuelidateMixins'
export default {
  mixins: [VuelidateMixin],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    
    name: {
    
      get() {
          debugger
        return this.value
      },
      set(value) {
          debugger
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
