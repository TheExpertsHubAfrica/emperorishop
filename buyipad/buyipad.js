(function () {
  var IMG_STD = "../ipad/images/ipad.png";
  var IMG_MINI = "../ipad/images/ipad_mini.png";
  var IMG_AIR = "../ipad/images/ipad_air.png";
  var IMG_PRO = "../ipad/images/ipad_pro.png";

  var PRO11_M5_WIFI = [
    { label: "256GB", price: 999 },
    { label: "512GB", price: 1199 },
    { label: "1TB", price: 1599 },
    { label: "1TB (Nano-texture glass)", price: 1699 },
    { label: "2TB", price: 1999 },
    { label: "2TB (Nano-texture glass)", price: 2099 },
  ];
  var PRO11_M5_CELL = [
    { label: "256GB", price: 1199 },
    { label: "512GB", price: 1399 },
    { label: "1TB", price: 1799 },
    { label: "1TB (Nano-texture glass)", price: 1899 },
    { label: "2TB", price: 2199 },
    { label: "2TB (Nano-texture glass)", price: 2299 },
  ];
  var PRO13_M5_WIFI = [
    { label: "256GB", price: 1299 },
    { label: "512GB", price: 1499 },
    { label: "1TB", price: 1699 },
    { label: "1TB (Nano-texture glass)", price: 1799 },
    { label: "2TB", price: 2099 },
    { label: "2TB (Nano-texture glass)", price: 2199 },
  ];
  var PRO13_M5_CELL = [
    { label: "256GB", price: 1499 },
    { label: "512GB", price: 1699 },
    { label: "1TB", price: 1899 },
    { label: "1TB (Nano-texture glass)", price: 1999 },
    { label: "2TB", price: 2299 },
    { label: "2TB (Nano-texture glass)", price: 2399 },
  ];

  var COLOR_HEX = {
    silver: "#dedede",
    "space gray": "#3a3a3c",
    "space black": "#1c1c1e",
    blue: "#4a90d9",
    pink: "#f5b8c4",
    yellow: "#f5e6a8",
    purple: "#c8c2dd",
    starlight: "#f0e8dc",
    midnight: "#1e1e24",
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

  function storagesFromPrices(tiers, idPrefix) {
    var base = tiers[0].price;
    var pref = idPrefix || "s";
    return tiers.map(function (t, idx) {
      return {
        id: pref + "-" + idx,
        label: t.label,
        addPrice: t.price - base,
      };
    });
  }

  function wifiCell(subline, wifiTiers, cellTiers) {
    return [
      {
        id: "wifi",
        name: "Wi-Fi",
        inches: subline,
        price: wifiTiers[0].price,
        storages: storagesFromPrices(wifiTiers, "wifi"),
      },
      {
        id: "cell",
        name: "Wi-Fi + Cellular",
        inches: subline,
        price: cellTiers[0].price,
        storages: storagesFromPrices(cellTiers, "cell"),
      },
    ];
  }

  function familyEntry(label, img, colors, models) {
    return {
      label: label,
      defaultImage: img,
      models: models,
      finishes: finishesFromList(colors),
      storages: [],
    };
  }

  var data = {
    "ipad-11-a16-2025": familyEntry(
      'iPad 11" — 11th Generation (A16, 2025)',
      IMG_STD,
      "Silver, Blue, Pink, Yellow",
      wifiCell(
        "11-inch Liquid Retina",
        [
          { label: "128GB", price: 349 },
          { label: "256GB", price: 449 },
          { label: "512GB", price: 549 },
        ],
        [
          { label: "128GB", price: 499 },
          { label: "256GB", price: 599 },
          { label: "512GB", price: 699 },
        ]
      )
    ),
    "ipad-mini-a17-2024": familyEntry(
      'iPad mini 8.3" — 7th Generation (A17 Pro, 2024)',
      IMG_MINI,
      "Space Gray, Blue, Purple, Starlight",
      wifiCell(
        "8.3-inch Liquid Retina",
        [
          { label: "128GB", price: 499 },
          { label: "256GB", price: 599 },
          { label: "512GB", price: 699 },
        ],
        [
          { label: "128GB", price: 649 },
          { label: "256GB", price: 749 },
          { label: "512GB", price: 849 },
        ]
      )
    ),
    "ipad-air-11-m3-2025": familyEntry(
      'iPad Air 11" — M3 (2025)',
      IMG_AIR,
      "Blue, Purple, Starlight, Space Gray",
      wifiCell(
        "11-inch Liquid Retina",
        [
          { label: "128GB", price: 599 },
          { label: "256GB", price: 699 },
          { label: "512GB", price: 899 },
          { label: "1TB", price: 1099 },
        ],
        [
          { label: "128GB", price: 749 },
          { label: "256GB", price: 849 },
          { label: "512GB", price: 1049 },
          { label: "1TB", price: 1249 },
        ]
      )
    ),
    "ipad-air-13-m3-2025": familyEntry(
      'iPad Air 13" — M3 (2025)',
      IMG_AIR,
      "Blue, Purple, Starlight, Space Gray",
      wifiCell(
        "13-inch Liquid Retina",
        [
          { label: "128GB", price: 799 },
          { label: "256GB", price: 899 },
          { label: "512GB", price: 1099 },
          { label: "1TB", price: 1299 },
        ],
        [
          { label: "128GB", price: 949 },
          { label: "256GB", price: 1049 },
          { label: "512GB", price: 1249 },
          { label: "1TB", price: 1449 },
        ]
      )
    ),
    "ipad-air-11-m4-2026": familyEntry(
      'iPad Air 11" — M4 (2026)',
      IMG_AIR,
      "Blue, Purple, Starlight, Space Gray",
      wifiCell(
        "11-inch Liquid Retina",
        [
          { label: "128GB", price: 599 },
          { label: "256GB", price: 699 },
          { label: "512GB", price: 899 },
          { label: "1TB", price: 1099 },
        ],
        [
          { label: "128GB", price: 749 },
          { label: "256GB", price: 849 },
          { label: "512GB", price: 1049 },
          { label: "1TB", price: 1249 },
        ]
      )
    ),
    "ipad-air-13-m4-2026": familyEntry(
      'iPad Air 13" — M4 (2026)',
      IMG_AIR,
      "Blue, Purple, Starlight, Space Gray",
      wifiCell(
        "13-inch Liquid Retina",
        [
          { label: "128GB", price: 799 },
          { label: "256GB", price: 899 },
          { label: "512GB", price: 1099 },
          { label: "1TB", price: 1299 },
        ],
        [
          { label: "128GB", price: 949 },
          { label: "256GB", price: 1049 },
          { label: "512GB", price: 1249 },
          { label: "1TB", price: 1449 },
        ]
      )
    ),
    "ipad-pro-11-m4-2024": familyEntry(
      'iPad Pro 11" — M4 (2024)',
      IMG_PRO,
      "Silver, Space Black",
      wifiCell(
        "11-inch Ultra Retina XDR",
        [
          { label: "256GB", price: 999 },
          { label: "512GB", price: 1199 },
          { label: "1TB", price: 1599 },
          { label: "2TB", price: 1999 },
        ],
        [
          { label: "256GB", price: 1199 },
          { label: "512GB", price: 1399 },
          { label: "1TB", price: 1799 },
          { label: "2TB", price: 2199 },
        ]
      )
    ),
    "ipad-pro-13-m4-2024": familyEntry(
      'iPad Pro 13" — M4 (2024)',
      IMG_PRO,
      "Silver, Space Black",
      wifiCell(
        "13-inch Ultra Retina XDR",
        [
          { label: "256GB", price: 1299 },
          { label: "512GB", price: 1499 },
          { label: "1TB", price: 1899 },
          { label: "2TB", price: 2299 },
        ],
        [
          { label: "256GB", price: 1499 },
          { label: "512GB", price: 1699 },
          { label: "1TB", price: 2099 },
          { label: "2TB", price: 2499 },
        ]
      )
    ),
    "ipad-pro-11-m5-2025": familyEntry(
      'iPad Pro 11" — M5 (2025)',
      IMG_PRO,
      "Silver, Space Black",
      wifiCell("11-inch Ultra Retina XDR", PRO11_M5_WIFI, PRO11_M5_CELL)
    ),
    "ipad-pro-13-m5-2025": familyEntry(
      'iPad Pro 13" — M5 (2025)',
      IMG_PRO,
      "Silver, Space Black",
      wifiCell("13-inch Ultra Retina XDR", PRO13_M5_WIFI, PRO13_M5_CELL)
    ),
  };

  var FAMILY_ORDER = [
    "ipad-11-a16-2025",
    "ipad-mini-a17-2024",
    "ipad-air-11-m4-2026",
    "ipad-air-13-m4-2026",
    "ipad-pro-11-m5-2025",
    "ipad-pro-13-m5-2025",
    "ipad-air-11-m3-2025",
    "ipad-air-13-m3-2025",
    "ipad-pro-11-m4-2024",
    "ipad-pro-13-m4-2024",
  ];

  var baseSelect = document.getElementById("ipadBaseSelect");
  var modelList = document.getElementById("modelList");
  var finishBlock = document.getElementById("finishBlock");
  var finishList = document.getElementById("finishList");
  var finishColorName = document.getElementById("finishColorName");
  var storageBlock = document.getElementById("storageBlock");
  var storageList = document.getElementById("storageList");
  var summary = document.getElementById("selectionSummary");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var visualImage = document.getElementById("ipadVisualImage");
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

  function currentStorageList() {
    var base = selectedBase();
    var model = selectedModel();
    if (!base || !model) return [];
    if (model.storages && model.storages.length) return model.storages;
    return base.storages || [];
  }

  function selectedStorage() {
    var list = currentStorageList();
    return list.find(function (item) {
      return item.id === state.storageId;
    });
  }

  function updateVisual() {
    var base = selectedBase();
    var finish = selectedFinish();
    if (!base) return;
    var src = finish && finish.image ? finish.image : base.defaultImage;
    visualImage.src = src;
    visualImage.alt = (finish && finish.label ? finish.label + " — " : "") + (base.label || "iPad");
  }

  function renderToolbar() {
    var base = selectedBase();
    var model = selectedModel();

    if (!base) {
      toolbarTitle.textContent = "Buy iPad";
      toolbarPrice.textContent = "Select a family to get started.";
      return;
    }

    toolbarTitle.textContent = model ? model.name + " — " + base.label : base.label;

    if (model) {
      toolbarPrice.textContent =
        "From " +
        formatPrice(model.price) +
        " or GH₵\u00a0" +
        monthlyGhsFromPrice(model.price).toLocaleString("en-GH") +
        "/mo. for 24 mo.*";
    } else {
      toolbarPrice.textContent = "Choose Wi-Fi or Wi-Fi + Cellular to see pricing.";
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

    var storages = currentStorageList();
    storages.forEach(function (storage) {
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

  window.emperorishopBuyiPad = {
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
  baseSelect.value = "ipad-11-a16-2025";
  baseSelect.dispatchEvent(new Event("change"));
})();
