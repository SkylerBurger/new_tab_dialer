function Dial({ icon, onImgLoad, name, link }, key) {
  return (
    <a href={link} key={key}>
      <img src={icon} alt={name} onLoad={onImgLoad} />
    </a>
  );
}

export default Dial;
