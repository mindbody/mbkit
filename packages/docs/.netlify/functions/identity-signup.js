exports.handler = ({ body }, _, callback) => {
    const { user } = JSON.parse(body);
    const { email } = user;
    console.log(`${email} signing up`);
    let res = ``;
    let statusCode = 401;
    if (email.includes('@mindbodyonline.com')) {
        console.log(`Whitelisting`);
        statusCode = 200;
    } else {
        console.log(`Blocking`);
    }
    callback(null, {
        statusCode,
        body: res,
    });
};
