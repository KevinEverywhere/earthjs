export default function() {
    /*eslint no-console: 0 */
    var _ = {data: []};
    var args = arguments;

    return {
        name: 'baseCsv',
        urls: Array.prototype.slice.call(args),
        onReady: function onReady(err, csv) {
            _.me.data(csv);
        },
        onInit: function onInit(me) {
            _.me = me;
        },
        data: function data(data$1) {
            if (data$1) {
                _.data = data$1;
            } else {
                return _.data;
            }
        },
        message: function message(fn) {
            _.data = _.data.map(fn);
        },
        allData: function allData(all) {
            if (all) {
                _.data = all.data;
            } else {
                var data = _.data;
                return {data: data};
            }
        },
        arrToJson: function arrToJson(k, v) {
            var json = {};
            _.data.forEach(function (x) { return json[x[k]] = x[v]; });
            return json;
        }
    }
}
