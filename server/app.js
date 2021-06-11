const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();
const mongoose      = require('mongoose');
const config        = require('./config');
const Product       = require('./models/product');
const Order        = require('./models/order');

// setting up database
mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURL,
  { useNewUrlParser: true},
  { useUnifiedTopology: true}
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')))

// api routes
app.get('/api/products', (req, res) => {
  Product.find().then(rec => {
    if(rec) {
      res.status(200).json(rec);
    } else {
      res.status(200).json([]);
    }
  })
})

app.get('/api/orders', (req, res) => {
  Order.find()
    .populate('items')
    .exec()
    .then(rec => {
    res.status(200).json(rec);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

app.post('/api/checkout', (req, res) => {
  const newOrder = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip,
    items: req.body.items.map(item => item._id) || []
  })
  newOrder.save().then(rec => {
    res.status(200).json(rec)
  }, (err) => {
    res.status(500).json({error: 'error'})
  });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.listen(3000, () => console.log('listening on port 3000...'));
// adding data to database
// app.get('/seeddb', (req, res) => {
//   const data =
//   [
//     {
//       id:1,
//       name:'2021 polygon vander t7',
//       description: 'VANDER T bikes boast all-rounder trail geometry with moderate chainstay and wheelbase lengths combined with a relaxed head angle; these bikes feel agile in twisty trails while ensuring confidence at high speed.',
//       image: "https://www.bikesonline.com/assets/full/24680.jpg?20210317031457",
//       price: 1700,
//     },
//     {
//       id:2,
//       name:'Session 8 29 GX',
//       description: 'Session 8 is a downhill mountain bike with a robust alloy frame and high-pivot suspension design that keeps you nimble, planted, and blazing fast on even the most punishing runs.',
//       image: 'https://trek.scene7.com/is/image/TrekBicycleProducts/Session829GX_22_34624_A_Portrait?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440',
//       price: 5000
//     },
//     {
//       id:3,
//       name:'2021 cannondale Habit 5',
//       description: 'A trail bike with its priorities on point: playful agility, progressive design, and killer capability – your favorite trails have never been more fun.',
//       image: "https://www.rei.com/media/af13929b-15c7-4035-b179-07c2ce944693?size=784x588",
//       price: 2500,
//     },
//     {
//       id:4,
//       name:'Stumpjumper Alloy',
//       description: 'The Stumpjumper Alloy brings all-new suspension kinematics and progressive geometry into a full-alloy package thats both lightweight and extremely durable. Outfitted with a no-fuss SRAM SX 12-speed groupset, the Stumpjumper Alloy is your all-access pass for trail adventure 8 is a downhill mountain bike with a robust alloy frame and high-pivot suspension design that keeps you nimble, planted, and blazing fast on even the most punishing runs.',
//       image: "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2019/05/IMG_0020.jpg",
//       price: 2400
//     },
//     {
//       id:5,
//       name:'santa cruz tallboy',
//       description: 'VANDER T bikes The new 120mm Tallboy takes a leap further into what short-travel bikes really are capable of. With kick-ass lower-link VPP suspension, a streamlined design, the typical Santa Cruz refinement, and rather radical geometry, the Tallboy is back to being a genre bending folk hero. all-rounder trail geometry with moderate chainstay and wheelbase lengths combined with a relaxed head angle; these bikes feel agile in twisty trails while ensuring confidence at high speed.',
//       image: "https://www.santacruzbicycles.com/files/styles/scb_natural_1440_auto/public/hero/my21_hero_tb_ivory.jpg?itok=OO3Ozc1v://www.bikesonline.com/assets/full/24680.jpg?20210317031457",
//       price: 3100,
//     },
//     {
//       id:6,
//       name:'Orbea occam H30',
//       description: 'The Orbea Occam H30 comes with a blend of Shimano Deore components and hydraulic disc brakes. A Fox DPS Performance 140mm rear shock and a Fox 34 Float Performance fork create a reliable and trustworthy suspension system 8 is a downhill mountain bike with a robust alloy frame and high-pivot suspension design that keeps you nimble, planted, and blazing fast on even the most punishing runs.',
//       image: "https://www.orbea.com/img/products/product/zoom/L256TTCC-MY-SIDE-OCCAM_H30.jpg",
//       price: 2800
//     }
//   ];
//   data.forEach((product) => {
//     const newProduct = new Product({
//       name: product.name,
//       description: product.description,
//       image: product.image,
//       price: product.price
//     });
//     newProduct.save();
//   })
//   res.send("ok")
// })
