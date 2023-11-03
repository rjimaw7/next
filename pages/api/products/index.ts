import { createProduct, deleteProduct, getAllProducts } from "@/prisma/product";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    switch (req.method) {
      case "POST": {
        const { image, title, price, category } = req.body;

        const new_product = await createProduct({
          image,
          title,
          price,
          category,
        });

        return res.status(201).json(new_product as any);
      }
      case "GET": {
        const allProducts = await getAllProducts();
        return res.status(200).json(allProducts as any);
      }

      case "DELETE": {
        const { id } = req.query;

        await deleteProduct(id as string);

        return res.status(200).json({ message: "Product Delete Success" });
      }
    }
  } catch (error) {
    console.log("Error : ", error);
  }
}
