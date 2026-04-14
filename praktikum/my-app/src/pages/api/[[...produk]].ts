// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const segments = Array.isArray(req.query.produk) ? req.query.produk : [];

  if (segments[0] !== "produk") {
    res.status(200).json({
      status: true,
      status_code: 200,
    });
    return;
  }

  if (segments[1]) {
    const data = await retrieveDataByID("products", segments[1]);

    if (!data) {
      res.status(200).json({
        status: true,
        status_code: 200,
      });
      return;
    }

    res.status(200).json({ status: true, status_code: 200, data });
    return;
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
  };
}
