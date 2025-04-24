import Link from "next/link"
import styles from "@/styles/header.module.scss"
import Image from "next/image";
import React from "react";

interface HeaderProps {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ rightElements, onClickLogo }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box} onClick={onClickLogo} aria-label="홈으로 이동">
          <Image src="/inflearn.png" alt="인프런 로고" width={110} height={20} />
        </Link>
      </div>
      {rightElements && (
      <div className={styles.flexItem}>
        {rightElements}
      </div>
      )}
    </header>
  )
}

export default HeaderComponent;