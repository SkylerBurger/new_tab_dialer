function Dial({ icon, name, link }, key) {
  return (
    <a href={link} key={key}>
      <img src={icon} alt={name} />
    </a>
  );
}

export default Dial;
