import { Component, Dispatch, SetStateAction, } from "react";
import {SvgIconTypeMap} from '@mui/material'
import {OverridableComponent} from '@mui/material/OverridableComponent'
export type TypeSetState<T> = Dispatch<SetStateAction<T>>
export interface IUser {
    avatar: string,
    name:string,
}
export interface IPost {
    author: IUser,
    createdAt: string,
    content: string,
    images?: string[]
    likes: number
}
export interface IMenuItem {
    title: string,
    link: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}
export interface Date {
    year: String,
      month: String,
      day: String
  }
 