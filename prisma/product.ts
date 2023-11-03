import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Products {
  image: string;
  title: string;
  price: number;
  category: string;
}

export const createProduct = async ({
  category,
  image,
  price,
  title,
}: Products) => {
  const product = await prisma.product.create({
    data: {
      category,
      price,
      title,
      image,
    },
  });

  return product;
};

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
};
