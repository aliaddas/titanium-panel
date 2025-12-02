// Sample product data
export const products = [
  {
    ID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
    name: "Wellness Tincture",
    description:
      "Our premium wellness tincture is crafted with organic ingredients to promote balance and well-being. Each drop delivers a precise dose of our proprietary blend, designed to integrate seamlessly into your daily routine.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: null,
    isFeatured: true,
    isArchived: false,
    category: "Wellness",
    imageURLs: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Wellness+Tincture+2",
      "/placeholder.svg?height=600&width=600&text=Wellness+Tincture+3",
    ],
    variantLists: [
      {
        ID: "771eab26-0743-4b95-bcc3-f8d126b7c2ef",
        type: "potency",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        isComplex: true,
        variants: [
          {
            ID: "111116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "potency",
            value: "Regular",
            code: "regular",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "35f06f60-4579-4333-9161-953b347b6f4b",
            type: "potency",
            value: "Extra Strength",
            code: "extra",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
        ],
      },
      {
        ID: "d2e4788c-5aae-4e89-95ca-3dfc145ffd70",
        type: "flavor",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        isComplex: true,
        variants: [
          {
            ID: "42dd0cec-9f73-4b20-bcd3-61491dab5e78",
            type: "flavor",
            value: "Mint",
            code: "mint",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "acc9af58-166e-49cf-923d-98bb7266c740",
            type: "flavor",
            value: "Citrus",
            code: "citrus",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
        ],
      },
      {
        ID: "9c0e7a0c-5ef6-4ca0-bc09-1e03d6470780",
        type: "size",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        isComplex: true,
        variants: [
          {
            ID: "f234bc77-374f-4377-9628-d22839bfbb16",
            type: "size",
            value: "15ml",
            code: "small",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "b3bd4690-de1e-4749-9e35-dccc9513a127",
            type: "size",
            value: "30ml",
            code: "medium",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "ad88bdd4-76b3-45f3-bd77-325fd1a51dad",
            type: "size",
            value: "50ml",
            code: "large",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
        ],
      },
    ],
    variantCombos: [
      {
        ID: "39042e2c-0ae3-4375-8266-1eab74788c24",
        name: "50ml Extra Strength Citrus Tincture",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        variants: [
          {
            ID: "35f06f60-4579-4333-9161-953b347b6f4b",
            type: "potency",
            code: "extra",
          },
          {
            ID: "acc9af58-166e-49cf-923d-98bb7266c740",
            type: "flavor",
            code: "citrus",
          },
          {
            ID: "ad88bdd4-76b3-45f3-bd77-325fd1a51dad",
            type: "size",
            code: "large",
          },
        ],
        quantity: 21,
        price: "79.99",
      },
      {
        ID: "771eab26-0743-4b95-bcc3-f8d126b7c2ee",
        name: "15ml Regular Mint Tincture",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        variants: [
          {
            ID: "111116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "potency",
            code: "regular",
          },
          {
            ID: "42dd0cec-9f73-4b20-bcd3-61491dab5e78",
            type: "flavor",
            code: "mint",
          },
          {
            ID: "f234bc77-374f-4377-9628-d22839bfbb16",
            type: "size",
            code: "small",
          },
        ],
        quantity: 35,
        price: "39.99",
      },
      {
        ID: "771eab26-0743-4b95-bcc3-f8d126b7c2ef",
        name: "30ml Regular Mint Tincture",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "57c5c79e-c0bb-43cd-8929-b1a036cd0d21",
        variants: [
          {
            ID: "111116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "potency",
            code: "regular",
          },
          {
            ID: "42dd0cec-9f73-4b20-bcd3-61491dab5e78",
            type: "flavor",
            code: "mint",
          },
          {
            ID: "b3bd4690-de1e-4749-9e35-dccc9513a127",
            type: "size",
            code: "medium",
          },
        ],
        quantity: 28,
        price: "59.99",
      },
    ],
  },
  {
    ID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
    name: "Luxury Bath Bombs",
    description:
      "Transform your bath into a spa-like experience with our luxurious bath bombs. Infused with essential oils and natural ingredients, these bombs create a soothing, aromatic escape from the everyday.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: null,
    isFeatured: true,
    isArchived: false,
    category: "Bath & Body",
    imageURLs: [
      "/placeholder.svg?height=600&width=600&text=Bath+Bombs",
      "/placeholder.svg?height=600&width=600&text=Bath+Bombs+2",
      "/placeholder.svg?height=600&width=600&text=Bath+Bombs+3",
    ],
    variantLists: [
      {
        ID: "871eab26-0743-4b95-bcc3-f8d126b7c2ef",
        type: "scent",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
        isComplex: true,
        variants: [
          {
            ID: "211116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "scent",
            value: "Lavender",
            code: "lavender",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "45f06f60-4579-4333-9161-953b347b6f4b",
            type: "scent",
            value: "Eucalyptus",
            code: "eucalyptus",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "55f06f60-4579-4333-9161-953b347b6f4c",
            type: "scent",
            value: "Rose",
            code: "rose",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
        ],
      },
      {
        ID: "e2e4788c-5aae-4e89-95ca-3dfc145ffd70",
        type: "package",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
        isComplex: true,
        variants: [
          {
            ID: "52dd0cec-9f73-4b20-bcd3-61491dab5e78",
            type: "package",
            value: "Single",
            code: "single",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "bcc9af58-166e-49cf-923d-98bb7266c740",
            type: "package",
            value: "Set of 3",
            code: "trio",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
          {
            ID: "ccc9af58-166e-49cf-923d-98bb7266c741",
            type: "package",
            value: "Set of 6",
            code: "six",
            storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
            inceptionDate: "new Date()",
            lastUpdate: "new Date()",
          },
        ],
      },
    ],
    variantCombos: [
      {
        ID: "49042e2c-0ae3-4375-8266-1eab74788c24",
        name: "Lavender Bath Bomb - Single",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
        variants: [
          {
            ID: "211116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "scent",
            code: "lavender",
          },
          {
            ID: "52dd0cec-9f73-4b20-bcd3-61491dab5e78",
            type: "package",
            code: "single",
          },
        ],
        quantity: 45,
        price: "12.99",
      },
      {
        ID: "59042e2c-0ae3-4375-8266-1eab74788c25",
        name: "Lavender Bath Bombs - Set of 3",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
        variants: [
          {
            ID: "211116e2-97ee-4013-85ec-e3d3bf1203df",
            type: "scent",
            code: "lavender",
          },
          {
            ID: "bcc9af58-166e-49cf-923d-98bb7266c740",
            type: "package",
            code: "trio",
          },
        ],
        quantity: 32,
        price: "29.99",
      },
      {
        ID: "69042e2c-0ae3-4375-8266-1eab74788c26",
        name: "Eucalyptus Bath Bombs - Set of 6",
        storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
        productID: "67c5c79e-c0bb-43cd-8929-b1a036cd0d22",
        variants: [
          {
            ID: "45f06f60-4579-4333-9161-953b347b6f4b",
            type: "scent",
            code: "eucalyptus",
          },
          {
            ID: "ccc9af58-166e-49cf-923d-98bb7266c741",
            type: "package",
            code: "six",
          },
        ],
        quantity: 18,
        price: "54.99",
      },
    ],
  },
  {
    ID: "77c5c79e-c0bb-43cd-8929-b1a036cd0d23",
    name: "Artisanal Chocolate Collection",
    description:
      "Indulge in our artisanal chocolate collection, crafted by master chocolatiers. Each piece is a perfect balance of rich flavor and smooth texture, creating a truly luxurious experience.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: "34.99",
    isFeatured: true,
    isArchived: false,
    category: "Edibles",
    imageURLs: [
      "/placeholder.svg?height=600&width=600&text=Chocolate",
      "/placeholder.svg?height=600&width=600&text=Chocolate+2",
      "/placeholder.svg?height=600&width=600&text=Chocolate+3",
    ],
  },
  {
    ID: "87c5c79e-c0bb-43cd-8929-b1a036cd0d24",
    name: "Rejuvenating Facial Serum",
    description:
      "Our rejuvenating facial serum is formulated with powerful botanicals to nourish and revitalize your skin. Regular use helps improve texture, reduce fine lines, and restore a natural glow.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: "49.99",
    isFeatured: false,
    isArchived: false,
    category: "Skincare",
    imageURLs: [
      "/placeholder.svg?height=600&width=600&text=Facial+Serum",
      "/placeholder.svg?height=600&width=600&text=Facial+Serum+2",
    ],
  },
  {
    ID: "97c5c79e-c0bb-43cd-8929-b1a036cd0d25",
    name: "Seasonal Scent Candle Collection",
    description:
      "Our seasonal candle collection brings the essence of each season into your home. Made with natural soy wax and premium essential oils, these candles create an inviting atmosphere for any occasion.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: "29.99",
    isFeatured: false,
    isArchived: false,
    category: "Home",
    imageURLs: [
      "/placeholder.svg?height=600&width=600&text=Candles",
      "/placeholder.svg?height=600&width=600&text=Candles+2",
    ],
  },
  {
    ID: "a7c5c79e-c0bb-43cd-8929-b1a036cd0d26",
    name: "Relaxation Gift Set",
    description:
      "The perfect gift for someone special or a well-deserved treat for yourself. This curated set includes our most popular relaxation products, beautifully packaged in an elegant gift box.",
    storeID: "e4dc86ca-9aab-465b-8159-18b0463568c5",
    simplePrice: "89.99",
    isFeatured: false,
    isArchived: false,
    category: "Gift Sets",
    imageURLs: [
      "/placeholder.svg?height=600&width=600&text=Gift+Set",
      "/placeholder.svg?height=600&width=600&text=Gift+Set+2",
    ],
  },
]

// Helper function to get a product by ID
export function getProductById(id: string) {
  return products.find((product) => product.ID === id)
}

// Helper function to get all categories
export function getAllCategories() {
  const categories = new Set<string>()
  products.forEach((product) => {
    if (product.category) {
      categories.add(product.category)
    }
  })
  return Array.from(categories)
}

// Helper function to get featured products
export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured)
}

// Helper function to get product price range
export function getProductPriceRange(product: any) {
  if (product.simplePrice) {
    return {
      min: Number.parseFloat(product.simplePrice),
      max: Number.parseFloat(product.simplePrice),
    }
  }

  if (product.variantCombos && product.variantCombos.length > 0) {
    const prices = product.variantCombos.map((combo: any) => Number.parseFloat(combo.price))
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  return { min: 0, max: 0 }
}
