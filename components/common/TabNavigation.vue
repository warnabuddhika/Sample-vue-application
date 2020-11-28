<template>
  <div class="custom-footer">
    <div class="page-padding">
      <div class="custom-footer-page-content">
        <b-row class="custom-footer-height">
          <b-col class="text-right" align-self="center">
            <div>
              <b-button
                v-if="showPrevious"
                variant="primary"
                @click="prevHandle()"
                >Prev</b-button
              >
              <b-button
               v-if="showNext" 
               variant="primary" 
               @click="nextHandle()"
                >Next</b-button
              >              
              <b-button
                v-if="showCancel"
                variant="light"
                @click="cancelHandle()"
                >Cancel</b-button
              >
              <b-button
                v-if="showSubmit"
                variant="primary"
                @click="submitHandle()"
                >Submit</b-button
              >
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['next', 'previous', 'submit', 'cancel'],
  mounted() {},
  data() {
    return {}
  },
  computed: {
    showNext: function() {
      return this.next
    },
    showPrevious: function() {
      return this.previous
    },
    showSubmit: function() {
      return this.submit
    },
    showCancel: function() {
      return this.cancel
    }   
  },
  methods: {
    prevHandle() {
      this.$emit('clicked', 'prev')
    },
    nextHandle() {
      this.$emit('clicked', 'next')
    },
    submitHandle() {
      this.$emit('clicked', 'submit')
    },  
    cancelHandle() {
      this.$emit('clicked', 'cancel')
    }
  }
}
</script>

<style>
.custom-footer {
  position: fixed;
  bottom: 0;
  left: 84px;
  right: 0;
  height: 50px;
  border-radius: 2px 2px 0 0;
  background: #f4f4f4;
  z-index: 999;
}

.custom-footer-page-content {
  position: relative;
  max-width: 1280px;
  padding: 0 40px;
  margin: 0 auto;
  background: #fff;
  border-radius: 2px 2px 0 0;
  border-top: 2px solid #f4f4f4;
}

.custom-footer-height {
  height: 50px;
}

.custom-footer button {
  margin: 0 6px;
  padding: 0 14px;
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
/* @media only screen and (max-width: 1440px) {
  .custom-footer {
    left: 220px;
  }
} */

@media only screen and (max-width: 1280px) {
  .custom-footer {
    left: 85px;
  }

  .custom-footer-page-content {
    padding: 0 20px;
  }
}
</style>
