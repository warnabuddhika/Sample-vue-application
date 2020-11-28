export const RequestOperationType = {
    ADD: 1,
    EDIT: 2,
    CEASE: 3,
    UNCEASE: 4
  }
  
  export const getRequestOperationType = index => {
    switch (index) {
      case RequestOperationType.CREATED:
        return 'Created'
      case RequestOperationType.UPDATED:
        return 'Changed'
      case RequestOperationType.CEASED:
        return 'Ceased'
      default:
        return ''
    }
  }