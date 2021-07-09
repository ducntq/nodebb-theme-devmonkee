
"use strict";
const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
var user = require.main.require('./src/user');
var db = require.main.require('./src/database');
var topic = require.main.require('./src/topics/index.js');
var Theme = module.exports;

// this is from original starter theme, I'm leaving as is
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

// register route for custom homepage
Theme.registerPage = async (params) => {
    const { router, middleware } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');
    routeHelpers.setupPageRoute(router, '/devmonkee', middleware, [middleware.buildHeader], (req, res, next) => {
		//res.sendStatus(200);
        res.render('homepage');
	});
};

// inject data ino /devmonkee
Theme.insertData = async (data) => {
    if (data.req.route && data.req.route.path === '/devmonkee') {
        const query = { _key: /topic:[0-9]*/, is_homepage: { $gt: 0} };
        var topics = await db.client.collection('objects').find(query).sort({is_homepage: -1}).limit(20).toArray();
        data.templateData.topics = topics;
    }

    return data;
};

// inject is_homepage field to a topic
Theme.onTopicCreate = async function(data) {
    data.topic.is_homepage = false;
    return data;
};

// inject isAdmin field to a topic priv api
Theme.onGetTopicPrivSettings = async function(data) {
    var isAdmin = await user.isAdministrator(data.uid);
    data.isAdmin = isAdmin;
    return data;
};

// register custom api routes
Theme.addRoutes = async ({ router, middleware, helpers }) => {
    // middleware to ensure caller is an admin
    const ensureAdmin = async (req, res, next) => {
        if (req.loggedIn && req.user !== null && req.user.uid && typeof req.user.uid == 'number') {
            let isAdmin = await user.isAdministrator(req.user.uid);
            if (isAdmin) next();
            else return helpers.notAllowed(req, res);
        } else {
            return helpers.notAllowed(req, res);
        }
    };

    // api route to stick
    router.post('/homepage/sticky/:topicId', ensureAdmin, async (req, res) => {
        var topicId = Number.parseInt(req.params.topicId);
        if (Number.isNaN(topicId)) return await helpers.formatApiResponse(400, res);
        let now = Date.now();
        await topic.setTopicField(topicId, 'is_homepage', now);
        return await helpers.formatApiResponse(200, res, {timestamp: now, topicId: topicId});
    });

    // api route to unstick
    router.post('/homepage/unsticky/:topicId', ensureAdmin, async (req, res) => {
        var topicId = Number.parseInt(req.params.topicId);
        if (Number.isNaN(topicId)) return await helpers.formatApiResponse(400, res);
        let now = Date.now();
        await topic.setTopicField(topicId, 'is_homepage', false);
        return await helpers.formatApiResponse(200, res, {timestamp: now, topicId: topicId});
    });
};
