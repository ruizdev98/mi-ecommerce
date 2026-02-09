import { useEffect, useState } from "react"

export function useProductSelection({ colors, getSizesByColor, getVariant }) {
  const [selectedColorId, setSelectedColorId] = useState(null)
  const [selectedSizeId, setSelectedSizeId] = useState(null)

  // Selecciona automáticamente el primer color disponible
  useEffect(() => {
    if (colors.length > 0 && !selectedColorId) {
      setSelectedColorId(colors[0].id)
    }
  }, [colors, selectedColorId])

  const selectedColor = colors.find(c => c.id === selectedColorId)

  const sizes = selectedColorId
    ? getSizesByColor(selectedColorId)
    : []

  const selectedVariant =
    selectedColorId && selectedSizeId
      ? getVariant(selectedColorId, selectedSizeId)
      : null

  const resetSize = () => setSelectedSizeId(null)

  return {
    selectedColorId,
    setSelectedColorId,
    selectedSizeId,
    setSelectedSizeId,
    selectedColor,
    sizes,
    selectedVariant,
    resetSize
  }
}