import React from 'react';

interface InternalPage {
  slug?: string;
}

interface GridItemLink {
  type: 'internal' | 'external';
  externalUrl?: string;
  internalPage?: {
    slug?: string;
    // остальные поля не нужны
  };
}

export interface GridItem {
  // поле image возвращается как объект upload, но далее мы будем извлекать из него только url
  image?: {
    url: string;
    [key: string]: any;
  };
  text: string | { [locale: string]: string };
  link?: GridItemLink;
}

export interface NavGridData {
  gridItems?: GridItem[];
}

export interface NavGridProps {
  data?: NavGridData;
}

const containerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  padding: '16px',
};

const itemStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '16px',
  textAlign: 'center',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '8px',
};

const NavGrid: React.FC<NavGridProps> = ({ data }) => {
  if (!data || !data.gridItems) return null;

  // Преобразуем каждый элемент в "безопасный" вариант: извлекаем только нужные поля
  const safeGridItems = data.gridItems.map(item => ({
    text: item.text,
    image: item.image && item.image.url ? item.image.url : undefined,
    link: item.link
      ? {
          type: item.link.type,
          externalUrl: item.link.externalUrl,
          internalPage: item.link.internalPage
            ? { slug: item.link.internalPage.slug }
            : undefined,
        }
      : undefined,
  }));

  return (
    <div style={containerStyle}>
      {safeGridItems.map((item, index) => {
        const { image, text, link } = item;
        const content = (
          <>
            {image && <img src={image} alt="Grid item" style={imageStyle} />}
            <div
              dangerouslySetInnerHTML={{
                __html: typeof text === 'string' ? text : text['en'] || '',
              }}
            />
          </>
        );

        if (link && link.type === 'external' && link.externalUrl) {
          return (
            <div key={index} style={itemStyle}>
              <a
                href={link.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            </div>
          );
        } else if (link && link.type === 'internal' && link.internalPage) {
          return (
            <div key={index} style={itemStyle}>
              <a
                href={
                  link.internalPage.slug ? `/page/${link.internalPage.slug}` : '#'
                }
              >
                {content}
              </a>
            </div>
          );
        } else {
          return (
            <div key={index} style={itemStyle}>
              {content}
            </div>
          );
        }
      })}
    </div>
  );
};

export default NavGrid;
