import { Console } from "@woowacourse/mission-utils";
import Product from "./Product.js";
import Purchase from "./Purchase.js";

class Store {
  async play() {
    try {
      const productInstance = new Product(); // Product 클래스의 인스턴스 생성
      const products = await productInstance.product(); // 상품 목록 출력 후 제품 데이터를 가져옴
      
      const purchaseInstance = new Purchase(); // Purchase 클래스의 인스턴스 생성
      await purchaseInstance.purchaseProducts(products, 0); // 구매 프로세스 시작, 제품 데이터와 재시도 횟수 초기화 전달
    } catch (error) {
      Console.print(
        `[ERROR] ${error.message || "알 수 없는 오류가 발생했습니다."}`
      );
    }
  }
}

export default Store;
