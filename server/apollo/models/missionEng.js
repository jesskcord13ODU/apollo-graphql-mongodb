var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var MissionEng = new Schema ({
    Name: String,
	Role: [],
	Permissions:  [],
	Tags: [],
	AssociatedMissions:  [],
	Notifications: [],
	Alerts: []
})

var MissionEng = mongoose.model('MissionEng', MissionEng);

module.exports = {
	MissionEng
};