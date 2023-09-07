const {ref, getDownloadURL, uploadBytesResumable}=require("firebase/storage")
const storage =require("../config/firebase")
const sharp =require("sharp")

async function uploadFile(file){
    let fileBuffer= await sharp(file.buffer).resize({width:300, height:300, fit: 'cover'}).toBuffer()

    const fileRef=ref(storage, `files/${file.originalname} ${Date.now()}`)
    const fileMetaData={
        contentType:file.mimetype
    }

    const fileUploadPromise=uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetaData
    )

    await fileUploadPromise()

    const fileDownloadURL=await getDownloadURL(fileRef)

    return {ref: fileRef, downloadURL: fileDownloadURL}
}

module.exports=uploadFile