import { z } from 'zod';

export const PicPayAddTokenValidator = z.object({
  store_reference: z.string().nonempty(),
  picpayToken: z.string().nonempty(),
  sellerToken: z.string().nonempty(),
});
