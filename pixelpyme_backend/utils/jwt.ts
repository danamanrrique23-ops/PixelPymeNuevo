import { create } from "../Dependencies/dependencias.ts";
import { verify } from "../Dependencies/dependencias.ts";

export  async function generarToken (id:number,email:string,rol:string)
{

        // Juntamos  los datos que recibió del controller

    const datos ={id,email,rol};
    const claveSecreta ="mi_clave";

    
    const clave = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(claveSecreta),
        {
            name: "HMAC",
            hash: "SHA-256"
        },
        false,
        ["sign", "verify"]
    );

    //firmamos el token 

    const token = await create(
        { alg: "HS256", typ: "JWT" },
        datos,
        clave
    );

    return token;
}

export async function VerificarToken(token:string ){

    const claveSecreta ="mi_clave";
    const clave = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(claveSecreta),
            {
                name: "HMAC",
                hash: "SHA-256"
            },
            false,
            ["sign", "verify"]
        );
    
        //firmamos el token 
    
        const datos = await verify (
            token,
            clave
        );
    
        return datos;
    }
    

