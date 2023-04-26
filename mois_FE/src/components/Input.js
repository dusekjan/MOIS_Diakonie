
function Input({
    label,
    id,
    ...rest}) {

    return (
        <>
            { label && <label htmlFor={id}>{label}</label> }
            <input id={id} name={id} size={10} {...rest}/>
        </>
    );
}

export default Input;