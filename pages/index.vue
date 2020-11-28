<template>
  <div>
    
    <CustomerRegistration      
      :meta-data="masterData"
      :application-mode="routePath" />    
  </div>
</template>
<script>
import CustomerRegistration from '@/components/CustomerRegistration'
export default {
  components:{
    CustomerRegistration
  }
}
</script>