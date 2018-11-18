const { json, send } = require('micro');
const { get, post, router } = require('microrouter');
const microCors = require('micro-cors');
const request = require('request-promise');
const tough = require('tough-cookie');
const Cookie = tough.Cookie;
const cors = microCors({ origin: "http://localhost:3000" })

const endpoint = "https://judgeapi.u-aizu.ac.jp";

const postClient = (uri, data) => {
    const opts = {
        method: 'POST',
        uri: uri,
        json: true,
        body: data,
        resolveWithFullResponse: true
    };

    return request(opts);
};

const session = async (loginInfo) => {
    const s = await postClient(`${endpoint}/session`, loginInfo);
    const cookie = Cookie.parse(s.headers['set-cookie'][0]);
    const jar = request.jar();
    jar.setCookie(cookie, endpoint);
    return jar;
};

const login = async (req, res) => {
    try {
        const loginInfo = await json(req);
        const s = await postClient(`${endpoint}/session`, loginInfo);
        const cookie = Cookie.parse(s.headers['set-cookie'][0]);
        res.setHeader('set-cookie', cookie.toString());
        send(res, 200, s.body);
    } catch (err) {
        console.log(err);
        send(res, err.statusCode, err);
    }
};

const findAllCoursesPage = async (req, res) => {
    try {
        const cookie = Cookie.parse(req.headers.cookie);
        const jar = request.jar();
        jar.setCookie(cookie, endpoint);
        const result = await request({
            uri: `${endpoint}/courses`,
            qs: { lang: "jp" },
            jar: jar,
            json: true
        });
        res.setHeader('set-cookie', cookie.toString());
        send(res, 200, result);
    } catch (err) {
        console.log(err);
        send(res, err.statusCode, err);
    }
};

const findByCourseIdPage = async (req, res) => {
    try {
        const cookie = Cookie.parse(req.headers.cookie);
        const jar = request.jar();
        jar.setCookie(cookie, endpoint);
        const result = await request({
            uri: `${endpoint}/courses/${req.params.id}`,
            qs: { lang: "jp" },
            jar: jar,
            json: true
        });
        res.setHeader('set-cookie', cookie.toString());
        send(res, 200, result);
    } catch (err) {
        console.log(err);
        send(res, err.statusCode, err);
    }
};

module.exports = cors(router(
    get('/', () => "running server"),
    post('/login', login),
    get('/courses', findAllCoursesPage),
    get('/courses/:id', findByCourseIdPage)
));