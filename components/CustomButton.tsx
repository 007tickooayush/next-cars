"use client";
import React from 'react'
import Image from 'next/image';
import { CustomButtonPoprs } from '@/types';

const CustomButton = ({
    title,
    containerStyles,
    handleClick,
    btnType
}:CustomButtonPoprs) => {
  return (
    <button
        disabled={false}
        type={btnType || "button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
    >
        <span
            className={"flex-1"}
        >
            {title}
        </span>
    </button>
  )
}

export default CustomButton;