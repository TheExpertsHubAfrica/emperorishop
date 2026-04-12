(function () {
  var IMG_NEO = "../mac/images/MacBook%20Neo%20image.png";
  var IMG_AIR = "../mac/images/MacBook%20Air%20image.png";
  var IMG_PRO = "../mac/images/MacBook%20Pro%20image.png";

  var COLOR_HEX = {
    silver: "#dedede",
    "space gray": "#3a3a3c",
    "space black": "#1c1c1e",
    gold: "#e6c7a1",
    midnight: "#1e1e24",
    starlight: "#f0e8dc",
    "sky blue": "#7eb8e0",
    blush: "#e8a4b8",
    citrus: "#e8c44c",
    indigo: "#2d2d4a",
  };

  function hexForColor(name) {
    var k = name.toLowerCase().trim();
    if (COLOR_HEX[k]) return COLOR_HEX[k];
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

  function row(label, img, modelName, sub, basePrice, colors, tiers) {
    return {
      label: label,
      defaultImage: img,
      models: oneModel("m", modelName, sub, basePrice),
      finishes: finishesFromList(colors),
      storages: storagesFromPrices(tiers),
    };
  }

  var data = {
    "mb-neo-13-a18-2026": row(
      'MacBook Neo 13" (A18 Pro, 2026)',
      IMG_NEO,
      'MacBook Neo 13"',
      "13-inch display",
      599,
      "Silver, Blush, Citrus, Indigo",
      [
        { label: "256GB (no Touch ID)", price: 599 },
        { label: "512GB (includes Touch ID)", price: 699 },
      ]
    ),
    "mb-air-13-m1-2020": row(
      'MacBook Air 13" (M1, 2020)',
      IMG_AIR,
      'MacBook Air 13" (M1, 2020)',
      '13-inch Retina display',
      999,
      "Space Gray, Gold, Silver",
      [
        { label: "256GB", price: 999 },
        { label: "512GB", price: 1249 },
        { label: "1TB", price: 1499 },
        { label: "2TB", price: 1749 },
      ]
    ),
    "mb-air-13-m2-2022": row(
      'MacBook Air 13" (M2, 2022)',
      IMG_AIR,
      'MacBook Air 13" (M2, 2022)',
      '13-inch Liquid Retina',
      1099,
      "Midnight, Starlight, Space Gray, Silver",
      [
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
        { label: "2TB", price: 1699 },
      ]
    ),
    "mb-air-15-m2-2023": row(
      'MacBook Air 15" (M2, 2023)',
      IMG_AIR,
      'MacBook Air 15" (M2, 2023)',
      '15-inch Liquid Retina',
      1299,
      "Midnight, Starlight, Space Gray, Silver",
      [
        { label: "256GB", price: 1299 },
        { label: "512GB", price: 1499 },
        { label: "1TB", price: 1699 },
        { label: "2TB", price: 1899 },
      ]
    ),
    "mb-air-13-m3-2024": row(
      'MacBook Air 13" (M3, 2024)',
      IMG_AIR,
      'MacBook Air 13" (M3, 2024)',
      '13-inch Liquid Retina',
      1099,
      "Midnight, Starlight, Space Gray, Silver",
      [
        { label: "256GB", price: 1099 },
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
        { label: "2TB", price: 1699 },
      ]
    ),
    "mb-air-15-m3-2024": row(
      'MacBook Air 15" (M3, 2024)',
      IMG_AIR,
      'MacBook Air 15" (M3, 2024)',
      '15-inch Liquid Retina',
      1299,
      "Midnight, Starlight, Space Gray, Silver",
      [
        { label: "256GB", price: 1299 },
        { label: "512GB", price: 1499 },
        { label: "1TB", price: 1699 },
        { label: "2TB", price: 1899 },
      ]
    ),
    "mb-air-13-m4-2025": row(
      'MacBook Air 13" (M4, 2025)',
      IMG_AIR,
      'MacBook Air 13" (M4, 2025)',
      '13-inch Liquid Retina',
      999,
      "Sky Blue, Midnight, Starlight, Silver",
      [
        { label: "256GB", price: 999 },
        { label: "512GB", price: 1199 },
        { label: "1TB", price: 1399 },
        { label: "2TB", price: 1599 },
      ]
    ),
    "mb-air-15-m4-2025": row(
      'MacBook Air 15" (M4, 2025)',
      IMG_AIR,
      'MacBook Air 15" (M4, 2025)',
      '15-inch Liquid Retina',
      1199,
      "Sky Blue, Midnight, Starlight, Silver",
      [
        { label: "256GB", price: 1199 },
        { label: "512GB", price: 1399 },
        { label: "1TB", price: 1599 },
        { label: "2TB", price: 1799 },
      ]
    ),
    "mb-air-13-m5-2026": row(
      'MacBook Air 13" (M5, 2026)',
      IMG_AIR,
      'MacBook Air 13" (M5, 2026)',
      '13-inch Liquid Retina',
      1099,
      "Sky Blue, Midnight, Starlight, Silver",
      [
        { label: "512GB", price: 1099 },
        { label: "1TB", price: 1299 },
        { label: "2TB", price: 1499 },
        { label: "4TB", price: 1699 },
      ]
    ),
    "mb-air-15-m5-2026": row(
      'MacBook Air 15" (M5, 2026)',
      IMG_AIR,
      'MacBook Air 15" (M5, 2026)',
      '15-inch Liquid Retina',
      1299,
      "Sky Blue, Midnight, Starlight, Silver",
      [
        { label: "512GB", price: 1299 },
        { label: "1TB", price: 1499 },
        { label: "2TB", price: 1699 },
        { label: "4TB", price: 1899 },
      ]
    ),
    "mb-pro-13-m1-2020": row(
      'MacBook Pro 13" (M1, 2020)',
      IMG_PRO,
      'MacBook Pro 13" (M1, 2020)',
      '13-inch Retina display',
      1299,
      "Silver, Space Gray",
      [
        { label: "256GB", price: 1299 },
        { label: "512GB", price: 1499 },
        { label: "1TB", price: 1699 },
        { label: "2TB", price: 1899 },
      ]
    ),
    "mb-pro-13-m2-2022": row(
      'MacBook Pro 13" (M2, 2022)',
      IMG_PRO,
      'MacBook Pro 13" (M2, 2022)',
      '13-inch Retina display',
      1299,
      "Silver, Space Gray",
      [
        { label: "256GB", price: 1299 },
        { label: "512GB", price: 1499 },
        { label: "1TB", price: 1699 },
        { label: "2TB", price: 1899 },
      ]
    ),
    "mb-pro-14-m1-pro-max-2021": row(
      'MacBook Pro 14" (M1 Pro / M1 Max, 2021)',
      IMG_PRO,
      'MacBook Pro 14" (M1 Pro / M1 Max, 2021)',
      '14-inch Liquid Retina XDR',
      1999,
      "Silver, Space Gray",
      [
        { label: "512GB (M1 Pro)", price: 1999 },
        { label: "1TB (M1 Pro)", price: 2499 },
        { label: "1TB (M1 Max)", price: 3499 },
        { label: "2TB (M1 Max)", price: 3799 },
        { label: "4TB (M1 Max)", price: 4099 },
        { label: "8TB (M1 Max)", price: 4699 },
      ]
    ),
    "mb-pro-16-m1-pro-max-2021": row(
      'MacBook Pro 16" (M1 Pro / M1 Max, 2021)',
      IMG_PRO,
      'MacBook Pro 16" (M1 Pro / M1 Max, 2021)',
      '16-inch Liquid Retina XDR',
      2499,
      "Silver, Space Gray",
      [
        { label: "512GB (M1 Pro)", price: 2499 },
        { label: "1TB (M1 Pro)", price: 2699 },
        { label: "1TB (M1 Max)", price: 3499 },
        { label: "2TB (M1 Max)", price: 3899 },
        { label: "4TB (M1 Max)", price: 4199 },
        { label: "8TB (M1 Max)", price: 4799 },
      ]
    ),
    "mb-pro-14-m2-pro-max-2023": row(
      'MacBook Pro 14" (M2 Pro / M2 Max, 2023)',
      IMG_PRO,
      'MacBook Pro 14" (M2 Pro / M2 Max, 2023)',
      '14-inch Liquid Retina XDR',
      1999,
      "Silver, Space Gray",
      [
        { label: "512GB (M2 Pro)", price: 1999 },
        { label: "1TB (M2 Pro)", price: 2199 },
        { label: "1TB (M2 Max)", price: 3099 },
        { label: "2TB (M2 Max)", price: 3499 },
        { label: "4TB (M2 Max)", price: 3899 },
        { label: "6TB (M2 Max)", price: 4299 },
        { label: "8TB (M2 Max)", price: 4699 },
      ]
    ),
    "mb-pro-16-m2-pro-max-2023": row(
      'MacBook Pro 16" (M2 Pro / M2 Max, 2023)',
      IMG_PRO,
      'MacBook Pro 16" (M2 Pro / M2 Max, 2023)',
      '16-inch Liquid Retina XDR',
      2499,
      "Silver, Space Gray",
      [
        { label: "512GB (M2 Pro)", price: 2499 },
        { label: "1TB (M2 Pro)", price: 2699 },
        { label: "1TB (M2 Max)", price: 3499 },
        { label: "2TB (M2 Max)", price: 3899 },
        { label: "4TB (M2 Max)", price: 4299 },
        { label: "6TB (M2 Max)", price: 4699 },
        { label: "8TB (M2 Max)", price: 5099 },
      ]
    ),
    "mb-pro-14-m3-2023": row(
      'MacBook Pro 14" (M3, 2023)',
      IMG_PRO,
      'MacBook Pro 14" (M3, 2023)',
      '14-inch Liquid Retina XDR',
      1599,
      "Silver, Space Black",
      [
        { label: "512GB", price: 1599 },
        { label: "1TB", price: 1799 },
        { label: "2TB", price: 1999 },
      ]
    ),
    "mb-pro-14-m3-pro-max-2023": row(
      'MacBook Pro 14" (M3 Pro / M3 Max, 2023)',
      IMG_PRO,
      'MacBook Pro 14" (M3 Pro / M3 Max, 2023)',
      '14-inch Liquid Retina XDR',
      1999,
      "Silver, Space Black",
      [
        { label: "512GB (M3 Pro)", price: 1999 },
        { label: "1TB (M3 Pro)", price: 2199 },
        { label: "1TB (M3 Max)", price: 3199 },
        { label: "2TB (M3 Max)", price: 3499 },
        { label: "4TB (M3 Max)", price: 3899 },
      ]
    ),
    "mb-pro-16-m3-pro-max-2023": row(
      'MacBook Pro 16" (M3 Pro / M3 Max, 2023)',
      IMG_PRO,
      'MacBook Pro 16" (M3 Pro / M3 Max, 2023)',
      '16-inch Liquid Retina XDR',
      2499,
      "Silver, Space Black",
      [
        { label: "512GB (M3 Pro)", price: 2499 },
        { label: "1TB (M3 Pro)", price: 2699 },
        { label: "1TB (M3 Max)", price: 3499 },
        { label: "2TB (M3 Max)", price: 3899 },
        { label: "4TB (M3 Max)", price: 4299 },
      ]
    ),
    "mb-pro-14-m4-2024": row(
      'MacBook Pro 14" (M4, 2024)',
      IMG_PRO,
      'MacBook Pro 14" (M4, 2024)',
      '14-inch Liquid Retina XDR',
      1599,
      "Silver, Space Black",
      [
        { label: "512GB", price: 1599 },
        { label: "1TB", price: 1799 },
        { label: "2TB", price: 1999 },
      ]
    ),
    "mb-pro-14-m4-pro-max-2024": row(
      'MacBook Pro 14" (M4 Pro / M4 Max, 2024)',
      IMG_PRO,
      'MacBook Pro 14" (M4 Pro / M4 Max, 2024)',
      '14-inch Liquid Retina XDR',
      1999,
      "Silver, Space Black",
      [
        { label: "512GB (M4 Pro)", price: 1999 },
        { label: "1TB (M4 Pro)", price: 2199 },
        { label: "1TB (M4 Max)", price: 3199 },
        { label: "2TB (M4 Max)", price: 3599 },
        { label: "4TB (M4 Max)", price: 3999 },
      ]
    ),
    "mb-pro-16-m4-pro-max-2024": row(
      'MacBook Pro 16" (M4 Pro / M4 Max, 2024)',
      IMG_PRO,
      'MacBook Pro 16" (M4 Pro / M4 Max, 2024)',
      '16-inch Liquid Retina XDR',
      2499,
      "Silver, Space Black",
      [
        { label: "512GB (M4 Pro)", price: 2499 },
        { label: "1TB (M4 Pro)", price: 2699 },
        { label: "1TB (M4 Max)", price: 3499 },
        { label: "2TB (M4 Max)", price: 3899 },
        { label: "4TB (M4 Max)", price: 4299 },
        { label: "8TB (M4 Max)", price: 4899 },
      ]
    ),
    "mb-pro-14-m5-2025": row(
      'MacBook Pro 14" (M5, 2025)',
      IMG_PRO,
      'MacBook Pro 14" (M5, 2025)',
      '14-inch Liquid Retina XDR',
      1699,
      "Silver, Space Black",
      [
        { label: "512GB", price: 1699 },
        { label: "1TB", price: 1899 },
        { label: "2TB", price: 2099 },
      ]
    ),
    "mb-pro-14-m5-pro-max-2026": row(
      'MacBook Pro 14" (M5 Pro / M5 Max, 2026)',
      IMG_PRO,
      'MacBook Pro 14" (M5 Pro / M5 Max, 2026)',
      '14-inch Liquid Retina XDR',
      2199,
      "Silver, Space Black",
      [
        { label: "1TB (M5 Pro)", price: 2199 },
        { label: "2TB (M5 Pro)", price: 2399 },
        { label: "4TB (M5 Pro)", price: 2599 },
        { label: "2TB (M5 Max)", price: 3599 },
        { label: "4TB (M5 Max)", price: 3999 },
        { label: "6TB (M5 Max)", price: 4399 },
        { label: "8TB (M5 Max)", price: 4799 },
      ]
    ),
    "mb-pro-16-m5-pro-max-2026": row(
      'MacBook Pro 16" (M5 Pro / M5 Max, 2026)',
      IMG_PRO,
      'MacBook Pro 16" (M5 Pro / M5 Max, 2026)',
      '16-inch Liquid Retina XDR',
      2699,
      "Silver, Space Black",
      [
        { label: "1TB (M5 Pro)", price: 2699 },
        { label: "2TB (M5 Pro)", price: 2899 },
        { label: "4TB (M5 Pro)", price: 3099 },
        { label: "2TB (M5 Max)", price: 3899 },
        { label: "4TB (M5 Max)", price: 4299 },
        { label: "6TB (M5 Max)", price: 4699 },
        { label: "8TB (M5 Max)", price: 5099 },
      ]
    ),
  };

  /** Newest / currently sold first */
  var FAMILY_ORDER = [
    "mb-neo-13-a18-2026",
    "mb-air-13-m5-2026",
    "mb-air-15-m5-2026",
    "mb-pro-14-m5-2025",
    "mb-pro-14-m5-pro-max-2026",
    "mb-pro-16-m5-pro-max-2026",
    "mb-air-13-m4-2025",
    "mb-air-15-m4-2025",
    "mb-air-13-m3-2024",
    "mb-air-15-m3-2024",
    "mb-pro-14-m4-2024",
    "mb-pro-14-m4-pro-max-2024",
    "mb-pro-16-m4-pro-max-2024",
    "mb-pro-14-m3-2023",
    "mb-pro-14-m3-pro-max-2023",
    "mb-pro-16-m3-pro-max-2023",
    "mb-pro-14-m2-pro-max-2023",
    "mb-pro-16-m2-pro-max-2023",
    "mb-pro-14-m1-pro-max-2021",
    "mb-pro-16-m1-pro-max-2021",
    "mb-air-15-m2-2023",
    "mb-air-13-m2-2022",
    "mb-pro-13-m2-2022",
    "mb-air-13-m1-2020",
    "mb-pro-13-m1-2020",
  ];

  var baseSelect = document.getElementById("macbookBaseSelect");
  var modelList = document.getElementById("modelList");
  var finishBlock = document.getElementById("finishBlock");
  var finishList = document.getElementById("finishList");
  var finishColorName = document.getElementById("finishColorName");
  var storageBlock = document.getElementById("storageBlock");
  var storageList = document.getElementById("storageList");
  var summary = document.getElementById("selectionSummary");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var visualImage = document.getElementById("macbookVisualImage");
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
    var rate =
      typeof window !== "undefined" && typeof window.EMPERORISHOP_USD_TO_GHS === "number"
        ? window.EMPERORISHOP_USD_TO_GHS
        : 15.5;
    var ghs = Math.round(Number(value) * rate);
    return "GH₵\u00a0" + ghs.toLocaleString("en-GH");
  }

  function monthlyGhsFromPrice(price) {
    var rate =
      typeof window !== "undefined" && typeof window.EMPERORISHOP_USD_TO_GHS === "number"
        ? window.EMPERORISHOP_USD_TO_GHS
        : 15.5;
    return Math.round((Number(price) / 24) * rate);
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
    visualImage.alt = (finish && finish.label ? finish.label + " — " : "") + (base.label || "MacBook");
  }

  function renderToolbar() {
    var base = selectedBase();
    var model = selectedModel();

    if (!base) {
      toolbarTitle.textContent = "Buy MacBook";
      toolbarPrice.textContent = "Select a family to get started.";
      return;
    }

    toolbarTitle.textContent = model ? model.name : base.label;

    if (model) {
      toolbarPrice.textContent =
        "From " +
        formatPrice(model.price) +
        " or GH₵\u00a0" +
        monthlyGhsFromPrice(model.price).toLocaleString("en-GH") +
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
        "<br />or GH₵\u00a0" +
        monthlyGhsFromPrice(model.price).toLocaleString("en-GH") +
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
        "<br />or GH₵\u00a0" +
        monthlyGhsFromPrice(totalPrice).toLocaleString("en-GH") +
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
      " or GH₵\u00a0" +
      monthlyGhsFromPrice(totalPrice).toLocaleString("en-GH") +
      "/mo. for 24 mo.";
    checkoutBtn.disabled = false;

    toolbarPrice.textContent =
      "From " +
      formatPrice(totalPrice) +
      " or GH₵\u00a0" +
      monthlyGhsFromPrice(totalPrice).toLocaleString("en-GH") +
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
    if (typeof window.emperorishopOpenCheckout === "function") {
      window.emperorishopOpenCheckout();
      return;
    }
    window.location.href = "#checkout";
  });

  window.emperorishopBuyMacbook = {
    getOrderSnapshot: function () {
      var base = selectedBase();
      var model = selectedModel();
      var finish = selectedFinish();
      var storage = selectedStorage();
      if (!base || !model || !finish || !storage) return null;
      var totalUsd = model.price + storage.addPrice;
      var rate =
        typeof window !== "undefined" && typeof window.EMPERORISHOP_USD_TO_GHS === "number"
          ? window.EMPERORISHOP_USD_TO_GHS
          : 15.5;
      var totalGhs = Math.round(totalUsd * rate);
      return {
        familyKey: state.baseKey,
        familyLabel: base.label,
        modelName: model.name,
        finishLabel: finish.label,
        storageLabel: storage.label,
        totalUsd: totalUsd,
        totalGhs: totalGhs,
        amountPesewas: Math.max(100, Math.round(totalGhs * 100)),
        summaryLine:
          base.label +
          " • " +
          model.name +
          " • " +
          finish.label +
          " • " +
          storage.label,
      };
    },
  };

  renderBaseOptions();
  baseSelect.value = "mb-neo-13-a18-2026";
  baseSelect.dispatchEvent(new Event("change"));
})();
