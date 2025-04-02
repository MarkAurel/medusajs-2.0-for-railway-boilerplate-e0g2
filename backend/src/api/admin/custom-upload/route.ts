// src/api/admin/custom-upload/route.ts
import { 
    AuthenticatedMedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { Modules } from "@medusajs/framework/utils"
  
  type UploadImageRequest = {
    filename: string
    mimeType: string
    content: string // conteúdo em base64
  }
  
  export const POST = async (
    req: AuthenticatedMedusaRequest<UploadImageRequest>,
    res: MedusaResponse
  ) => {
    const { filename, mimeType, content } = req.body
    
    // Resolver o serviço do File Module
    const fileModuleService = req.scope.resolve(Modules.FILE)
    
    try {
      // Convert base64 to buffer
      const buffer = Buffer.from(content, 'base64')
      
      const file = await fileModuleService.createFiles({
        filename,
        mimeType,
        content: buffer.toString('binary')
      })
      
      res.status(200).json({ 
        success: true, 
        file 
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }