import { createUser } from "../daos/user.dao";

export const create_users = async (): Promise<void> => {
  await createUser({
    email: "admin@gmail.com",
    name: "admin",
    role: "Admin",
    password: "admin",
  });
  
  await createUser({
    email: "admin1@gmail.com",
    name: "admin1",
    role: "Admin",
    password: "admin1",
  });

  await createUser({
    email: "seller@gmail.com",
    name: "seller",
    role: "Seller",
    password: "seller",
  });

  await createUser({
    email: "seller1@gmail.com",
    name: "seller1",
    role: "Seller",
    password: "seller1",
  });

  await createUser({
    email: "seller2@gmail.com",
    name: "seller2",
    role: "Seller",
    password: "seller2",
  });

  console.log("users created successfully");
};
