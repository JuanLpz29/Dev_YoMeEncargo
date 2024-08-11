import Button from "./components/button"
import Layout from "./components/layout"
import NavBar from "./components/navbar"

function App() {

  return (
    <>
      <div className="bg-accent min h-screen">
        <NavBar></NavBar>
        <Layout>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aliquam eum sint expedita ratione aspernatur ipsum fugit cumque voluptates magni nulla incidunt? Commodi veritatis minus laborum, perferendis sit cum ipsum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aliquam eum sint expedita ratione aspernatur ipsum fugit cumque voluptates magni nulla incidunt? Commodi veritatis minus laborum, perferendis sit cum ipsum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aliquam eum sint expedita ratione aspernatur ipsum fugit cumque voluptates magni nulla incidunt? Commodi veritatis minus laborum, perferendis sit cum ipsum.</p>

        </Layout>
      </div>
    </>
  )
}

export default App
