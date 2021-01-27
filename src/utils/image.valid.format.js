export const imageFormatValid = (image) => {
    console.log(image)
    const extension = image.name.split('.')[image.name.split('.').length - 1];
    return extension === 'jpg' || extension === 'png' || extension === 'PNG' || extension === 'JPG' ? true : false

}