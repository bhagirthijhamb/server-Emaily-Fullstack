const keys = require('../config/keys'); 
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  // route handler that charges the user
  app.post('/api/stripe', async (req, res) => {
    // console.log(req.body);
    if(!res.user){
      return res.status(401).send({ error: 'You must log in!' });
    }
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '$5 for 5 credits'
    })
    // console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save()

    res.send(user);
  })
}