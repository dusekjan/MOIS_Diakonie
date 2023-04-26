
function Header({className, title}) {
    return (
        <header className={className}>
            <div className="background-anchor"></div>
            <h1>{title}</h1>
        </header>
    );
}

export default Header;