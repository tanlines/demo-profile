export const recipes = [
  {
    title: "Japchae",
    ingredients: [
        { amount: { value: 100, unit: "g" }, item: "thin sweet potato noodles", substitute: "rice noodles or glass noodles" },
        { amount: { value: 75, unit: "g" }, item: "beef or chicken, thinly sliced", substitute: "tofu or mushrooms for vegetarian" },
        { amount: { value: 0.5, unit: "medium" }, item: "carrots, cut into matchsticks" },
        { amount: { value: 2, unit: "" }, item: "shiitake mushrooms, sliced", substitute: "button mushrooms or oyster mushrooms" },
        { amount: { value: 1.5, unit: "" }, item: "green onions, sliced" },
        { amount: { value: 2, unit: "tbsp" }, item: "soy sauce" },
        { amount: { value: 1, unit: "tbsp" }, item: "sesame oil" },
        { amount: { value: 0.5, unit: "tbsp" }, item: "sugar" }
    ],
    instructions: [
        "Boil noodles, rinse in cold water, set aside, add sesame oil to prevent sticking",
        "Stirfry vegetables, set aside",
        "Stirfry beef/chicken, garlic, soy sauce, sesame oil and sugar until brown",
        "Add all other ingredients and mix well",
    ],
    image: "/recipes/japchae.webp"
  },
  {
    title: "Fungus Chicken",
    ingredients: [
        { amount: { value: 200, unit: "g" }, item: "chicken pieces ~3cm squares", substitute: "pork or beef pieces" },
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
  }
];
