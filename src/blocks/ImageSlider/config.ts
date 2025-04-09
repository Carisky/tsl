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
      name: "gridAspectRatio",
      type: "select",
      label: "Aspect Ratio for Grid",
      options: [
        { label: "4:3", value: "4/3" },
        { label: "1:1", value: "1/1" },
        { label: "16:9", value: "16/9" },
      ],
      defaultValue: "1/1",
      admin: {
        condition: (_, siblingData) => siblingData.mode === "grid",
      },
    },
    {
      name: "maxSize",
      type: "select",
      label: "Maximum Image Size",
      options: [
        { label: "small - 200", value: "small" },
        { label: "small+ - 250", value: "small+" },
        { label: "medium - 300", value: "medium" },
        { label: "medium+ - 350", value: "medium+" },
        { label: "large - 400", value: "large" },
        { label: "xl - 500", value: "xl" },
        { label: "2xl - 600", value: "2xl" },
        { label: "3xl - 700", value: "3xl" },
        { label: "4xl - 800", value: "4xl" },
        { label: "auto", value: "auto" },
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
