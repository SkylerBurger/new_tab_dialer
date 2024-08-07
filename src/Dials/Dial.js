function Dial({ image, onImgLoad, name, url }, key) {
  return (
    <a href={url} key={key}>
      <img src={image} alt={name} onLoad={onImgLoad} />
    </a>
  );
}

export default Dial;
