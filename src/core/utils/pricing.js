export const getFinalUnitPrice = (item) => {
  const promoMinQty = 3
  const price = Number(item.price)
  const discountPrice = Number(item.discountPrice)

  const hasPromo = Boolean(item.promoNote)
  const promoApplies = hasPromo && item.quantity >= promoMinQty

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price &&
    (!hasPromo || promoApplies)

  return hasDiscount ? discountPrice : price
}

export const getItemTotals = (item) => {
  const unitPrice = getFinalUnitPrice(item)

  return {
    unitPrice,
    total: unitPrice * item.quantity,
    hasDiscount: unitPrice < Number(item.price),
    originalTotal: Number(item.price) * item.quantity
  }
}

export const formatPrice = (value) => {
  const num = Number(value)
  return isNaN(num) ? "0.00" : num.toFixed(2)
}