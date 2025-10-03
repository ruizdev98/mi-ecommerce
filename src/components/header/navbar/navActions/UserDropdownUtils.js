import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export function renderDropdownItem(item, index) {
    switch (item.type) {
    case 'label':
      return <li key={index} className={styles.dropdownItem}>{item.text}</li>
    case 'divider':
      return <li key={index} className={styles.dropdownDivider}></li>
    case 'link':
      return (
        <li key={index}>
          <Link to={item.to} onClick={item.onClick} className={styles.dropdownLink}>
            {item.text}
          </Link>
        </li>
      )
    case 'button':
      return (
        <li key={index}>
          <button onClick={item.onClick} className={`${styles.dropdownLink} ${item.className || ''}`}>
            {item.text}
          </button>
        </li>
      )
    default:
      return null
  }
}