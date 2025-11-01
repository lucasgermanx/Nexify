import * as yup from 'yup'

export  const CouponCreateValidator = yup.object({
  store_reference: yup.string().required(),
  coupon: yup.string().required(),
  coupon_discount: yup.number().required(),
  limited_used: yup.number().required(),
  type: yup.mixed<"direct" | "percentage">().oneOf(["direct", "percentage"]).required(),
})

export const CouponUpdateValidator = yup.object({
  coupon_reference: yup.string().required(),
  coupon: yup.string(),
  coupon_discount: yup.number(),
  limited_used: yup.number(),
  type: yup.mixed<"direct" | "percentage">().oneOf(["direct", "percentage"]),
  activated: yup.boolean()
})

export const UsageCouponValidator = yup.object({
  coupon_reference: yup.string().required(),
})