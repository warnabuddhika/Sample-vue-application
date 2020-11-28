import moment from 'moment';
const dateformat = 'DD-MMM-YYYY';
const timeformat = 'DD-MMM-YYYY HH:mm:ss';
const monthyearformat = 'MMMM YYYY'
const yearonlyformat = 'YYYY'

export const formatDate = (date) => {
  var m = moment(new Date(date), dateformat);
  var formatted = m.locale("en").format(dateformat);
  return formatted;
}

export const formatDateTime = (date) => {
  var m = moment(new Date(date), timeformat);
  var formatted = m.locale("en").format(timeformat);
  return formatted;
}

export const isCurrentDate = (date) => {
  let current = format(new Date());
  let compareto = format(date);
  return moment(current).isSame(compareto, 'day');
}

export const isPastCurrentDate = (date) => {
  let current = format(new Date());
  let compareto = format(date);
  return moment(current).isAfter(compareto, 'day');
}

export const formatDateToMonthYear = (date) => {
  var m = moment(new Date(date), monthyearformat);
  var formatted = m.locale("en").format(monthyearformat);
  return formatted;
}

export const returnOnlyYear = (date) => {
  var m = moment(new Date(date), yearonlyformat);
  var formatted = m.locale("en").format(yearonlyformat);
  return formatted;
}


export  function UTCDate(date) {
  let momentDate = null
  if (typeof date === 'string' && date != '')
  {
    momentDate = moment(date)
  }
  else if(date instanceof Date){
    momentDate = moment(date)
  }

  if(momentDate != null && momentDate.isValid()) {
    return momentDate.format(moment.HTML5_FMT.DATE)
  }
  else {
    return null
  }
}

function format(date) {
  const format = 'YYYY-MM-DD';
  var m = moment(new Date(date), format);
  var formatted = m.locale("en").format(format);
  return formatted;
}
