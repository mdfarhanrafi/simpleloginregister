

import vine from "@vinejs/vine";
import { CustomErrorReporter } from './CutomErrorReport.js'

vine.errorReporter = () => new CustomErrorReporter()


export const registerSchema = vine.object({
    name: vine.string().minLength(1),
    email:  vine.string().email(),
    password: vine.string().minLength(6),
    address: vine.string(),

})

export const LoginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
    
})