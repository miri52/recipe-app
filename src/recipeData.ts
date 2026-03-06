// Legacy backup — no longer used by the app. Keep for reference.
import bakedTofu from "./images/bakedTofu.jpg";
import bananaBread from "./images/bananaBread.jpg";
import quinoaSalad from "./images/quinoaSalad.jpg";
import chickenFajita from "./images/chickenFajita.jpg";

interface LegacyRecipe {
  id: string;
  name: string;
  src: string;
  hashtag: string;
}

const recipes: LegacyRecipe[] = [
  {
    id: "1",
    name: "Baked Tofu with Honey-sesame Glaze",
    src: bakedTofu,
    hashtag: "#vegetarian",
  },
  {
    id: "2",
    name: "Banana Bread",
    src: bananaBread,
    hashtag: "#dessert",
  },
  {
    id: "3",
    name: "Quinoa Salad",
    src: quinoaSalad,
    hashtag: "#vegetarian",
  },
  {
    id: "4",
    name: "One-pan Chicken Fajita",
    src: chickenFajita,
    hashtag: "#chicken",
  },
];

export default recipes;
