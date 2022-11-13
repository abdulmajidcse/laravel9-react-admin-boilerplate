import { toast } from "react-toastify";

const tinymceInit = {
    plugins: [
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "code",
        "help",
        "wordcount",
    ],
    toolbar:
        "insertfile undo redo | styleselect | fontselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code",
    image_title: true,
    automatic_uploads: true,
    file_picker_types: "image",
    file_picker_callback: function (cb, value, meta) {
        // URL of upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)

        const imageInputTag = document.createElement("input");
        imageInputTag.setAttribute("type", "file");
        imageInputTag.setAttribute("accept", "image/*");

        imageInputTag.onchange = function () {
            const image = this.files[0];

            const reader = new FileReader();
            reader.onload = function () {
                const formData = {
                    image: image,
                    image_old_url: value ?? "",
                };

                // setLoading(true);
                // upload image
                axios
                    .post("/webapi/auth/tinymce/image-upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        cb(response.data.data.image_url, {
                            title: image.name,
                        });
                        // setLoading(false);
                    })
                    .catch((error) => {
                        cb(value ?? "");
                        const errors = error.response?.data?.errors;
                        toast.error(
                            errors?.image
                                ? errors.image[0]
                                : "Failed to upload image."
                        );
                        // setLoading(false);
                    });
            };
            reader.readAsDataURL(image);
        };

        imageInputTag.click();
    },
};

export default tinymceInit;
