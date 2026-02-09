const API_URL = "https://ecommerce-api-he4w.onrender.com/api/ubigeo"

export async function getDepartments() {
  const res = await fetch(`${API_URL}/departments`)
  if (!res.ok) throw new Error("Error al cargar departamentos")
  return res.json();
}

export async function getProvinces(departmentName) {
  const res = await fetch(
    `${API_URL}/provinces?department=${encodeURIComponent(departmentName)}`
  );
  if (!res.ok) throw new Error("Error al cargar provincias")
  return res.json()
}

export async function getDistricts(departmentName, provinceName) {
  const res = await fetch(
    `${API_URL}/districts?department=${encodeURIComponent(departmentName)}&province=${encodeURIComponent(provinceName)}`
  );
  if (!res.ok) throw new Error("Error al cargar distritos")
  return res.json()
}
