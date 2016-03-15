var views = require('co-views');
// setup views mapping .html
// to the swig template engine

module.exports = views(global.basePath + '/admin/views', {
    map: { html: 'swig' }
});