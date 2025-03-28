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
      localized: true,
    },
    {
      name: "mode",
      type: "select",
      label: "Display Mode",
      options: [
        { label: "Slider", value: "slider" },
        { label: "Static", value: "slider-static" },
      ],
      defaultValue: "slider",
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
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default ImageSlider;
