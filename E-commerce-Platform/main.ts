import { log } from "console";

const myManager = new ProductManager("http://localhost:3000");

class UserInteface {
  product?: Partial<Product>;
  cartProducts: Product[] = [];
  cartNumberCount: number = 0;

  searchBox = document.querySelector(".search-box") as HTMLInputElement;
  cancelBtn = document.querySelector(".cancel") as HTMLButtonElement;
  saveBtn = document.querySelector(".save") as HTMLButtonElement;
  viewBtn = document.querySelector(".view") as HTMLButtonElement;
  createBtn = document.querySelector(".create") as HTMLButtonElement;
  // deleteBtn = document.querySelector('.delete') as HTMLButtonElement;
  commodityName = document.querySelector(
    ".name-of-commodity"
  ) as HTMLInputElement;
  commodityDescription = document.querySelector(
    ".description-of-commodity"
  ) as HTMLInputElement;
  commodityPrice = document.querySelector(
    ".price-of-commodity"
  ) as HTMLInputElement;
  commodityImage = document.querySelector(
    ".image-of-commodity"
  ) as HTMLInputElement;
  searchBtn = document.querySelector(".search") as HTMLButtonElement;
  displayingDiv = document.querySelector(".displaying-div") as HTMLDivElement;
  customDiv = document.querySelector(".custom-div-contents") as HTMLDivElement;
  customDiv1 = document.querySelector(".custom-div1") as HTMLDivElement;
  cancelForm = document.querySelector("#cancel-form") as HTMLButtonElement;
  updateProduct = document.querySelector(
    "#update-product"
  ) as HTMLButtonElement;

  homeDisplay = document.querySelector(
    ".displaying-div-home-page"
  ) as HTMLDivElement;

  idValue!: string;
  newName = document.querySelector("#new-name") as HTMLInputElement;
  newDescription = document.querySelector(
    "#new-description"
  ) as HTMLInputElement;
  newPrice = document.querySelector("#new-price") as HTMLInputElement;
  newImage = document.querySelector("#new-image") as HTMLInputElement;
  cancelerForm = document.querySelector("#new-image") as HTMLButtonElement;
  updaterProduct = document.querySelector("#new-image") as HTMLButtonElement;

  cartContainer = document.querySelector(".cart-container") as HTMLDivElement;

  cartPageDiv = document.querySelector(
    ".displaying-div-cart-page"
  ) as HTMLDivElement;

  constructor() {
    this.displayProducts();
    this.displayProductsOnHomePage();
    // this.selectCartButton();
  }

  removeExistingItems() {
    let remover = document.querySelectorAll(".displaying-div .product-tile");
    remover.forEach((item) => {
      item.remove();
    });
  }

  initialiseSearchButton() {
    this.searchBtn.addEventListener("click", () => {
      let searchInput = this.searchBox.value;

      let isSearchValid = searchInput !== "";

      if (isSearchValid) {
        this.displayProductByName(searchInput);
      } else {
        this.searchBox.setAttribute(
          "placeholder",
          "!! enter appropriate value"
        );

        setTimeout(() => {
          this.searchBox.setAttribute("placeholder", "");
        }, 2000);
      }
    });
  }
  initialiseViewButton() {
    this.viewBtn.addEventListener("click", () => {
      this.removeExistingItems();
      this.displayProducts();
    });
  }
  initialiseCreateButton() {
    this.createBtn.addEventListener("click", () => {
      console.log("create");

      this.customDiv.style.display = "block";
    });
  }
  initialiseCancelButton() {
    this.cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.customDiv.style.display = "none";
    });
  }

  initialiseSaveButton() {
    this.saveBtn.addEventListener("click", (event) => {
      let nameInput = this.commodityName.value;
      let descriptionInput = this.commodityDescription.value;
      let priceInput = this.commodityPrice.value;
      let imageInput = this.commodityImage.value;

      let isSaveValid = nameInput !== "" && priceInput !== "";

      let priceManipulator = `Ksh: ${priceInput}`;

      event.preventDefault();
      if (isSaveValid) {
        console.log("inside if statement");

        let id1 = `${Date.now()}`;

        this.product = {
          id: id1,
          image: imageInput,
          name: nameInput,
          description: descriptionInput,
          price: priceManipulator,
        };

        ProductManager.createProduct(this.product);
        this.displayProducts();
      } else {
        this.commodityName.setAttribute(
          "placeholder",
          "!! enter appropriate value"
        );
        this.commodityPrice.setAttribute(
          "placeholder",
          "!! enter appropriate value"
        );
        this.commodityImage.setAttribute(
          "placeholder",
          "!! enter appropriate value"
        );

        setTimeout(() => {
          this.commodityName.setAttribute("placeholder", "");
          this.commodityPrice.setAttribute("placeholder", "");
          this.commodityImage.setAttribute("placeholder", "");
        }, 2000);
      }
    });
  }

  async displayProductByName(name: string) {
    try {
      this.removeExistingItems();
      let searchedArray = await ProductManager.getProductByName(name);
      searchedArray.forEach((item) => {
        let myId = item.id;

        let productTile = document.createElement("div");
        productTile.className = "product-tile";

        let imageHolder = document.createElement("div");
        imageHolder.className = "image-holder";

        let imageContent = document.createElement("img");
        imageContent.setAttribute("src", item.image);

        let bodyHolder = document.createElement("div");
        bodyHolder.className = "body-holder";

        let commodityNme = document.createElement("h2");
        commodityNme.textContent = item.name;
        commodityNme.style.marginBottom = "5px";

        let commodityDscrp = document.createElement("p");
        commodityDscrp.textContent = item.description;

        let commodityPrc = document.createElement("p");
        commodityPrc.textContent = item.price;

        let buttonHolder = document.createElement("div");
        buttonHolder.className = "button-holder";

        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";

        imageHolder.appendChild(imageContent);

        bodyHolder.appendChild(commodityNme);
        bodyHolder.appendChild(commodityDscrp);
        bodyHolder.appendChild(commodityPrc);

        buttonHolder.appendChild(updateBtn);
        buttonHolder.appendChild(deleteBtn);

        productTile.appendChild(imageHolder);
        productTile.appendChild(bodyHolder);
        productTile.appendChild(buttonHolder);

        this.displayingDiv.appendChild(productTile);
      });
    } catch (error) {}
  }

  async displayProducts() {
    try {
      let myArray = await ProductManager.getProducts();

      this.removeExistingItems();

      myArray.forEach((product) => {
        let myId = product.id;

        let productTile = document.createElement("div");
        productTile.className = "product-tile";

        let imageHolder = document.createElement("div");
        imageHolder.className = "image-holder";

        let imageContent = document.createElement("img");
        imageContent.setAttribute("src", product.image);

        let bodyHolder = document.createElement("div");
        bodyHolder.className = "body-holder";

        let commodityNme = document.createElement("h2");
        commodityNme.textContent = product.name;
        commodityNme.style.marginBottom = "5px";

        let commodityDscrp = document.createElement("p");
        commodityDscrp.textContent = product.description;

        let commodityPrc = document.createElement("p");
        commodityPrc.textContent = product.price;

        let buttonHolder = document.createElement("div");
        buttonHolder.className = "button-holder";

        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";

        imageHolder.appendChild(imageContent);

        bodyHolder.appendChild(commodityNme);
        bodyHolder.appendChild(commodityDscrp);
        bodyHolder.appendChild(commodityPrc);

        buttonHolder.appendChild(updateBtn);
        buttonHolder.appendChild(deleteBtn);

        productTile.appendChild(imageHolder);
        productTile.appendChild(bodyHolder);
        productTile.appendChild(buttonHolder);

        this.displayingDiv.appendChild(productTile);

        deleteBtn.addEventListener("click", () => {
          let personalId = myId;
          ProductManager.deleteProduct(personalId);
          this.displayProducts();
        });

        updateBtn.addEventListener("click", () => {
          let idD = myId;
          this.idValue = idD;
          console.log("i am clicked");
          this.customDiv1.innerHTML = `
          <div class="popup">
            <form>
              <div class="form-input-label-containel">
                <label>Name of Commodity:</label>
                <input id="new-name" type="text" class="name-of-commodity" value="${product.name}">
              </div>
              <div class="form-input-label-containel">
                <label>Description:</label>
                <input
                  id="new-description"
                  style="border: none"
                  type="text"
                  class="description-of-commodity"
                  value="${product.description}"
                />
              </div>
  
              <div class="form-input-label-containel">
                <label>Price:</label>
                <input id="new-price" type="text" class="price-of-commodity" value="${product.price}"/>
              </div>
  
              <div class="form-input-label-containel">
                <label>Commodity Image Link:</label>
                <input
                  id="new-image" 
                  type="text"
                  accept="image/*"
                  class="image-of-commodity"
                  value="${product.image}"
                />
              </div>
              <div class="form-input-label-containel1">
                <button id="cancel-form" class="cancel">Cancel Popup</button>
                <button id="update-product" class="save">Update Product</button>
              </div>
            </form>
          </div>`;

          this.newName = document.querySelector(
            "#new-name"
          ) as HTMLInputElement;
          this.newDescription = document.querySelector(
            "#new-description"
          ) as HTMLInputElement;
          this.newPrice = document.querySelector(
            "#new-price"
          ) as HTMLInputElement;
          this.newImage = document.querySelector(
            "#new-image"
          ) as HTMLInputElement;
          this.cancelerForm = document.querySelector(
            "#cancel-form"
          ) as HTMLButtonElement;
          this.updaterProduct = document.querySelector(
            "#update-product"
          ) as HTMLButtonElement;

          this.cancelerForm.addEventListener("click", (event) => {
            // event.preventDefault();
            this.customDiv1.style.display = "none";
          });

          this.updaterFunction();
        });
      });
    } catch (error) {
      // console.error("errorr: ", error);
    }
  }

  async displayProductsOnHomePage() {
    try {
      let myArray = await ProductManager.getProducts();

      // this.removeExistingItems();

      myArray.forEach((product) => {
        let myId = product.id;

        let productTile = document.createElement("div");
        productTile.className = "product-tile";
        productTile.style.height = "380px";

        let imageHolder = document.createElement("div");
        imageHolder.className = "image-holder";

        let imageContent = document.createElement("img");
        imageContent.setAttribute("src", product.image);

        let bodyHolder = document.createElement("div");
        bodyHolder.className = "body-holder";

        let commodityNme = document.createElement("h2");
        commodityNme.textContent = product.name;
        commodityNme.style.marginBottom = "5px";

        let commodityDscrp = document.createElement("p");
        commodityDscrp.textContent = product.description;

        let commodityPrc = document.createElement("p");
        commodityPrc.textContent = product.price;

        let ratingsContainer = document.createElement("div");
        ratingsContainer.className = "stars-container";

        for (let starCount = 0; starCount < 5; starCount++) {
          let star = document.createElement("img");
          star.setAttribute("src", "icons/star_rate_40dp.svg");
          star.style.width = "25px";
          ratingsContainer.appendChild(star);
        }

        let buttonHolder = document.createElement("div");
        buttonHolder.className = "button-holder";
        buttonHolder.style.width = "100%";
        buttonHolder.style.height = "100%";

        let viewItemBtn = document.createElement("button");
        viewItemBtn.innerHTML = `<img src="icons/visibility_24dp.svg">`;

        let addButton = document.createElement("button");
        addButton.className = "delete";
        addButton.innerHTML = `<img src="icons/add_shopping_cart_24dp.svg">`;

        imageHolder.appendChild(imageContent);

        bodyHolder.appendChild(commodityNme);
        bodyHolder.appendChild(commodityDscrp);
        bodyHolder.appendChild(commodityPrc);

        buttonHolder.appendChild(viewItemBtn);
        buttonHolder.appendChild(addButton);

        productTile.appendChild(imageHolder);
        productTile.appendChild(bodyHolder);
        productTile.appendChild(ratingsContainer);
        productTile.appendChild(buttonHolder);

        this.homeDisplay.appendChild(productTile);

        addButton.addEventListener("click", () => {
          console.log("i am clicked");
          let decider: boolean = true;

          if (decider) {
            console.log("inside the decider");
            let cartCount = document.createElement("p");
            cartCount.className = "dynamic";
            this.cartNumberCount += 1;
            cartCount.textContent = `${this.cartNumberCount}`;
            this.cartContainer.appendChild(cartCount);
            this.cartProducts.push(product);
            console.log(this.cartProducts);

            decider = false;
          } else {
            console.log("Already Added Item To Cart.");
          }
        });
      });
    } catch (error) {
      // console.error("errorr: ", error);
    }
  }

  selectCartButton() {
    let cartItems = document.querySelector("#cart-items") as HTMLButtonElement;

    if (cartItems) {
      cartItems.addEventListener("click", () => {
        console.log("cart clicked");
        window.location.href = "cart.html";
        console.log(this.cartProducts);

        this.displayProductsOnCartPage();
      });
    } else {
      console.log("Not Created the Cart DOM");
    }
  }

  async displayProductsOnCartPage() {
    try {
      this.cartProducts.forEach((product) => {
        let myId = product.id;

        let productTile = document.createElement("div");
        productTile.className = "product-tile";
        productTile.style.height = "380px";

        let imageHolder = document.createElement("div");
        imageHolder.className = "image-holder";

        let imageContent = document.createElement("img");
        imageContent.setAttribute("src", product.image);

        let bodyHolder = document.createElement("div");
        bodyHolder.className = "body-holder";

        let commodityNme = document.createElement("h2");
        commodityNme.textContent = product.name;
        commodityNme.style.marginBottom = "5px";

        let commodityDscrp = document.createElement("p");
        commodityDscrp.textContent = product.description;

        let commodityPrc = document.createElement("p");
        commodityPrc.textContent = product.price;

        let ratingsContainer = document.createElement("div");
        ratingsContainer.className = "stars-container";

        for (let starCount = 0; starCount < 5; starCount++) {
          let star = document.createElement("img");
          star.setAttribute("src", "icons/star_rate_40dp.svg");
          star.style.width = "25px";
          ratingsContainer.appendChild(star);
        }

        let buttonHolder = document.createElement("div");
        buttonHolder.className = "button-holder";
        buttonHolder.style.width = "100%";
        buttonHolder.style.height = "100%";

        let viewItemBtn = document.createElement("button");
        viewItemBtn.innerHTML = `<img src="icons/visibility_24dp.svg">`;

        let addButton = document.createElement("button");
        addButton.className = "delete";
        addButton.innerHTML = `<img src="icons/add_shopping_cart_24dp.svg">`;

        imageHolder.appendChild(imageContent);

        bodyHolder.appendChild(commodityNme);
        bodyHolder.appendChild(commodityDscrp);
        bodyHolder.appendChild(commodityPrc);

        buttonHolder.appendChild(viewItemBtn);
        buttonHolder.appendChild(addButton);

        productTile.appendChild(imageHolder);
        productTile.appendChild(bodyHolder);
        productTile.appendChild(ratingsContainer);
        productTile.appendChild(buttonHolder);

        this.cartPageDiv.appendChild(productTile);
      });
    } catch (error) {
      // console.error("errorr: ", error);
    }
  }

  async updaterFunction() {
    try {
      this.updaterProduct.addEventListener("click", async (event) => {
        let nameValue = this.newName.value;
        let descriptionValue = this.newDescription.value;
        let priceValue = this.newPrice.value;
        let imageValue = this.newImage.value;

        event.preventDefault();

        console.log("Update Clicked");

        let nameCheck = nameValue;
        let descriptionCheck = descriptionValue;
        let priceCheck = priceValue;
        let imageCheck = imageValue;

        console.log(nameCheck + descriptionCheck + priceCheck + imageCheck);

        let myIdentifier = this.idValue;
        let isCorrect =
          nameCheck !== "" && descriptionCheck !== "" && priceCheck !== "";

        if (isCorrect) {
          console.log("inside if statement");

          let newObject: Partial<Product> = {
            id: myIdentifier,
            name: nameCheck,
            description: descriptionCheck,
            price: priceCheck,
            image: imageCheck,
          };
          console.log(newObject);

          await ProductManager.updateProduct(myIdentifier, newObject);
          this.removeExistingItems();
          this.displayProducts();
        } else {
          console.log("fields are empty");

          // newName.setAttribute(
          //   "placeholder",
          //   "!! enter appropriate value"
          // );
          // newPrice.setAttribute(
          //   "placeholder",
          //   "!! enter appropriate value"
          // );
          // newImage.setAttribute(
          //   "placeholder",
          //   "!! enter appropriate value"
          // );
        }
      });
    } catch (error) {
      console.error("error in updating: ", error);
    }
  }
}
let initialiser = new UserInteface();
initialiser.initialiseSaveButton();
initialiser.initialiseCreateButton();
initialiser.initialiseCancelButton();
initialiser.initialiseSearchButton();
initialiser.initialiseViewButton();
