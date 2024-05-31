const Foodtruck = require("../models/FoodtruckModel");

const foodtruckRouter = require("express").Router();

foodtruckRouter.get("/all", async (req, res) => {
  try {
    const foodtrucks = await Foodtruck.find();
    res.json(foodtrucks);
  } catch (error) {
    res.json({ message: "Error retrieving foodtrucks", error });
  }
});

foodtruckRouter.post("/add", async (req, res) => {
    try {
      const newFoodtruck = new Foodtruck({
        name: req.body.name,
        foodType: req.body.foodType,
        menus: req.body.menus.map((item) => ({
          dishName: item.dishName,
          drinkName: item.drinkName,
          price: item.price
        }))
      });
      const savedFoodtruck = await newFoodtruck.save();
      res.json({ message: "Foodtruck added", savedFoodtruck });
    } catch (error) {
      res.status(500).json({ message: "Error adding foodtruck", error: error.message });
    }
  });

foodtruckRouter.get("/:id/show", async (req, res) => {
  try {
    const foodtruck = await Foodtruck.findOne({ _id: req.params.id });
    if (!foodtruck) {
      res.json({ message: "Foodtruck not found" });
    }
    res.json(foodtruck);
  } catch (error) {
    res.json({ message: "Error retrieving foodtruck", error });
  }
});

foodtruckRouter.put("/:id/update", async (req, res) => {
  try {
    const updatedFoodtruck = await Foodtruck.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!updatedFoodtruck) {
      res.json({ message: "Foodtruck not found", updatedFoodtruck });
    }
    res.json({ message: "Foodtruck updated", updatedFoodtruck });
  } catch (error) {
    res.json({ message: "Error updating foodtruck", error });
  }
});

foodtruckRouter.delete("/:id/delete", async (req, res) => {
  try {
    const deletedFoodtruck = await Foodtruck.deleteOne({ _id: req.params.id });
    if (!deletedFoodtruck) {
      res.json({ message: "Foodtruck not found" });
    }
    res.json({ message: "Foodtruck deleted", deletedFoodtruck });
  } catch (error) {
    res.json({ message: "Error deleting foodtruck", error });
  }
});

module.exports = foodtruckRouter;
