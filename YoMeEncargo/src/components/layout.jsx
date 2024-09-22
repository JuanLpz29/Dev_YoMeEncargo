
const layout = (props) => {
  return (
    <>  
    <section className="bg-accent w-5/6 mx-auto px-8 pt-10">
        {props.children}
    </section>
    </>
  )
}

export default layout;
