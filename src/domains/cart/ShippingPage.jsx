import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useUbigeo } from "@/core/hooks/useUbigeo"
import { useCartContext } from "@/core/context/CartContext"
import { useCreateOrder } from "@/core/hooks/useCreateOrder"
import { getFinalUnitPrice } from "@/core/utils/pricing"
import { useNavigate } from "react-router-dom"
import GeneralButton from "@/shared/ui/GeneralButton"
import InputField from '../../shared/ui/InputField'
import OrderSummary from './OrderSummary'
import styles from "./ShippingPage.module.css"

export default function ShippingPage() {

  const navigate = useNavigate()

  const {
    departments,
    provinces,
    districts,
    department,
    province,
    ubigeo,
    setDepartment,
    setProvince,
    setUbigeo
  } = useUbigeo()

  const {
    cartItems,
    subtotal,
    totalDiscount,
    totalPrice
  } = useCartContext()

  const { createOrder } = useCreateOrder()

  const [deliveryMethod, setDeliveryMethod] = useState("home")
  const isHomeDelivery = deliveryMethod === "home"

  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    documentNumber: '',
    phone: '',
    address: '',
    reference: ''
  })

  // ✅ TOTAL ITEMS derivado del carrito (seguro)
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  )

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateOrder = async () => {
    if (!cartItems.length) {
      alert("El carrito está vacío")
      return
    }

    try {
      const order = await createOrder({
        deliveryMethod,
        totalItems: totalItems,
        shipping: deliveryMethod === "home" ? {
          name: formData.name,
          lastname: formData.lastname,
          documentType,
          documentNumber,
          phone: formData.phone,
          ubigeo,
          address: formData.address,
          reference: formData.reference
        } : null,
        items: cartItems.map(item => {
          const unitPrice = Number(getFinalUnitPrice(item)) || 0
          const quantity = Number(item.quantity) || 1
          return {
            productId: Number(item.productId ?? item.id) || 0,
            variantId: Number(item.variantId) || 0,
            productName: item.name || '',
            unitPrice,                   
            quantity,
            total: unitPrice * quantity
          }
        }),
        totals: {
          subtotal: Number(subtotal) || 0,
          discount: Number(totalDiscount) || 0,
          total: Number(totalPrice) || 0
        }
      })
      // 🔍 inspeccionamos qué valores vamos a enviar
      console.log("✅ Orden creada:", order)
      navigate(`/checkout/payment/${order.orderId}`)

    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  /* ================= VALIDACIÓN ================= */
  const isFormValid = !isHomeDelivery || (
    formData.name.trim() &&
    formData.lastname.trim() &&
    formData.phone.trim() &&
    documentType &&
    documentNumber &&
    department &&
    province &&
    ubigeo && 
    ubigeo.length === 6 &&
    formData.address.trim() &&
    formData.reference.trim() &&
    (documentType !== 'DNI' || documentNumber.length === 8)
  )

  return (
    <div className={`container`}>

      <div className={styles.checkout}>

        <div className={styles.left}>

          <h1 className={styles.title}>Elige tu método de entrega</h1>
          {/* MÉTODO DE ENTREGA */}
          <div className={styles.deliveryOptions}>

            {/* DOMICILIO */}
            <label
              className={`${styles.deliveryCard} ${
                isHomeDelivery ? styles.active : ""
              }`}
            >
              <input
                type="radio"
                name="delivery"
                checked={isHomeDelivery}
                onChange={() => setDeliveryMethod("home")}
              />
              <div className={styles.cardContent}>
                <span className={styles.icon}><FontAwesomeIcon icon={faTruckFast} /></span>
                <span>Envío a domicilio</span>
              </div>

              <span className={styles.check}></span>
            </label>

            {/* TIENDA */}
            <label
              className={`${styles.deliveryCard} ${
                !isHomeDelivery ? styles.active : ""
              }`}
            >
              <input
                type="radio"
                name="delivery"
                checked={!isHomeDelivery}
                onChange={() => setDeliveryMethod("store")}
              />
              <div className={styles.cardContent}>
                <span className={styles.icon}><FontAwesomeIcon icon={faStore} /></span>
                <span>Retiro en tienda</span>
              </div>

              <span className={styles.check}></span>
            </label>
          </div>

          {/* FORMULARIO SOLO SI ES A DOMICILIO */}
          {isHomeDelivery && (
            <>
              <div className={styles.lineDivider}></div>

              <form className={styles.shippingForm}>

                <div className={styles.formRow}>
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    size="large"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    type="text"
                    name="lastname"
                    placeholder="Apellidos"
                    size="large"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <select
                    className={styles.selectID}
                    value={documentType}
                    onChange={e => {
                      setDocumentType(e.target.value)
                      setDocumentNumber('')
                    }}
                  >
                    <option value="">Tipo documento</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                  </select>
                  <InputField
                    name="documentNumber"
                    placeholder={
                      documentType === 'DNI'
                        ? 'Número de DNI (8 dígitos)'
                        : documentType === 'CE'
                        ? 'Número de CE'
                        : 'Número de documento'
                    }
                    value={documentNumber}
                    maxLength={documentType === 'DNI' ? 8 : 12}
                    disabled={!documentType}
                    size="large"
                    required
                    onChange={e => {
                      const value = e.target.value.replace(/\D/g, '')
                      setDocumentNumber(value)
                    }}
                  />
                  <InputField
                    type="tel"
                    name="phone"
                    placeholder="Celular"
                    size="large"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <select 
                    className={styles.selectUB} 
                    value={department} 
                    onChange={e => setDepartment(e.target.value)}
                  >
                    <option value="">Departamento</option>
                    {departments.map(d => (
                      <option key={d.departmentName} value={d.departmentName}>
                        {d.departmentName}
                      </option>
                    ))}
                  </select>

                  <select
                    className={styles.selectUB}
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    disabled={!department}
                  >
                    <option value="">Provincia</option>
                    {provinces.map(p => (
                      <option key={p.provinceName} value={p.provinceName}>
                        {p.provinceName}
                      </option>
                    ))}
                  </select>

                  <select
                    className={styles.selectUB}
                    value={ubigeo}
                    onChange={e => setUbigeo(e.target.value)}
                    disabled={!province}
                  >
                    <option value="">Distrito</option>
                    {districts.map(d => (
                      <option key={d.iddist} value={d.iddist}>
                        {d.districtName}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  size="large"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  
                />
                <InputField
                  type="text"
                  name="reference"
                  placeholder="Referencia"
                  size="large"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
              </form>
            </>
          )}
          <GeneralButton 
            size="large" 
            className={styles.continueBtn}
            disabled={!isFormValid}
            onClick={handleCreateOrder}
          >
            Continuar al pago →
          </GeneralButton>
        </div>
        {/* COLUMNA DERECHA */}
        <aside className={styles.right}>
          <OrderSummary
            cartItems={cartItems}
            totalItems={totalItems}
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            totalPrice={totalPrice}
            showItems
          />
        </aside>
      </div>
    </div>
  )
}
