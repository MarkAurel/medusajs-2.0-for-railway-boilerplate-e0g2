import { defineMiddlewares } from "@medusajs/framework/http"

export default defineMiddlewares({
    routes: [
        {
            method: ["POST"],
            matcher: "/admin/custom-upload",
            bodyParser: { 
                sizeLimit: "10mb" // ou o tamanho que você precisar
            }
        }
    ]
})