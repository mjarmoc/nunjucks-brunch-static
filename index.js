const nunjucks = require('nunjucks');
var env = nunjucks.configure('app/templates', {
    stripBlocks: true,
    trimBlocks: true,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
    }
});

function NunjucksBrunchStatic(){};

NunjucksBrunchStatic.prototype = {
    transformPath: (filename) => filename.replace(/\.njk$/, '.html'),
    handles: /\.njk$/,
    compile: (data,filename,options,callback) => {
        precompile = nunjucks.compile(data,env);
        template = precompile.render();
        return callback(null, template);
    }
};

module.exports = function(config) {
  return new NunjucksBrunchStatic(config);
};
