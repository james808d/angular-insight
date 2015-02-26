module.exports = function groupList() {
	var GroupList = {
		get: function (id) {
			return _.where(GroupList.groups, { _id: id });
		},
		removeGroup: function (group) {
			var index = _.findIndex(GroupList.gropus, { _id: group._id });
			GroupList.groups.splice(index, 1);
		},
		groups: [{ "_id" : { "$oid" : "5435c401c0e025c1a09ed644" }, "name" : "Alpha Group", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "avatar" : "", "users" : [ "5434618b50255715f1385b52", "5434604a50255715f1385b50", "543461bb50255715f1385b53", "54345fde50255715f1385b4e", "5434600d50255715f1385b4f", "543459c450255715f1385b4a", "543459c450255715f1385b4a", "5434604a50255715f1385b50", "543459c450255715f1385b4a", "54345c2050255715f1385b4d", "54345c2050255715f1385b4d", "5434618b50255715f1385b52", "5434604a50255715f1385b50" ], "roles" : [] },
			{ "_id" : { "$oid" : "5435c4aac0e025c1a09ed645" }, "name" : "Beta Group", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "avatar" : "", "users" : [ "542c08201e236a630baee8a6", "54345c2050255715f1385b4d", "5434600d50255715f1385b4f", "5434604a50255715f1385b50", "5434618b50255715f1385b52", "543461bb50255715f1385b53", "542c08201e236a630baee8a6", "5434618b50255715f1385b52", "5434618b50255715f1385b52", "5434600d50255715f1385b4f", "543461bb50255715f1385b53", "5434618b50255715f1385b52", "5434618b50255715f1385b52", "5434604a50255715f1385b50", "54345ac850255715f1385b4c" ], "roles" : [] },
			{ "_id" : { "$oid" : "5435c4c5c0e025c1a09ed646" }, "name" : "System Admins", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "avatar" : "", "users" : [ "5434604a50255715f1385b50", "543459c450255715f1385b4a", "5434604a50255715f1385b50", "542c08201e236a630baee8a6", "543459c450255715f1385b4a" ], "roles" : [], "description" : "" },
			{ "_id" : { "$oid" : "54caaac5fe1af1af2e50f968" }, "name" : "Sales Engineers", "status" : "Ready", "active" : true, "type" : "System", "__v" : 0, "avatar" : "", "users" : [], "roles" : [], "description" : "" },
			{ "_id" : { "$oid" : "54caab24fe1af1af2e50f969" }, "name" : "Media Admins", "status" : "Ready", "active" : true, "type" : "System", "__v" : 0, "description" : "", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab37fe1af1af2e50f96a" }, "name" : "Engineering", "status" : "Ready", "active" : true, "type" : "System", "__v" : 0, "description" : "", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab3bfe1af1af2e50f96b" }, "name" : "Sales", "status" : "Ready", "active" : true, "type" : "System", "__v" : 0, "description" : "", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab3ffe1af1af2e50f96c" }, "name" : "All Users", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "description" : "Everyone in the system", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab42fe1af1af2e50f96d" }, "name" : "Project Management", "status" : "Ready", "active" : true, "type" : "System", "__v" : 0, "description" : "", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab49fe1af1af2e50f96e" }, "name" : "Information Technology", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "description" : "Computer people", "avatar" : "", "users" : [], "roles" : [] },
			{ "_id" : { "$oid" : "54caab4dfe1af1af2e50f96f" }, "name" : "The Executives", "status" : "New", "active" : true, "type" : "System", "__v" : 0, "avatar" : "", "users" : [], "roles" : [], "description" : "People with nice titles" }]
	};

	return GroupList;
};
