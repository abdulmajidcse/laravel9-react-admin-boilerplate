const imageFormats = (formats = []) => {
    const defaultFormats = ["image/jpg", "image/jpeg", "image/png"];
    return formats.length > 0
        ? [...defaultFormats, ...formats]
        : defaultFormats;
};

export default imageFormats;
