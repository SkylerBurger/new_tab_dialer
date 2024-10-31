import useCachedImage from "../Common/Hooks/useCachedImage";

function Dial({ icon, name, link, incrementLoadCount }, key) {
  const storageDuration = 1000 * 60 * 60 * 24; // 1 day
  const { error, image } = useCachedImage("dial-images", icon, storageDuration);
  const imgTitle = error
    ? `${name} - Error occurred while fetching image`
    : name;
  const style = error ? { filter: "drop-shadow(0 0 3px rgb(255, 50, 0))" } : {};

  return (
    <a href={link} key={key} title={imgTitle} style={style}>
      <img src={image} alt={imgTitle} onLoad={incrementLoadCount} />
    </a>
  );
}

export default Dial;
