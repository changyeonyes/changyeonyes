import Store from "./Store.js";

class App {
  async run() {
    const store = new Store();
    await store.play();
  }
}
export default App;
