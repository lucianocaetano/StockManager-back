import { create_products } from "./product.seed";
import { create_sale_products } from "./saleProducts.seed";
import { create_users } from "./user.seed";

(async () => {
  await create_users();
  await create_products();
  await create_sale_products();
})();
