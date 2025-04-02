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
        { label: "grid", value: "grid" },
      ],
      defaultValue: "slider",
    },
    {
      name: "gridColumns",
      type: "select",
      label: "Grid Columns",
      options: [
        { label: "2 in a row", value: "2" },
        { label: "3 in a row", value: "3" },
        { label: "4 in a row", value: "4" },
      ],
      defaultValue: "3",
      admin: {
        condition: (_, siblingData) => siblingData.mode === "grid",
      },
      
    },
    {
      name: "maxSize",
      type: "select",
      label: "Maximum Image Size",
      options: [
        { label: "small - 200x200", value: "small" },
        { label: "small+ - 250x250", value: "small+" },
        { label: "medium - 300x300", value: "medium" },
        { label: "medium+ - 350x350", value: "medium+" },
        { label: "large - 400x400", value: "large" },
        { label: "xl - 500x500", value: "xl" },
        { label: "auto (600x600)", value: "auto" },
      ],
      defaultValue: "auto",
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
