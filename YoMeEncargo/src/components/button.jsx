// function Button() {
//     const Name = 'Juan'
//     return(
//         <>
//             <button className="bg-primary px-5 py-2 text-white">{Name}</button>
//         </>

//     )
// }


const Button = (props) => {
    const { Name } = props
    return(
        <>
            <button className="bg-primary px-5 py-2 text-white">{Name}</button>
        </>
    )

}

export default Button;