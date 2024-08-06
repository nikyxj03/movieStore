import Order from '../model/orderModel.js'
import Movie from '../model/movieModel.js'

function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
  
   
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
    const totalPrice = (
      itemsPrice +
      parseFloat(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice: itemsPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  }

  const createOrder = async (req, res) => {
    try {
      const { orderItems } = req.body;
  
      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
      }
  
      const itemsFromDB = await Movie.find({
        _id: { $in: orderItems.map((x) => x._id) },
      });
  
      const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
          (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );
  
        if (!matchingItemFromDB) {
          res.status(404);
          throw new Error(`Movie not found: ${itemFromClient._id}`);
        }
  
        return {
          ...itemFromClient,
          movie: itemFromClient._id,
          price: matchingItemFromDB.price,
          _id: undefined,
        };
      });
      const { itemsPrice, taxPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {createOrder, findOrderById}