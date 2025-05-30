// src/api/admin/custom-upload/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows"

type UploadRequest = {
  files: {
    folder?: string
    filename: string
    mimeType: string
    content: string
  }[]
}

export async function POST(
  req: MedusaRequest<UploadRequest>,
  res: MedusaResponse
) {
  try {
    const { files } = req.body

    // Remove o prefixo "data:image/..." se existir
    const cleanBase64 = files[0].content.replace(/^data:image\/\w+;base64,/, '')
    
    const { result } = await uploadFilesWorkflow(req.scope).run({
      input: {
        files: [{
          filename: files[0].filename,
          mimeType: files[0].mimeType,
          content: Buffer.from(cleanBase64, 'base64').toString('binary'),
          access: "public"
        }]
      }
    })

    res.status(200).json({ 
      success: true,
      file: result[0]
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}