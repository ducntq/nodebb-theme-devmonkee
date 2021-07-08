
"use strict";
var user = require.main.require('./src/user');
var Theme = module.exports;

Theme.defineWidgetAreas = async function(areas) {
	areas = areas.concat([
		{
			'name': 'MOTD',
			'template': 'home.tpl',
			'location': 'motd'
		},
		{
			'name': 'Homepage Footer',
			'template': 'home.tpl',
			'location': 'footer'
		},
		{
			'name': 'Category Sidebar',
			'template': 'category.tpl',
			'location': 'sidebar'
		},
		{
			'name': 'Topic Footer',
			'template': 'topic.tpl',
			'location': 'footer'
		}
	]);
	return areas;
};

Theme.onTopicCreate = async function(data) {
    data.topic.is_homepage = false;
    return data;
};

Theme.onGetTopicPrivSettings = async function(data) {
    var isAdmin = await user.isAdministrator(data.uid);
    data.isAdmin = isAdmin;
    return data;
};

Theme.addRoutes = async ({ router, middleware, helpers }) => {
	router.get('/topic/homepage/:topicId', middleware.ensureLoggedIn, async (req, res) => {
        if (req.loggedIn && req.user !== null && req.user.uid && typeof req.user.uid == 'number') {
            let isAdmin = await user.isAdministrator(req.user.uid);
            if (!isAdmin) return await helpers.formatApiResponse(403, res);

            return await helpers.formatApiResponse(200, res, {test: "yup"});
            
        }
        return await helpers.formatApiResponse(403, res);
	});
};
