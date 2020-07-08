import React from 'react';
import Link from "next/link"
import styles from "./header.module.css"

const Header = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <Link href="/">
                    <h3>
                        <i className="fas fa-virus"/>
                        Covid19 Stats
                    </h3>
                    </Link>
                </li>
                <li><Link href="/summary"><a>Summary</a></Link></li>
                <li><Link href="/confirmed"><a>Day One Confirmed</a></Link></li>
                <li><Link href="/recovered"><a>Day One Recovered</a></Link></li>
                <li><Link href="/deaths"><a>Day One Deaths</a></Link></li>
            </ul>
        </nav>
    );

}

export default Header;