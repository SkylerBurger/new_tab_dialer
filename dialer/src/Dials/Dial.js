function Dial({ image, name, url }, key) {
    return(
        <a href={ url } key={ key }>
            <img src={ image } alt={ name } />
        </a>
    )
};

export default Dial;