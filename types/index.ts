import { MouseEventHandler } from "react";

export interface CustomButtonPoprs {
    title:string,
    containerStyles?:string,
    handleClick?:MouseEventHandler<HTMLButtonElement>,
    btnType?: "button" | "submit";
}