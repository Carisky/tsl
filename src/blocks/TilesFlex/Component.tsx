import React from 'react'

export interface Tile {
  id: string
  image: { url: string }
  text: string
  link?: { slug: string; title: string; id: string }
}

export interface TilesFlexProps {
  tiles?: Tile[]
}

export const TilesFlexComponent: React.FC<TilesFlexProps> = ({ tiles }) => {
  if (!tiles || tiles.length === 0) return null
  console.log(tiles)
  return (
    <div className="flex flex-wrap gap-4">
      {tiles.map((tile) => (
        <div key={tile.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
          {tile.link ? (
            <a href={tile.link.slug} className="block border p-4 hover:shadow-lg transition">
              <img src={tile.image.url} alt={tile.text} className="w-full h-48 object-cover mb-2" />
              <p>{tile.text}</p>
            </a>
          ) : (
            <div className="border p-4">
              <img src={tile.image.url} alt={tile.text} className="w-full h-48 object-cover mb-2" />
              <p>{tile.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
