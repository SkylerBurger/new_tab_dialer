import useCachedImage from "../Common/Hooks/useCachedImage";

function Dial({ icon, name, link, incrementLoadCount }, key) {
  const storageDuration = 1000 * 60 * 60 * 24; // 1 day
  const image = useCachedImage("dial-images", icon, storageDuration);

  return (
    <a href={link} key={key} title={name}>
      <img src={image} alt={name} onLoad={incrementLoadCount} />
    </a>
  );
}

export default Dial;
