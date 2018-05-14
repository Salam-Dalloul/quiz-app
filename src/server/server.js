const app = require('./app');

app.listen(app.get('port'), () => {
  console.log('Trivia App Is Running On Port: ', app.get('port'));
});
