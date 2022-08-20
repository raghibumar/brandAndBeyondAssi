import React from 'react'
import styles from "./Navbar.module.css"

const Navbar = ({ type }) => {
    return (
        <>
            <div className={styles.navbar}>
                <div>
                    <h2>Authentication Website</h2>
                </div>
                <div>
                    <h2>{type}</h2>
                </div>
            </div>
        </>
    )
}

export default Navbar