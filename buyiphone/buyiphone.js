(function () {
  var DEF_IMG = "../store/images/iPhone%2017%20Pro%20image.jpeg";
  var E_IMG = "../store/images/iPhone%2017e%20image.jpeg";

  var COLOR_HEX = {
    silver: "#dedede",
    "space gray": "#3a3a3c",
    "space black": "#1c1c1e",
    black: "#1c1c1e",
    white: "#f5f5f7",
    blue: "#4a90d9",
    yellow: "#f5e6a8",
    coral: "#ff7a5c",
    "product red": "#e11d2e",
    gold: "#e6c7a1",
    "midnight green": "#4e5852",
    red: "#e11d2e",
    green: "#5f8a65",
    purple: "#c8c2dd",
    graphite: "#54524d",
    "pacific blue": "#2e577c",
    midnight: "#1e1e24",
    starlight: "#f0e8dc",
    pink: "#f5b8c4",
    ultramarine: "#3d4f8a",
    sierra: "#9dbbd4",
    "sierra blue": "#9dbbd4",
    "alpine green": "#4f6b58",
    "deep purple": "#5e4b69",
    "deep blue": "#1e2d4a",
    "cosmic orange": "#c45c2a",
    lavender: "#c9c2d9",
    sage: "#9aae9c",
    "mist blue": "#a8bcd4",
    "sky blue": "#7eb8e0",
    "light gold": "#e6d0a9",
    "cloud white": "#f2f2f4",
    teal: "#4a9688",
    "natural titanium": "#aeada8",
    "blue titanium": "#4a5f78",
    "white titanium": "#e8e8e6",
    "black titanium": "#2b2b2d",
    "desert titanium": "#c4a574",
    "soft pink": "#e8b4c8",
    charcoal: "#3a3a3c",
  };

  function hexForColor(name) {
    var k = name.toLowerCase().trim();
    if (COLOR_HEX[k]) return COLOR_HEX[k];
    if (k.indexOf("titanium") !== -1) return "#8e8e93";
    if (k.indexOf("midnight") !== -1) return "#1e1e24";
    if (k.indexOf("starlight") !== -1) return "#f0e8dc";
    return "#aeaeb2";
  }

  function slugify(s) {
    return (
      s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "finish"
    );
  }

  function finishesFromList(str) {
    return str.split(",").map(function (part, i) {
      var label = part.trim();
      return {
        id: slugify(label) + "-" + i,
        label: label,
        swatch: hexForColor(label),
        image: null,
      };
    });
  }

  function storagesFromPrices(tiers) {
    var base = tiers[0].price;
    return tiers.map(function (t, idx) {
      return {
        id:
          t.label
            .replace(/\s/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "") +
          "-" +
          idx,
        label: t.label,
        addPrice: t.price - base,
      };
    });
  }

  function oneModel(id, name, inches, basePrice) {
    return [{ id: id, name: name, inches: inches, price: basePrice }];
  }

  var data = {
    iphonex: {
      label: "iPhone X",
      defaultImage: DEF_IMG,
      models: oneModel("iphonex", "iPhone X", "5.8-inch display", 999),
      finishes: finishesFromList("Silver, Space Gray"),
      storages: storagesFromPrices([
        { label: "64GB", price: 999 },
        { label: "256GB", price: 1149 },
      ]),
    },
    iphonexr: {
      label: "iPhone XR",
      defaultImage: DEF_IMG,
      models: oneModel("iphonexr", "iPhone XR", "6.1-inch display", 749),
      finishes: finishesFromList("Black, White, Blue, Yellow, Coral, Product RED"),
      storages: storagesFromPrices([
        { label: "64GB", price: 749 },
        { label: "128GB", price: 799 },
        { label: "256GB", price: 899 },
      ]),
    },
    iphonexs: {
      label: "iPhone XS",
      defaultImage: DEF_IMG,
      models: oneModel("iphonexs", "iPhone XS", "5.8-inch display", 999),
      finishes: finishesFromList("Space Gray, Silver, Gold"),
      storages: storagesFromPrices([
        { label: "64GB", price: 999 },
        { label: "256GB", price: 1149 },
        { label: "512GB", price: 1349 },
      ]),
    },
    iphonexsmax: {
      label: "iPhone XS Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphonexsmax", "iPhone XS Max", "6.5-inch display", 1099),
      finishes: finishesFromList("Space Gray, Silver, Gold"),
      storages: storagesFromPrices([
        { label: "64GB", price: 1099 },
        { label: "256GB", price: 1249 },
        { label: "512GB", price: 1449 },
      ]),
    },
    iphone11: {
      label: "iPhone 11",
      defaultImage: DEF_IMG,
      models: oneModel("iphone11", "iPhone 11", "6.1-inch display", 699),
      finishes: finishesFromList("Black, White, Yellow, Purple, Green, Product RED"),
      storages: storagesFromPrices([
        { label: "64GB", price: 699 },
        { label: "128GB", price: 749 },
        { label: "256GB", price: 849 },
      ]),
    },
    iphone11pro: {
      label: "iPhone 11 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone11pro", "iPhone 11 Pro", "5.8-inch display", 999),
      finishes: finishesFromList("Space Gray, Silver, Gold, Midnight Green"),
      storages: storagesFromPrices([
        { label: "64GB", price: 999 },
        { label: "256GB", price: 1149 },
        { label: "512GB", price: 1349 },
      ]),
    },
    iphone11promax: {
      label: "iPhone 11 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone11promax", "iPhone 11 Pro Max", "6.5-inch display", 1099),
      finishes: finishesFromList("Space Gray, Silver, Gold, Midnight Green"),
      storages: storagesFromPrices([
        { label: "64GB", price: 1099 },
        { label: "256GB", price: 1249 },
        { label: "512GB", price: 1449 },
      ]),
    },
    iphone12mini: {
      label: "iPhone 12 mini",
      defaultImage: DEF_IMG,
      models: oneModel("iphone12mini", "iPhone 12 mini", "5.4-inch display", 699),
      finishes: finishesFromList("Black, White, Red, Green, Blue, Purple"),
      storages: storagesFromPrices([
        { label: "64GB", price: 699 },
        { label: "128GB", price: 749 },
        { label: "256GB", price: 849 },
      ]),
    },
    iphone12: {
      label: "iPhone 12",
      defaultImage: DEF_IMG,
      models: oneModel("iphone12", "iPhone 12", "6.1-inch display", 799),
      finishes: finishesFromList("Black, White, Red, Green, Blue, Purple"),
      storages: storagesFromPrices([
        { label: "64GB", price: 799 },
        { label: "128GB", price: 849 },
        { label: "256GB", price: 949 },
      ]),
    },
    iphone12pro: {
      label: "iPhone 12 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone12pro", "iPhone 12 Pro", "6.1-inch display", 999),
      finishes: finishesFromList("Graphite, Silver, Gold, Pacific Blue"),
      storages: storagesFromPrices([
        { label: "128GB", price: 999 },
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
      ]),
    },
    iphone12promax: {
      label: "iPhone 12 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone12promax", "iPhone 12 Pro Max", "6.7-inch display", 1099),
      finishes: finishesFromList("Graphite, Silver, Gold, Pacific Blue"),
      storages: storagesFromPrices([
        { label: "128GB", price: 1099 },
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
      ]),
    },
    iphone13mini: {
      label: "iPhone 13 mini",
      defaultImage: DEF_IMG,
      models: oneModel("iphone13mini", "iPhone 13 mini", "5.4-inch display", 699),
      finishes: finishesFromList("Midnight, Starlight, Blue, Pink, Green, Product RED"),
      storages: storagesFromPrices([
        { label: "128GB", price: 699 },
        { label: "256GB", price: 799 },
        { label: "512GB", price: 999 },
      ]),
    },
    iphone13: {
      label: "iPhone 13",
      defaultImage: DEF_IMG,
      models: oneModel("iphone13", "iPhone 13", "6.1-inch display", 799),
      finishes: finishesFromList("Midnight, Starlight, Blue, Pink, Green, Product RED"),
      storages: storagesFromPrices([
        { label: "128GB", price: 799 },
        { label: "256GB", price: 899 },
        { label: "512GB", price: 1099 },
      ]),
    },
    iphone13pro: {
      label: "iPhone 13 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone13pro", "iPhone 13 Pro", "6.1-inch display", 999),
      finishes: finishesFromList("Graphite, Gold, Silver, Sierra Blue, Alpine Green"),
      storages: storagesFromPrices([
        { label: "128GB", price: 999 },
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
      ]),
    },
    iphone13promax: {
      label: "iPhone 13 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone13promax", "iPhone 13 Pro Max", "6.7-inch display", 1099),
      finishes: finishesFromList("Graphite, Gold, Silver, Sierra Blue, Alpine Green"),
      storages: storagesFromPrices([
        { label: "128GB", price: 1099 },
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
      ]),
    },
    iphone14: {
      label: "iPhone 14",
      defaultImage: DEF_IMG,
      models: oneModel("iphone14", "iPhone 14", "6.1-inch display", 799),
      finishes: finishesFromList("Midnight, Starlight, Blue, Purple, Yellow, Product RED"),
      storages: storagesFromPrices([
        { label: "128GB", price: 799 },
        { label: "256GB", price: 899 },
        { label: "512GB", price: 1099 },
      ]),
    },
    iphone14plus: {
      label: "iPhone 14 Plus",
      defaultImage: DEF_IMG,
      models: oneModel("iphone14plus", "iPhone 14 Plus", "6.7-inch display", 899),
      finishes: finishesFromList("Midnight, Starlight, Blue, Purple, Yellow, Product RED"),
      storages: storagesFromPrices([
        { label: "128GB", price: 899 },
        { label: "256GB", price: 999 },
        { label: "512GB", price: 1199 },
      ]),
    },
    iphone14pro: {
      label: "iPhone 14 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone14pro", "iPhone 14 Pro", "6.1-inch display", 999),
      finishes: finishesFromList("Space Black, Silver, Gold, Deep Purple"),
      storages: storagesFromPrices([
        { label: "128GB", price: 999 },
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
      ]),
    },
    iphone14promax: {
      label: "iPhone 14 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone14promax", "iPhone 14 Pro Max", "6.7-inch display", 1099),
      finishes: finishesFromList("Space Black, Silver, Gold, Deep Purple"),
      storages: storagesFromPrices([
        { label: "128GB", price: 1099 },
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
      ]),
    },
    iphone15: {
      label: "iPhone 15",
      defaultImage: DEF_IMG,
      models: oneModel("iphone15", "iPhone 15", "6.1-inch display", 799),
      finishes: finishesFromList("Black, Blue, Green, Yellow, Pink"),
      storages: storagesFromPrices([
        { label: "128GB", price: 799 },
        { label: "256GB", price: 899 },
        { label: "512GB", price: 1099 },
      ]),
    },
    iphone15plus: {
      label: "iPhone 15 Plus",
      defaultImage: DEF_IMG,
      models: oneModel("iphone15plus", "iPhone 15 Plus", "6.7-inch display", 899),
      finishes: finishesFromList("Black, Blue, Green, Yellow, Pink"),
      storages: storagesFromPrices([
        { label: "128GB", price: 899 },
        { label: "256GB", price: 999 },
        { label: "512GB", price: 1199 },
      ]),
    },
    iphone15pro: {
      label: "iPhone 15 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone15pro", "iPhone 15 Pro", "6.1-inch display", 999),
      finishes: finishesFromList(
        "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
      ),
      storages: storagesFromPrices([
        { label: "128GB", price: 999 },
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
      ]),
    },
    iphone15promax: {
      label: "iPhone 15 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone15promax", "iPhone 15 Pro Max", "6.7-inch display", 1199),
      finishes: finishesFromList(
        "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
      ),
      storages: storagesFromPrices([
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
      ]),
    },
    iphone16e: {
      label: "iPhone 16e",
      defaultImage: E_IMG,
      models: oneModel("iphone16e", "iPhone 16e", "6.1-inch display", 599),
      finishes: finishesFromList("Black, White"),
      storages: storagesFromPrices([{ label: "128GB", price: 599 }]),
    },
    iphone16: {
      label: "iPhone 16",
      defaultImage: DEF_IMG,
      models: oneModel("iphone16", "iPhone 16", "6.1-inch display", 699),
      finishes: finishesFromList("Black, White, Pink, Teal, Ultramarine"),
      storages: storagesFromPrices([{ label: "128GB", price: 699 }]),
    },
    iphone16plus: {
      label: "iPhone 16 Plus",
      defaultImage: DEF_IMG,
      models: oneModel("iphone16plus", "iPhone 16 Plus", "6.7-inch display", 799),
      finishes: finishesFromList("Black, White, Pink, Teal, Ultramarine"),
      storages: storagesFromPrices([
        { label: "128GB", price: 799 },
        { label: "256GB", price: 899 },
      ]),
    },
    iphone16pro: {
      label: "iPhone 16 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone16pro", "iPhone 16 Pro", "6.3-inch display", 999),
      finishes: finishesFromList(
        "Black Titanium, White Titanium, Natural Titanium, Desert Titanium"
      ),
      storages: storagesFromPrices([
        { label: "128GB", price: 999 },
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
      ]),
    },
    iphone16promax: {
      label: "iPhone 16 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone16promax", "iPhone 16 Pro Max", "6.9-inch display", 1199),
      finishes: finishesFromList(
        "Black Titanium, White Titanium, Natural Titanium, Desert Titanium"
      ),
      storages: storagesFromPrices([
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
      ]),
    },
    iphone17e: {
      label: "iPhone 17e",
      defaultImage: E_IMG,
      models: oneModel("iphone17e", "iPhone 17e", "6.1-inch display", 599),
      finishes: finishesFromList("Black, White, Soft Pink"),
      storages: storagesFromPrices([
        { label: "256GB", price: 599 },
        { label: "512GB", price: 799 },
      ]),
    },
    iphone17: {
      label: "iPhone 17",
      defaultImage: DEF_IMG,
      models: oneModel("iphone17", "iPhone 17", "6.3-inch display", 799),
      finishes: finishesFromList("Lavender, Sage, Mist Blue, White, Black"),
      storages: storagesFromPrices([
        { label: "256GB", price: 799 },
        { label: "512GB", price: 999 },
      ]),
    },
    iphoneair: {
      label: "iPhone Air",
      defaultImage: DEF_IMG,
      models: oneModel("iphoneair", "iPhone Air", "6.5-inch display", 999),
      finishes: finishesFromList("Sky Blue, Light Gold, Cloud White, Space Black"),
      storages: storagesFromPrices([
        { label: "256GB", price: 999 },
        { label: "512GB", price: 1199 },
        { label: "1TB", price: 1399 },
      ]),
    },
    iphone17pro: {
      label: "iPhone 17 Pro",
      defaultImage: DEF_IMG,
      models: oneModel("iphone17pro", "iPhone 17 Pro", "6.3-inch display", 1099),
      finishes: [
        {
          id: "silver-0",
          label: "Silver",
          swatch: "#dedede",
          image: DEF_IMG,
        },
        {
          id: "deepblue-1",
          label: "Deep Blue",
          swatch: "#1e2d4a",
          image: DEF_IMG,
        },
        {
          id: "cosmic-2",
          label: "Cosmic Orange",
          swatch: "#c45c2a",
          image: DEF_IMG,
        },
      ],
      storages: storagesFromPrices([
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
      ]),
    },
    iphone17promax: {
      label: "iPhone 17 Pro Max",
      defaultImage: DEF_IMG,
      models: oneModel("iphone17promax", "iPhone 17 Pro Max", "6.9-inch display", 1199),
      finishes: [
        {
          id: "silver-0",
          label: "Silver",
          swatch: "#dedede",
          image: DEF_IMG,
        },
        {
          id: "deepblue-1",
          label: "Deep Blue",
          swatch: "#1e2d4a",
          image: DEF_IMG,
        },
        {
          id: "cosmic-2",
          label: "Cosmic Orange",
          swatch: "#c45c2a",
          image: DEF_IMG,
        },
      ],
      storages: storagesFromPrices([
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
        { label: "2TB", price: 1999 },
      ]),
    },
  };

  /** Newest first in the family dropdown */
  var FAMILY_ORDER = [
    "iphone17promax",
    "iphone17pro",
    "iphoneair",
    "iphone17",
    "iphone17e",
    "iphone16promax",
    "iphone16pro",
    "iphone16plus",
    "iphone16",
    "iphone16e",
    "iphone15promax",
    "iphone15pro",
    "iphone15plus",
    "iphone15",
    "iphone14promax",
    "iphone14pro",
    "iphone14plus",
    "iphone14",
    "iphone13promax",
    "iphone13pro",
    "iphone13",
    "iphone13mini",
    "iphone12promax",
    "iphone12pro",
    "iphone12",
    "iphone12mini",
    "iphone11promax",
    "iphone11pro",
    "iphone11",
    "iphonexsmax",
    "iphonexs",
    "iphonexr",
    "iphonex",
  ];

  var baseSelect = document.getElementById("iphoneBaseSelect");
  var modelList = document.getElementById("modelList");
  var finishBlock = document.getElementById("finishBlock");
  var finishList = document.getElementById("finishList");
  var finishColorName = document.getElementById("finishColorName");
  var storageBlock = document.getElementById("storageBlock");
  var storageList = document.getElementById("storageList");
  var summary = document.getElementById("selectionSummary");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var visualImage = document.getElementById("iphoneVisualImage");
  var toolbarTitle = document.getElementById("toolbarTitle");
  var toolbarPrice = document.getElementById("toolbarPrice");
  var modelBlock = document.getElementById("modelBlock");

  if (
    !baseSelect ||
    !modelList ||
    !finishBlock ||
    !finishList ||
    !finishColorName ||
    !storageBlock ||
    !storageList ||
    !summary ||
    !checkoutBtn ||
    !visualImage ||
    !toolbarTitle ||
    !toolbarPrice
  ) {
    return;
  }

  var state = {
    baseKey: "",
    modelId: "",
    finishId: "",
    storageId: "",
  };

  function formatPrice(value) {
    return "$" + value.toLocaleString("en-US");
  }

  function monthlyFromPrice(price) {
    return (price / 24).toFixed(2);
  }

  function selectedBase() {
    return data[state.baseKey];
  }

  function selectedModel() {
    var base = selectedBase();
    if (!base) return null;
    return base.models.find(function (item) {
      return item.id === state.modelId;
    });
  }

  function selectedFinish() {
    var base = selectedBase();
    if (!base) return null;
    return base.finishes.find(function (item) {
      return item.id === state.finishId;
    });
  }

  function selectedStorage() {
    var base = selectedBase();
    if (!base) return null;
    return base.storages.find(function (item) {
      return item.id === state.storageId;
    });
  }

  function updateVisual() {
    var base = selectedBase();
    var finish = selectedFinish();
    if (!base) return;
    var src = finish && finish.image ? finish.image : base.defaultImage;
    visualImage.src = src;
    visualImage.alt = (finish && finish.label ? finish.label + " — " : "") + (base.label || "iPhone");
  }

  function renderToolbar() {
    var base = selectedBase();
    var model = selectedModel();

    if (!base) {
      toolbarTitle.textContent = "Buy iPhone";
      toolbarPrice.textContent = "Select a family to get started.";
      return;
    }

    toolbarTitle.textContent = model ? model.name : base.label;

    if (model) {
      toolbarPrice.textContent =
        "From " +
        formatPrice(model.price) +
        " or $" +
        monthlyFromPrice(model.price) +
        "/mo. for 24 mo.*";
    } else {
      toolbarPrice.textContent = "Choose a model to see pricing.";
    }
  }

  function renderBaseOptions() {
    FAMILY_ORDER.forEach(function (key) {
      if (!data[key]) return;
      var option = document.createElement("option");
      option.value = key;
      option.textContent = data[key].label;
      baseSelect.appendChild(option);
    });
  }

  function renderModels() {
    modelList.innerHTML = "";
    var base = selectedBase();
    if (!base) return;

    base.models.forEach(function (model) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "choice-item" + (state.modelId === model.id ? " is-selected" : "");
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", state.modelId === model.id ? "true" : "false");

      var main = document.createElement("div");
      main.className = "choice-main";
      main.innerHTML =
        '<span class="choice-title">' +
        model.name +
        '</span><span class="choice-sub">' +
        model.inches +
        "</span>";

      var price = document.createElement("div");
      price.className = "choice-price";
      price.innerHTML =
        "From " +
        formatPrice(model.price) +
        "<br />or $" +
        monthlyFromPrice(model.price) +
        "/mo. for 24 mo.";

      button.appendChild(main);
      button.appendChild(price);
      button.addEventListener("click", function () {
        state.modelId = model.id;
        state.finishId = base.finishes[0] ? base.finishes[0].id : "";
        state.storageId = "";
        renderModels();
        renderFinishes();
        renderStorages();
        renderToolbar();
        renderSummary();
      });

      modelList.appendChild(button);
    });

    if (modelBlock) {
      modelBlock.hidden = base.models.length <= 1;
    }
  }

  function renderFinishes() {
    finishList.innerHTML = "";
    var base = selectedBase();
    var model = selectedModel();

    if (!base || !model) {
      finishBlock.hidden = true;
      return;
    }

    finishBlock.hidden = false;

    if (!state.finishId && base.finishes.length) {
      state.finishId = base.finishes[0].id;
    }

    base.finishes.forEach(function (finish) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "finish-swatch" + (state.finishId === finish.id ? " is-selected" : "");
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", state.finishId === finish.id ? "true" : "false");
      btn.setAttribute("aria-label", finish.label);
      btn.style.backgroundColor = finish.swatch;

      btn.addEventListener("click", function () {
        state.finishId = finish.id;
        state.storageId = "";
        renderFinishes();
        updateVisual();
        renderStorages();
        renderToolbar();
        renderSummary();
      });

      finishList.appendChild(btn);
    });

    var active = selectedFinish();
    finishColorName.textContent = active ? active.label : "";
    updateVisual();
  }

  function renderStorages() {
    storageList.innerHTML = "";
    var base = selectedBase();
    var model = selectedModel();
    var finish = selectedFinish();

    if (!base || !model || !finish) {
      storageBlock.hidden = true;
      return;
    }

    storageBlock.hidden = false;

    base.storages.forEach(function (storage) {
      var totalPrice = model.price + storage.addPrice;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "choice-item" + (state.storageId === storage.id ? " is-selected" : "");
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", state.storageId === storage.id ? "true" : "false");

      var main = document.createElement("div");
      main.className = "choice-main";
      main.innerHTML = '<span class="choice-title">' + storage.label + "</span>";

      var price = document.createElement("div");
      price.className = "choice-price";
      price.innerHTML =
        "From " +
        formatPrice(totalPrice) +
        "<br />or $" +
        monthlyFromPrice(totalPrice) +
        "/mo. for 24 mo.";

      button.appendChild(main);
      button.appendChild(price);
      button.addEventListener("click", function () {
        state.storageId = storage.id;
        renderStorages();
        renderToolbar();
        renderSummary();
      });

      storageList.appendChild(button);
    });
  }

  function renderSummary() {
    var base = selectedBase();
    var model = selectedModel();
    var finish = selectedFinish();
    var storage = selectedStorage();

    if (!base || !model || !finish || !storage) {
      summary.textContent = "Select a family, model, finish, and storage to continue.";
      checkoutBtn.disabled = true;
      return;
    }

    var totalPrice = model.price + storage.addPrice;
    summary.textContent =
      base.label +
      " • " +
      model.name +
      " • " +
      finish.label +
      " • " +
      storage.label +
      " — " +
      formatPrice(totalPrice) +
      " or $" +
      monthlyFromPrice(totalPrice) +
      "/mo. for 24 mo.";
    checkoutBtn.disabled = false;

    toolbarPrice.textContent =
      "From " +
      formatPrice(totalPrice) +
      " or $" +
      monthlyFromPrice(totalPrice) +
      "/mo. for 24 mo.*";
  }

  baseSelect.addEventListener("change", function () {
    state.baseKey = baseSelect.value;
    state.modelId = "";
    state.finishId = "";
    state.storageId = "";

    if (!state.baseKey) {
      finishBlock.hidden = true;
      storageBlock.hidden = true;
      modelList.innerHTML = "";
      finishList.innerHTML = "";
      storageList.innerHTML = "";
      if (modelBlock) modelBlock.hidden = true;
      renderToolbar();
      renderSummary();
      return;
    }

    var base = selectedBase();
    renderModels();
    if (base && base.models.length === 1) {
      state.modelId = base.models[0].id;
      state.finishId = base.finishes[0] ? base.finishes[0].id : "";
      state.storageId = "";
      renderModels();
    }
    renderFinishes();
    renderStorages();
    renderToolbar();
    renderSummary();
  });

  checkoutBtn.addEventListener("click", function () {
    if (checkoutBtn.disabled) return;
    window.location.href = "#checkout";
  });

  renderBaseOptions();
  baseSelect.value = "iphone17promax";
  baseSelect.dispatchEvent(new Event("change"));
})();
