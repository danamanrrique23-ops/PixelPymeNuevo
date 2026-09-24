import { Context } from "@oak/oak";

import { buscarUsuarioPorEmail } from "../models/userModel.ts";

import { compararPassword } from "../utils/hash.ts";

import { generarToken } from "../utils/jwt.ts";


export async function postLogin(ctx: Context) {

    const { request, response } = ctx;

    try {

        const datosLogin = await request.body.json();

        const { email, password } = datosLogin;


        const usuario = await buscarUsuarioPorEmail(email);


        if (usuario.length === 0) {

            response.status = 404;

            response.body = {
                Message: "Usuario no encontrado"
            };

            return;
        }


        const passwordCorrecta = await compararPassword(
            password,
            usuario[0].password
        );


        if (!passwordCorrecta) {

            response.status = 401;

            response.body = {
                Message: "Contraseña incorrecta"
            };

            return;
        }


        const token = await generarToken(
            usuario[0].id_usuario,
            usuario[0].email,
            usuario[0].rol
        );


        response.status = 200;

        response.body = {

            Message: "Login exitoso",

            token: token,

            rol: usuario[0].rol,

            usuario: {

                id: usuario[0].id_usuario,

                email: usuario[0].email,

                nombre: usuario[0].nombres.split(" ")[0],

                apellido: usuario[0].apellidos.split(" ")[0]

            }

        };


    } catch (error) {

        console.error("Error en el login", error);

        response.status = 500;

        response.body = {
            Message: "Error interno del servidor"
        };

    }

}