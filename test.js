var debug = require('debug');
debug.formatArgs = function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;
    var name = this.namespace;

    if (useColors) {
        var c = this.color;

        args[0] = '  \u001b[9' + c + 'm' + name + ' '
            + '\u001b[0m'
            + args[0] + '\u001b[3' + c + 'm'
            + ' +' + debug.humanize(this.diff) + '\u001b[0m';
    } else {
        args[0] = name + ' ' + args[0];
    }
    return args;
};

var log = debug('Application');
log('hello');