var VuelidateMixin = {
    methods: {
      getname() {
          debugger
        try {
          let modelname = this.$vnode.data.model.expression.replace('.$model', '')         
          modelname = modelname.substring(
            modelname.lastIndexOf('.') + 1,
            modelname.length
          )
          return modelname
        } catch (error) {
          return ''
        }
      }
    }
  }
  
  export default VuelidateMixin
  