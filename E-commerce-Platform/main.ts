import { log } from "console";

const myManager = new ProductManager("http://localhost:3000");

class UserInteface {
  product?: Partial<Product>;

  searchBox = document.querySelector(".search-box") as HTMLInputElement;
  cancelBtn = document.querySelector(".cancel") as HTMLButtonElement;
  saveBtn = document.querySelector(".save") as HTMLInputElement;
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


  idValue!: string;
  newName = document.querySelector('#new-name') as HTMLInputElement;
  newDescription = document.querySelector('#new-description') as HTMLInputElement;
  newPrice = document.querySelector('#new-price') as HTMLInputElement;
  newImage = document.querySelector('#new-image') as HTMLInputElement;
  cancelerForm = document.querySelector('#new-image') as HTMLButtonElement;
  updaterProduct = document.querySelector('#new-image') as HTMLButtonElement;

  constructor() {
    this.displayProducts();

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

    this.viewBtn.addEventListener("click", () => {
      this.removeExistingItems();
      this.displayProducts();
    });

    this.createBtn.addEventListener("click", () => {
      console.log("create");

      this.customDiv.style.display = "block";
    });
    this.cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.customDiv.style.display = "none";
    });
  }

  removeExistingItems() {
    let remover = document.querySelectorAll(".displaying-div .product-tile");
    remover.forEach((item) => {
      item.remove();
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

          this.newName = document.querySelector('#new-name') as HTMLInputElement;
          this.newDescription = document.querySelector('#new-description') as HTMLInputElement;
          this.newPrice = document.querySelector('#new-price') as HTMLInputElement;
          this.newImage = document.querySelector('#new-image') as HTMLInputElement;
          this.cancelerForm = document.querySelector('#cancel-form') as HTMLButtonElement;
          this.updaterProduct = document.querySelector('#update-product') as HTMLButtonElement;

          
      this.cancelerForm.addEventListener('click', (event) => {
        // event.preventDefault();
        this.customDiv1.style.display = 'none';
      })

          this.updaterFunction();
        });
      });
    } catch (error) {
      console.error("errorr: ", error);
    }
  }

  async updaterFunction() {
    try {

      this.updaterProduct.addEventListener('click', async (event) => {
        let nameValue = this.newName.value;
        let descriptionValue = this.newDescription.value;
        let priceValue = this.newPrice.value;
        let imageValue = this.newImage.value;
        
        event.preventDefault();
  
        console.log('Update Clicked');
  
        let nameCheck = nameValue;
        let descriptionCheck = descriptionValue;
        let priceCheck = priceValue;
        let imageCheck = imageValue;
  
        console.log(nameCheck + descriptionCheck + priceCheck + imageCheck);
  
        let myIdentifier = this.idValue;
        let isCorrect = nameCheck !== '' && descriptionCheck !== '' && priceCheck !== '';
  
        if (isCorrect) {
          console.log('inside if statement');
          
  
          let newObject: Partial<Product> = {
            id: myIdentifier,
            name: nameCheck,
            description: descriptionCheck,
            price: priceCheck,
            image: imageCheck
          }
          console.log(newObject);
          
  
          await ProductManager.updateProduct(myIdentifier, newObject);
          this.removeExistingItems();
          this.displayProducts();
        }
        else {

          console.log('fields are empty');
          
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
  
      })
      
    } catch (error) {
      console.error('error in updating: ', error)
    }
  }
}

const runApp = new UserInteface();
