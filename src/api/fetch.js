import dummyData from '../api/dummydata.js';
const validProps = {
    page: true,
    limit: true
}
const baseUrl = 'https://sandbox.glofox.com/2.0/members';
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzYW5kYm94Lmdsb2ZveC5jb20iLCJleHAiOjE1MTExOTIyNzYsImlhdCI6MTUwODUxMzg3NiwiaXNzIjoic2FuZGJveC5nbG9mb3guY29tIiwibmJmIjoxNTA4NTEzODc2LCJ1c2VyIjp7Il9pZCI6IjU5MTFhYzlhMTYzZDk2M2EwMjAwMDAwMCIsIm5hbWVzcGFjZSI6InRoZXdvZGZhY3RvcnkiLCJicmFuY2hfaWQiOiI1NmNkYzAxNTVjNDZiYjE3NmJiOTI1ODIiLCJmaXJzdF9uYW1lIjoiQ3VjdW1iZXIiLCJsYXN0X25hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlzU3VwZXJBZG1pbiI6ZmFsc2V9fQ.cVEXvLx0xhkXHLn_XbQj-8iU3bG3Vsn4vZbtQlD60PE'
}

function pickCommonKeys(o, state) {
    return Object.assign({}, ...o.map(prop => {
        if (state[prop]) {
            return {
                [prop]: state[prop]
            }
        }
    }));
}

function jsonToGetUrl(o) {
    return Object.keys(o).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(o[key]);
    }).join('&');
}

function createOptionsFromSearchParams(options, searchParams) {
    let resultArray = [];
    for (var i = 0; i < options.length; i++) {
        resultArray.push({
            [options[i]]: searchParams
        });
    }
    return resultArray;
}
function stringHasNoSpaces(searchParam) {
    return (searchParam.indexOf(' ') === -1);
}
function isEmail(searchParam) {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    return emailRegex.test(searchParam)
}
// Multiple fetch in case first urls return no results
function fetchFromMultipleUrl(urls, index) {
    return fetch(urls[index], {
            headers: headers
        })
        .then((response) => response.json())
        .then((data) => {
            if (urls.length - 1 === index) return data;
            index++;
            return (data.data.length === 0) ? fetchFromMultipleUrl(urls, index) : data;
        });
}

class fetchApi {
    constructor() {
        this.state = {};
    }
    // Constructs multiple urls based on searchParam combinations
    constructOptions(url) {
        let searchParam = this.state.searchParam;
        let options = [];
        let results = []
        if (isEmail(searchParam)) {
            options = [{
                'email': searchParam.toLowerCase()
            }];
        } else {
            options = (stringHasNoSpaces(searchParam)) ? createOptionsFromSearchParams(['last_name', 'first_name'], searchParam) : createOptionsFromSearchParams(['name', 'last_name', 'first_name'], searchParam);
        }
        // Generate Urls from searchParam's combinations
        for (var i = 0; i < options.length; i++) {
            results.push(url + '&' + jsonToGetUrl(options[i]));
        }
        return results;
    }
    constructMainUrl() {
        const parsedObj = pickCommonKeys(Object.keys(validProps), this.state);
        return baseUrl + '?' + jsonToGetUrl(parsedObj);
    }
    setState(state) {
        this.state = state;
    }
    // Main function
    collectData(state, callback) {
        this.state = state;
        const url = this.constructMainUrl();
        const urls = (this.state.searchParam && this.state.searchParam !== '') ? this.constructOptions(url) : [url];

        fetchFromMultipleUrl(urls, 0).then(function (data) {
                callback(data);
            })
            .catch((error) => {
                callback({
                    data: []
                });
            });
    }

}

module.exports = new fetchApi();