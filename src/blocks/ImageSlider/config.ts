import { Block } from "payload";

const ImageSlider: Block = {
  slug: "imageSlider",
  labels: {
    singular: "Image Slider",
    plural: "Image Sliders",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      localized: true, // Локализация заголовка
    },
    {
      name: "images",
      type: "array",
      label: "Images",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media", // Должно соответствовать вашей коллекции медиа
          required: true,
        },
      ],
    },
  ],
};

export default ImageSlider;
