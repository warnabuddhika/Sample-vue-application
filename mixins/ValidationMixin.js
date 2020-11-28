export const ValidationMixin = {
    data() {
        return {
          errorMessage:[],
          summaryErrorMessage:[]
        }
      },
      methods: {
        addError(id,message){
            if(this.errorMessage.findIndex(e=>e.id == id) == -1){
                this.errorMessage.push({id:id,message: message})
            }
            else {
                let message = this.errorMessage.find(e=>e.id == id)
                message.message = message
            }
        },
        clearAll() {
            errorMessage:[]
        },
        deleteMessage(id) {
            let elementIndex = this.errorMessage.findIndex(e=>e.id == id)
            this.errorMessage = this.errorMessage.splice(elementIndex,1)
        },
        addSummaryError(id,message){
            if(this.summaryErrorMessage.findIndex(e=>e.id == id) == -1){
                this.summaryErrorMessage.push({id:id,message: message})
            }
            else {
                let message = this.summaryErrorMessage.find(e=>e.id == id)
                message.message = message
            }
        },
        clearSummaryAll() {
            this.summaryErrorMessage=[]
        },
        deleteSummaryMessage(id) {
            let elementIndex = this.summaryErrorMessage.findIndex(e=>e.id == id)
            this.summaryErrorMessage = this.summaryErrorMessage.splice(elementIndex,1)
        },
        validateAddresses() {
            
        }
      }
}