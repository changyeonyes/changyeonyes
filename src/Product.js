import { Console } from "@woowacourse/mission-utils";
import { readFile } from "fs/promises";

class Product {
  async product() {
    const products = await this.loadProducts();
    products.forEach((product) => {
      const formattedPrice = Number(product.price).toLocaleString();
      Console.print(
        `- ${product.name} ${formattedPrice}원 ${product.quantity} ${product.promotion}`
      );
    });
    return products;
  }

  async loadProducts() {xa
    const data = await readFile("./public/products.md", "utf-8");
    const lines = data.trim().split("\n");
    const [header, ...rows] = lines;
    const keys = header.split(",");

    const products = rows.map((row) => {
      const values = row.split(",");
      const product = {};
      keys.forEach((key, index) => {
        product[key.trim()] = values[index].trim();
      });
      return product;
    });

    return products;
  }
}

export default Product;

