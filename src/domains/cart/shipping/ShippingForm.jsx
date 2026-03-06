import { useState } from "react"
import { useUbigeo } from "@/core/hooks/useUbigeo"
import GeneralButton from "@/shared/ui/GeneralButton"
import InputField from "@/shared/ui/InputField"
import styles from "./ShippingPage.module.css"

export default function ShippingForm({onSubmit}) {

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

    const [documentType, setDocumentType] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        documentNumber: "",
        phone: "",
        address: "",
        reference: ""
    })

    /* ================= UTIL ================= */
    const onlyNumbers = value => value.replace(/\D/g, "")
    const handleChange = e => {
        const { name, value } = e.target
        const newValue =
        name === "phone" || name === "documentNumber"
            ? onlyNumbers(value)
            : value
        setFormData(prev => ({
        ...prev,
        [name]: newValue
        }))
    }

    /* ================= CONFIG INPUTS ================= */
    const nameFields = [
        { name: "name", placeholder: "Nombre" },
        { name: "lastname", placeholder: "Apellidos" }
    ]
    const contactFields = [
        {
            name: "documentNumber",
            placeholder:
                documentType === "DNI"
                ? "Número de DNI (8 dígitos)"
                : documentType === "CE"
                ? "Número de CE"
                : "Número de documento",
            maxLength: documentType === "DNI" ? 8 : 12,
            numeric: true,
            disabled: !documentType
        },
        {
            name: "phone",
            placeholder: "Celular",
            maxLength: 9,
            numeric: true
        }
    ]

    const addressFields = [
        { name: "address", placeholder: "Dirección" },
        { name: "reference", placeholder: "Referencia" }
    ]

    /* ================= VALIDACIÓN ================= */
    const isFormValid = (
        formData.name.trim() &&
        formData.lastname.trim() &&
        formData.phone.trim() &&
        documentType &&
        formData.documentNumber &&
        department &&
        province &&
        ubigeo &&
        ubigeo.length === 6 &&
        formData.address.trim() &&
        formData.reference.trim() &&
        (documentType !== "DNI" || formData.documentNumber.length === 8)
    )
    
    /* ================= SUBMIT ================= */
    const handleSubmit = () => {
        onSubmit({
            formData,
            documentType,
            ubigeo
        })
    }

  return (

    <div>
        <div className={styles.lineDivider}></div>

        <form 
            className={styles.shippingForm} 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >

            <div className={styles.formRow}>
                {nameFields.map(field => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        size="large"
                        required
                    />
                ))}
            </div>

            <div className={styles.formRow}>
                <select
                    className={styles.selectID}
                    value={documentType}
                    onChange={e => {
                        setDocumentType(e.target.value)
                        setFormData(prev => ({
                            ...prev,
                            documentNumber: ""
                        }))
                    }}
                >
                    <option value="">Tipo documento</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                </select>

                {contactFields.map(field => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        maxLength={field.maxLength}
                        disabled={field.disabled}
                        size="large"
                        required
                        inputMode={field.numeric ? "numeric" : undefined}
                        pattern={field.numeric ? "[0-9]*" : undefined}
                    />
                ))}
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
                    disabled={!department}
                    onChange={e => setProvince(e.target.value)}
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
                    disabled={!province}
                    onChange={e => setUbigeo(e.target.value)}
                >
                    <option value="">Distrito</option>
                    {districts.map(d => (
                        <option key={d.iddist} value={d.iddist}>
                            {d.districtName}
                        </option>
                    ))}
                </select>
            </div>

            {addressFields.map(field => (
                <InputField
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    size="large"
                    required
                />
            ))}

        </form>

        <GeneralButton
            type="submit"
            size="large"
            className={styles.continueBtn}
            disabled={!isFormValid}
        >
            Continuar al pago →
        </GeneralButton>

    </div>
  )
}
