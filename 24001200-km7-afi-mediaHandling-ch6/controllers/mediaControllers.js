const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const multer = require('../libs/multer')
const imageKit = require('../libs/imageKit')

class MediaControllers {
    static async uploadImage(req, res) {
        try {
            const { title, description } = req.body
            const file = req.file
            
            if(!file) {
                return res.status(400).json({ error: "Image file is required" })
            } else {
                const uploadResponse = await imageKit.upload({
                    file: file.buffer.toString('base64'),
                    fileName: file.originalname
                })
                
                const image = await prisma.image.create({
                    data: {
                        title,
                        description,
                        url: uploadResponse.url,
                        fileId: uploadResponse.fileId
                    }
                })
    
                res.status(201).json(image)
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "failed to upload image"
            })
        }
    }

    static async getImages(req, res) {
        try {
            const images = await prisma.image.findMany();
            res.json(images)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "failed to retrieve images"
            })
        }
    }

    static async getImageById(req, res) {
        try {
            const { id } = req.params
            const image = await prisma.image.findUnique({
                where: { id: parseInt(id) }
            })

            if(!image) {
                return res.status(404).json({
                    error: "Image not found"
                })
            }

            res.json(image)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "Failed to retrieve image"
            })
        }
    }

    static async updateImage(req, res) {
        try {
            const { id } = req.params
            const { title, description } = req.body

            const updatedImage = await prisma.image.update({
                where: { id: parseInt(id) },
                data: {
                    title, 
                    description
                }
            })

            res.json(updatedImage)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "failed to update image"
            })
        }
    }

    static async deleteImage(req, res) {
        try {
            const { id } = req.params;
            
            const image = await prisma.image.findUnique({
                where: { id: parseInt(id) }
            })

            if (!image) {
                return res.status(404).json({
                    error: "Image not found"
                })
            } else {
                await imageKit.deleteFile(image.fileId)

                await prisma.image.delete({
                    where: { id: parseInt(id) }
                })

                res.json({
                    message: "Image deleted successfully"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "Failed to delete image"
            })
        }
    }


}

module.exports = MediaControllers