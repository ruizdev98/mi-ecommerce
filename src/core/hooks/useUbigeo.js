import { useEffect, useState } from 'react'
import { getDepartments, getProvinces, getDistricts } from '@/core/api/ubigeoApi'

export function useUbigeo() {
  const [departments, setDepartments] = useState([])
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])

  const [department, setDepartment] = useState('')
  const [province, setProvince] = useState('')
  const [ubigeo, setUbigeo] = useState('')

  useEffect(() => {
    getDepartments().then(setDepartments)
  }, [])

  // cuando cambia departamento
  useEffect(() => {
    // 🔥 reset dependientes
    setProvince('')
    setUbigeo('')
    setDistricts([])

    if (!department) {
      setProvinces([])
      return
    }

    getProvinces(department).then(setProvinces)
  }, [department])

  // cuando cambia provincia
  useEffect(() => {
    // 🔥 reset distrito
    setUbigeo('')

    if (!province || !department) {
      setDistricts([])
      return
    }

    getDistricts(department, province).then(setDistricts)
  }, [province, department])

  return {
    departments,
    provinces,
    districts,
    department,
    province,
    ubigeo,
    setDepartment,
    setProvince,
    setUbigeo,
  }
}
