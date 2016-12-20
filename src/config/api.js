import VueResource from 'vue-resource'

Vue.use(VueResource)

let API = {};

let baseUrl = 'http://example.fosun.com/example';

let API_CONFIG = {
    login: {
        url: '/login'
    },
}

_.forEach(API_CONFIG, function(settings, name) {
    API[name] = function(requestData) {
        let url = baseUrl + settings.url,
            params = {};

        if (requestData) {
            params = requestData;
        }

        return Vue.http.post(url, params, { emulateJSON: true })
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err.data;
            })
    }
});

export default API
