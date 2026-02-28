<div className={styles.cartListSection}>

          {cartItems.map(item => (
            <div key={item.variantId} className={styles.cartItemRow}>
              <img src={item.image} alt={item.name} className={styles.cartItemImage} />

              <div className={styles.cartItemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.brand}>{item.brandName}</p>
                <p className={styles.sku}>{item.sku}</p>

                <div className={styles.variantInfo}>
                  <span>Color: <strong>{item.color}</strong></span>
                  <div className={styles.verticalLine}></div>
                  <span>Talla: <strong>{item.size}</strong></span>
                </div>
              </div>
              
              <div className={styles.cartItemPrice}>
                {getItemOriginalTotal(item) !== getItemTotalPrice(item) && (
                  <p className={styles.originalPrice}>
                    S/ {getItemOriginalTotal(item).toFixed(2)}
                  </p>
                )}
                <p className={styles.itemPrice}>
                  S/ {getItemTotalPrice(item).toFixed(2)}
                </p>
              </div>

              <div className={styles.cartItemActions}>
                <div className={styles.qtyControls}>
                  <button 
                    onClick={() =>
                      updateQuantity(item.variantId, Math.max(1, item.quantity - 1))
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>

                  <span>{item.quantity}</span>

                  <button 
                    onClick={() =>
                      updateQuantity(item.variantId, item.quantity + 1)
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.variantId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>