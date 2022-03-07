const moment = require('moment');

const birth = moment().format('17/09/1985', 'DD/MM/YYYY');
//const today = moment();

const res = moment(birth , 'DD/MM/YYYY').fromNow();


console.log(res);