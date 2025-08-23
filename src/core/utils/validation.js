// Validación y limpieza de números para campos price, discount, discountPrice

export function toNumber(value, defaultValue = 0) {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
}

export function validateProduct(product) {
    if (
        !product ||
        typeof product.id !== "number" ||
        typeof product.name !== "string"
    ) {
        return false;
    }

    // Validar que estos campos sean números válidos
    const price = toNumber(product.price);
    const discount = toNumber(product.discount);
    const discountPrice = toNumber(product.discountPrice);

    if (
        price < 0 ||
        discount < 0 ||
        discountPrice < 0
    ) {
        return false;
    }

    return true;
}

// Función para limpiar los campos numéricos del producto
export function cleanProductNumbers(product) {
    return {
        ...product,
        price: toNumber(product.price),
        discount: toNumber(product.discount),
        discountPrice: toNumber(product.discountPrice),
    };
}