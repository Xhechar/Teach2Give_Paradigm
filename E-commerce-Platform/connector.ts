interface Product {
  id: string,
  image: string,
  name: string,
  description: string,
  price: string
}

class ProductManager {
  static startUrl:string | any;

  constructor(startUrl: string) {
    ProductManager.startUrl = startUrl;
  }

  public static async getProducts(): Promise<Product[]> {
    const response = await fetch(`${ProductManager.startUrl}/products`);
    const data = await response.json();
    return data
  }

  public static async getProductByName(name: string): Promise<Product[]> {
    const response = await fetch(`${ProductManager.startUrl}/products?name=${name}`);
    const data = await response.json();
    return data;
  }

  public static async createProduct(product: Partial<Product>): Promise<void> {
    await fetch(`${this.startUrl}/products`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }

  public static async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const response = await fetch(`${this.startUrl}/products/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    const data = await response.json();
    return data;
  }

  public static async deleteProduct(id: string): Promise<void> {
    await fetch(`${this.startUrl}/products/${id}`, {
      method: 'DELETE'
    })
  }
}