import signUpHandler from './handlers/signUp';
import userHandler from './handlers/user';
import logoutHandler from './handlers/logout';
import statisticHandler from './handlers/statistic';
import paymentsHandler from './handlers/payments';
import createPaymentHandler from './handlers/createPayment';

const authorization = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send(401);
  }
  return next();
};

export default ({ app, userCtrl, paymentsCtrl, ws }) => {
  app.post('/sign-up', signUpHandler({ userCtrl }));
  app.get('/user', authorization, userHandler());
  app.get('/logout', authorization, logoutHandler());
  app.get('/statistic', statisticHandler());
  app.get('/payments', paymentsHandler({ paymentsCtrl }));
  app.post('/user/:userId/payments', createPaymentHandler({ paymentsCtrl, ws }));
};
