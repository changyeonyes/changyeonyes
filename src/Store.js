import { Console } from "@woowacourse/mission-utils";
import Product from "./Product.js";
import Purchase from "./Purchase.js";

class Store {
  async play() {
    try {
      const productInstance = new Product();
      const products = await productInstance.product(); 

      const purchaseInstance = new Purchase(); 
      await purchaseInstance.purchaseProducts(products, 0); 
    } catch (error) {
      Console.print(
        `[ERROR] ${error.message || "알 수 없는 오류가 발생했습니다."}`
      );
    }
  }
}

export default Store;
