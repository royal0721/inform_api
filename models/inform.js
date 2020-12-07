var mongoose = require('mongoose');
var now_date = new Date(Date.now());

var now_hour = now_date.getHours();
var now_minute = now_date.getMinutes();
var now_second = now_date.getSeconds();

if(now_date.getHours()<10){
  now_hour='0'+now_date.getHours();
}
if(now_date.getMinutes()<10){
  now_minute='0'+now_date.getMinutes();
}
if(now_date.getSeconds()<10){
  now_second='0'+now_date.getSeconds();
}
var now = now_date.getFullYear()+"-"+(parseInt(now_date.getMonth())+1)+"-"+('0'+parseInt(now_date.getDate()))+" "+now_hour+":"+now_minute+":"+now_second;

var InformSchema = new mongoose.Schema({
  user_name:String,
  animal_name: String,
  animal_type:String,
  sex: String,
  time:{type: Date, default: now},
  location: String
});
module.exports = mongoose.model('Inform', InformSchema);