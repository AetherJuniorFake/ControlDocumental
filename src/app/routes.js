module.exports = (server, passport)  => {

    server.get('/', (req, res) => {
        res.render('index');
    });
};
