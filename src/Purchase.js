import { Console } from "@woowacourse/mission-utils";
import { writeFile } from "fs/promises";

class Purchase {
  async purchaseProducts(products, retryCount = 0) {
    const MAX_RETRIES = 1; 

    try {
      const userInput = await Console.readLineAsync(
        "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
      );

      const items = userInput.split(",").map((item) => {
        const [name, quantity] = item.replace(/[\[\]]/g, "").split("-");
        return { name: name.trim(), quantity: parseInt(quantity.trim(), 10) };
      });

      items.forEach((item) => {
        const product = products.find((product) => product.name === item.name);

        if (product) {
          if (item.quantity > product.quantity) {
            throw new Error(
              `재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
            );
          } else {
            product.quantity -= item.quantity;
          }
        } else {
          throw new Error(`상품 ${item.name}을(를) 찾을 수 없습니다.`);
        }
      });

      const keys = Object.keys(products[0]);
      const updatedData = [
        keys.join(","),
        ...products.map(
          (product) =>
            `${product.name},${product.price},${product.quantity},${
              product.promotion || ""
            }`
        ),
      ].join("\n");

      await writeFile("./public/products.md", updatedData, "utf-8");
      Console.print("구매가 완료되었습니다.");
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
      if (retryCount < MAX_RETRIES) {
        await this.purchaseProducts(products, retryCount + 1); 
      }
    }
  }
}

export default Purchase;

