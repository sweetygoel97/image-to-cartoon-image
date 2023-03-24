import React, { useState } from 'react'

export const Image = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleClick = async () => {
    setLoading(true);

    // Perform the image loading operation here...
    const response = await fetch('https://example.com/image.jpg');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    setImage(objectUrl);

    setLoading(false);
  };

  const loadImage = () => {
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      setLoading(false);
      setImage(img.src);
    };
    img.src = "your-image-url";
  };
  return (
    <div>Image
     <div>
      <button onClick={handleClick}>Load Image</button>
      {loading ? (
      <div>Loading...</div>
    ) : (
      <img src={loadImage} alt="My Image" />
    )}
    </div>
    </div>
  )
}
