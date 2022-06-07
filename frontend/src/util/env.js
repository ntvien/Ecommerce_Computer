const localHost = "http://localhost:8082";
const remoteHost = "http://tudaobku.ddns.net";
const isLocalServer = process.env["SERVER"] === 'local';

const env = {
    HOST:localHost,
};
export default env;