import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input } from "@medusajs/ui"
import { useState } from "react"

const RestrictedPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    // Aqui você pode implementar a lógica para enviar o arquivo para o servidor
    // Por exemplo, usando o Medusa Admin API
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      
      // Exemplo de como você poderia enviar para o backend
      // const response = await fetch('/admin/upload', {
      //   method: 'POST',
      //   body: formData
      // })
      
      console.log('Arquivo selecionado:', selectedFile)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Página com acesso restrito</Heading>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {previewUrl && (
            <div className="mt-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-xs rounded-lg"
              />
            </div>
          )}
        </div>
        <Button 
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Fazer Upload
        </Button>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Área Restrita",
})

export default RestrictedPage