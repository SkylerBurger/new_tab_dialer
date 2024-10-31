import useCachedImage from "../Common/Hooks/useCachedImage";

function Dial({ icon, name, link, incrementLoadCount }, key) {
  const storageDuration = 1000 * 60 * 60 * 24; // 1 day
  const { error, image } = useCachedImage("dial-images", icon, storageDuration);
  console.log(error, image);
  const imgTitle = error
    ? `${name} - Error occurred while fetching image`
    : name;

  return (
    <a href={link} key={key} title={imgTitle}>
      <img src={image} alt={imgTitle} onLoad={incrementLoadCount} />
    </a>
  );
}

export default Dial;
