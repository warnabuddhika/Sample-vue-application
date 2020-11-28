export const TabNavigationMixin = {
    data() {
      return {
        tabIndex: 0,
        buttons: {
          previous: false,
          next: true,
          submit: true,
          cancel: true         
        }   
      }
    },
    methods: {
       onNavigate(action) {
          debugger       
        if (action == 'next') {
            debugger
          if(this.saveDraft())
          {
            this.next()
          }
        } else if (action == 'prev') {
         // await this.saveDraft()
          this.previous()
        } else if (action == 'submit') {
    
           // this.submit()
        } else if (action == 'draft') {
         // if (this.saveDraft()) this.$router.push('/')
        } else if (action == 'cancel') {
         // this.$router.push('/')
        }
  debugger
        if (this.tabIndex == 0) {
          this.buttons.previous = false
        } else {
          this.buttons.previous = true
        }
        if (this.tabIndex == this.totalTabs - 1) {
          this.buttons.next = false
        } else {
          this.buttons.next = true
        }
  
        this.showHideSubmit(this.tabIndex > 1)
      },
      previous() {
          debugger
        this.tabIndex--
      },
      next() {
          debugger
        this.tabIndex++
      },
      showHideSubmit(status) {
          debugger
        this.showSubmit = status
      },
      async submitCorrectRegister() {
        this.$nextTick(() => {
          this.$nuxt.$loading.start()
        })
  
        let applicationId = parseInt(this.$route.params.id)
        let entityId = parseInt(localStorage.getItem("bo_entity_id"))
  
        let response = await this.$axios.post(`rocbn/api/correctregisters/${entityId}/submit`, {
          entityId: entityId,
          applicationId: applicationId
        })
  
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
  
        if (response.data.response)
        {
          //window.location.href = this.boHomeUrl
        }
  
      }
    }
  }
  