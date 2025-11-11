/**
 * Recipe data for the demo site
 * 
 * This file contains an array of recipe objects with the following structure:
 * - title: Recipe name
 * - ingredients: Array of ingredient objects with amount (value, unit), item name, and optional substitute
 * - instructions: Array of step-by-step cooking instructions
 * - image: Path to the recipe image file
 * 
 * Note: All ingredient amounts are portioned for 1 person
 */
export const recipes = [
  {
    title: "Japchae",
    ingredients: [
        { amount: { value: 100, unit: "g" }, item: "thin sweet potato noodles", substitute: "rice noodles or glass noodles" },
        { amount: { value: 75, unit: "g" }, item: "beef", substitute: "chicken, tofu or mushrooms for vegetarian" },
        { amount: { value: 0.5, unit: "medium" }, item: "carrot matchsticks" },
        { amount: { value: 1.5, unit: "" }, item: "shiitake mushrooms", substitute: "button mushrooms or oyster mushrooms" },
        { amount: { value: 25, unit: "g" }, item: "baby spinach" },
        { amount: { value: 0.25, unit: "" }, item: "onion" },
        { amount: { value: 0.5, unit: "" }, item: "red capsicum" },
        { amount: { value: 5, unit: "g" }, item: "sesame seeds" },
        { amount: { value: 2, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 1, unit: "tbsp" }, item: "sesame oil" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "oyster sauce" },
    ],
    instructions: [
        "Soak mushrooms in warm water until soft, remove stems and slice",
        "Slice carrots into matchsticks, slice green onions, capsicum",
        "Boil noodles, rinse in cold water, set aside, cut into ~15cm lengths, add sesame oil to prevent sticking",
        "Stirfry vegetables, set aside",
        "Stirfry beef, garlic, soy sauce, sesame oil and sugar until brown",
        "Add vegetables, noodles then spinach and mix well",
    ],
    image: "/recipes/japchae.webp"
  },
  {
    title: "Fungus Chicken",
    ingredients: [
        { amount: { value: 200, unit: "g" }, item: "chicken", substitute: "pork or beef pieces" },
        { amount: { value: 12.5, unit: "g" }, item: "dried wood ear"},
        { amount: { value: 12.5, unit: "g" }, item: "dried shiitake mushrooms" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "mushroom flavoured soy sauce" }
    ],
    instructions: [
      "Soak wood ear/mushrooms in mild warm water until soft",
      "Rinse 3 times while rubbing them",
      "Soak overnight, don't pour out the water",
      "Sauté chicken and garlic until golden in large pot",
      "Pour wood ear/mushrooms into pot",
      "Add soy sauce to taste",
    ],
    image: "/recipes/funguschicken.webp"
  },
  {
    title: "Warabi mochi",
    ingredients: [
        { amount: { value: 25, unit: "g" }, item: "tapioca starch" },
        { amount: { value: 125, unit: "ml" }, item: "water" },
        { amount: { value: 15, unit: "g" }, item: "sugar" },
        { amount: { value: 10, unit: "g" }, item: "kinako (roasted soybean flour)" , substitute: "matcha powder"},
    ],
    instructions: [
        "Mix tapioca starch, water and sugar in a pot over medium heat",
        "Cook over medium heat until thickened",
        "Pour into a mold lined with baking paper and cool",
        "Cut into squares and serve",
    ],
    image: "/recipes/warabimochi.webp"
  },
  {
    title: "Almond cookies",
    ingredients: [
        { amount: { value: 0.75, unit: "cup" }, item: "plain flour" },
        { amount: { value: 0.25, unit: "cup" }, item: "olive oil" },
        { amount: { value: 0.25, unit: "cup" }, item: "icing sugar" },
        { amount: { value: 25, unit: "g" }, item: "almond meal" },
        { amount: { value: 0.25, unit: "" }, item: "egg" },
        { amount: { value: 5, unit: "g" }, item: "almond flakes" },
    ],
    instructions: [
        "Mix flour, almond meal, icing sugar and oil in a bowl",
        "Roll into small balls",
        "Add almond flakes on top of each ball",
        "Brush with whisked egg",
        "Bake at 150°C for 15-20 minutes",
    ],
    image: "/recipes/almondcookies.webp"
  },
  {
    title: "Kung Pao Chicken",
    ingredients: [
        { amount: { value: 100, unit: "g" }, item: "chicken breast, cut into small cubes" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "cornstarch" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "Shaoxing wine" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "vegetable oil" },
        { amount: { value: 2, unit: "" }, item: "dried red chilies" },
        { amount: { value: 15, unit: "g" }, item: "roasted peanuts" },
        { amount: { value: 1, unit: "cloves" }, item: "garlic, sliced" },
        { amount: { value: 0.25, unit: "inch" }, item: "ginger, sliced" },
        { amount: { value: 0.5, unit: "" }, item: "scallions, cut into 1-inch pieces" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "Chinese black vinegar" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.25, unit: "tsp" }, item: "dark soy sauce" },
        { amount: { value: 0.25, unit: "tsp" }, item: "sugar" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "water" },
        { amount: { value: 0.25, unit: "tsp" }, item: "cornstarch" }
    ],
    instructions: [
        "Marinate chicken with cornstarch, soy sauce, Shaoxing wine, and oil for 30 minutes",
        "Mix all sauce ingredients in a small bowl and set aside",
        "Heat wok with 1 tbsp oil and stir-fry chicken until 70% cooked, then remove",
        "Clean wok and heat remaining 2 tbsp oil until hot",
        "Add ginger and garlic, stir-fry briefly, then add dried red chilies",
        "Stir-fry chilies until aromatic, then add chicken back",
        "Add roasted peanuts and stir-fry briefly",
        "Pour in sauce and stir until chicken is well coated",
        "Add scallions and mix thoroughly",
        "Serve immediately with steamed rice"
    ],
    image: "/recipes/kungpaochicken.webp"
  },
  {
    title: "General Tso's Chicken",
    ingredients: [
        { amount: { value: 140, unit: "g" }, item: "boneless skinless chicken breast, cut into bite-sized pieces" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "Shaoxing wine", substitute: "dry sherry" },
        { amount: { value: 1, unit: "pinch" }, item: "salt" },
        { amount: { value: 0.33, unit: "cup" }, item: "cornstarch" },
        { amount: { value: 0.75, unit: "tbsp" }, item: "oil" },
        { amount: { value: 1.5, unit: "slices" }, item: "ginger, peeled and finely minced" },
        { amount: { value: 0.5, unit: "clove" }, item: "garlic, finely minced" },
        { amount: { value: 2, unit: "" }, item: "dried red chilies, rinsed and seeded" },
        { amount: { value: 1, unit: "stalk" }, item: "scallion, white part only, cut into 1-inch lengths" },
        { amount: { value: 1.25, unit: "tbsp" }, item: "Chinese rice vinegar" },
        { amount: { value: 1.25, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "dark soy sauce" },
        { amount: { value: 0.25, unit: "tsp" }, item: "Hoisin sauce" },
        { amount: { value: 0.125, unit: "cup" }, item: "water" },
        { amount: { value: 1.25, unit: "tbsp" }, item: "sugar" },
        { amount: { value: 0.25, unit: "tbsp" }, item: "Shaoxing wine" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "cornstarch" }
    ],
    instructions: [
        "Marinate the chicken with Shaoxing wine and salt for 15 minutes",
        "Mix all sauce ingredients in a small bowl and set aside",
        "Coat the chicken generously with cornstarch",
        "Heat oil for deep-frying and fry chicken until light brown",
        "Remove chicken and drain excess oil on paper towels",
        "Heat wok with oil and stir-fry ginger, garlic, and dried chilies until aromatic",
        "Pour sauce into wok and cook until it boils and thickens",
        "Add chicken and stir to combine well with sauce",
        "Add scallions and stir a few times, then serve immediately"
    ],
    image: "/recipes/generaltsos.webp"
  },
  {
    title: "Bulgogi",
    ingredients: [
        { amount: { value: 200, unit: "g" }, item: "pork belly, thinly sliced", substitute: "beef or chicken" },
        { amount: { value: 1, unit: "tbsp" }, item: "gochujang (Korean red chili paste)" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "gochugaru (Korean red chili pepper flakes)" },
        { amount: { value: 1, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "sugar" },
        { amount: { value: 0.5, unit: "medium" }, item: "onion, sliced" },
        { amount: { value: 1, unit: "stalk" }, item: "scallions, chopped" },
        { amount: { value: 1, unit: "clove" }, item: "garlic, minced" },
        { amount: { value: 0.5, unit: "tsp" }, item: "ginger, minced" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "sesame oil" },
        { amount: { value: 1, unit: "tbsp" }, item: "cooking oil" }
    ],
    instructions: [
        "Combine gochujang, gochugaru, soy sauce, sugar, garlic, ginger, and sesame oil to create marinade",
        "Marinate pork slices with the sauce, along with sliced onions and scallions, for at least 1 hour",
        "Heat cooking oil in a pan or grill",
        "Cook marinated pork until fully cooked and slightly caramelized",
        "Serve immediately with steamed rice and lettuce leaves for wrapping"
    ],
    image: "/recipes/bulgogi.webp"
  },
  {
    title: "Char Kuey Teow",
    ingredients: [
        { amount: { value: 100, unit: "g" }, item: "flat rice noodles" },
        { amount: { value: 50, unit: "g" }, item: "shrimp, peeled and deveined" },
        { amount: { value: 1, unit: "" }, item: "Chinese lap cheong (sausage), sliced" },
        { amount: { value: 1, unit: "" }, item: "egg" },
        { amount: { value: 50, unit: "g" }, item: "bean sprouts" },
        { amount: { value: 1, unit: "stalk" }, item: "chives, chopped" },
        { amount: { value: 1, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "dark soy sauce" },
        { amount: { value: 1, unit: "clove" }, item: "garlic, minced" },
        { amount: { value: 2, unit: "tbsp" }, item: "cooking oil" }
    ],
    instructions: [
        "Soak rice noodles in warm water until soft, then drain",
        "Heat oil in a wok and sauté garlic until fragrant",
        "Add shrimp and Chinese sausage, stir-fry until cooked",
        "Push ingredients to the side and crack egg into wok, scramble lightly",
        "Add noodles, soy sauce, and dark soy sauce, stir-fry to combine",
        "Add bean sprouts and chives, stir-fry briefly",
        "Serve immediately while hot"
    ],
    image: "/recipes/charkueyteow.webp"
  },
  {
    title: "Green Curry Shrimp",
    ingredients: [
        { amount: { value: 150, unit: "g" }, item: "shrimp, peeled and deveined" },
        { amount: { value: 1, unit: "tbsp" }, item: "green curry paste" },
        { amount: { value: 0.5, unit: "cup" }, item: "coconut milk" },
        { amount: { value: 0.5, unit: "medium" }, item: "zucchini, sliced" },
        { amount: { value: 0.25, unit: "" }, item: "red bell pepper, sliced" },
        { amount: { value: 1, unit: "tbsp" }, item: "fish sauce" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "palm sugar", substitute: "brown sugar" },
        { amount: { value: 1, unit: "tbsp" }, item: "cilantro, chopped" },
        { amount: { value: 1, unit: "tbsp" }, item: "cooking oil" },
        { amount: { value: 0.25, unit: "cup" }, item: "water" }
    ],
    instructions: [
        "Heat oil in a pot and sauté green curry paste briefly until fragrant",
        "Add water and bring to a boil",
        "Add shrimp and cook until done (about 2-3 minutes)",
        "Add coconut milk, fish sauce, palm sugar, zucchini, and red bell pepper",
        "Cook for 1 minute until vegetables are tender",
        "Stir in chopped cilantro and serve immediately with steamed rice"
    ],
    image: "/recipes/greencurryshrimp.webp"
  },
  {
    title: "Ginger and Black Fungus Chicken",
    ingredients: [
        { amount: { value: 150, unit: "g" }, item: "chicken breast, sliced" },
        { amount: { value: 1, unit: "tbsp" }, item: "ginger, julienned" },
        { amount: { value: 25, unit: "g" }, item: "black fungus (wood ear mushrooms), soaked and sliced" },
        { amount: { value: 0.25, unit: "medium" }, item: "red onion, sliced" },
        { amount: { value: 1, unit: "tbsp" }, item: "fermented yellow bean sauce" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "sweet soy sauce (kecap manis)" },
        { amount: { value: 0.5, unit: "tsp" }, item: "sugar" },
        { amount: { value: 1, unit: "stalk" }, item: "scallions, cut into 2-inch lengths" },
        { amount: { value: 2, unit: "tbsp" }, item: "cooking oil" },
        { amount: { value: 0.25, unit: "cup" }, item: "water" }
    ],
    instructions: [
        "Soak black fungus in warm water until soft, then slice",
        "Heat oil in a wok and sauté ginger until aromatic",
        "Add red onion and black fungus, stir-fry briefly",
        "Add fermented yellow bean sauce and chicken, stir-fry until chicken turns white",
        "Add sweet soy sauce and sugar, stir well",
        "Add water and scallions, stir quickly and serve hot"
    ],
    image: "/recipes/gingerfunguschicken.webp"
  },
  {
    title: "Sesame Oil Chicken",
    ingredients: [
        { amount: { value: 200, unit: "g" }, item: "chicken, cut into pieces" },
        { amount: { value: 1, unit: "tbsp" }, item: "ginger, sliced" },
        { amount: { value: 2, unit: "tbsp" }, item: "sesame oil" },
        { amount: { value: 1, unit: "tbsp" }, item: "rice wine", substitute: "Shaoxing wine" },
        { amount: { value: 1, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 0.5, unit: "tsp" }, item: "sugar" },
        { amount: { value: 0.5, unit: "cup" }, item: "water" }
    ],
    instructions: [
        "Heat sesame oil in a wok and sauté ginger until fragrant",
        "Add chicken pieces and stir-fry until they turn white",
        "Add rice wine, soy sauce, sugar, and water",
        "Bring to a boil, then lower heat and simmer until chicken is cooked through",
        "Serve hot with steamed rice"
    ],
    image: "/recipes/sesameoilchicken.webp"
  }
];
