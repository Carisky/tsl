import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { BannerBlock as BannerComponent } from "@/blocks/Banner/Component";
import { CodeBlock as CodeComponent } from "@/blocks/Code/Component";
import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { IconsListBlock } from "./IconsList/IconsListBlock";
import { DividerBlock } from "./Divider/DividerBlock";
import ImageSlider from "@/blocks/ImageSlider/Component"; // Импортируем слайдер
import { TilesFlexComponent } from "./TilesFlex/Component";
import ContactsList from "./Contacts/Component";
import VerticalCardList from "./VerticalCardList/VerticalCardList";
import SocialMediasBlock from "./SocialMedias/SocialMediasBlock";
import { ModalForm } from "./ModalForm/Component";
import InquiryForm from "./InquiryForm/InquiryForm";



const blockComponents: Record<string, React.FC<any>> = {
  banner: BannerComponent,
  code: CodeComponent,
  "icons-list": IconsListBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  divider: DividerBlock,
  imageSlider: ImageSlider, // Добавляем ImageSlider
  "tiles-flex": TilesFlexComponent,
  contacts: ContactsList,
  verticalCardList: VerticalCardList,
  socialMedias: SocialMediasBlock,
  modalForm: ModalForm,
  inquiryForm: InquiryForm
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
