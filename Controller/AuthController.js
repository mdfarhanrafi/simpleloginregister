import prisma from "../DB/db.config.js";
import { registerSchema, LoginSchema } from "../Validation/authValidation.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import vine, { errors } from "@vinejs/vine";

class AuthController {
    static async registerUser(req, res) {

        try {
            const body = req.body;
            console.log(body)
            const validator = vine.compile(registerSchema)
            const payload = await validator.validate(body)

            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            await prisma.user.create({
                data: payload
            })


            return res.json({ payload })

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                console.log(error.messages)
                return res.status(400).json({ errors: error.messages })
            }
            else {

                return res.json({ status: 500, message: "Please try again later" })
            }
        }



    }
    static async Login(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(LoginSchema)
            const payload = await validator.validate(body)
            const findUser = await prisma.user.findUnique({
                where: {
                    email: payload.email,
                }
            })

            if (findUser) {
                if (!bcrypt.compareSync(payload.password, findUser.password)) {
                    return res.status(400).json({
                        errors: {
                            email: "Invalid creadentials"
                        }
                    })
                }
                const payloaddata = {
                    id: findUser.id,
                    name: findUser.name,
                    email: findUser.email
                }
                const token = jwt.sign(payloaddata, process.env.JWT_SECRETE, {
                    expiresIn: "365d",
                }, { algorithm: 'RS256' },);

                return res.json({ status: 200, message: "User logged in successfully", access_token: `Bearer ${token}` })

            }
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                return res.json({ status: 500, message: "Please try again later", Error: error })
            }
        }



    }
    // static async Logout(req, res) {



    // }


}


export default AuthController