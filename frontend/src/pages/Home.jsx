import { Link } from "react-router-dom";

function Home() {

  return (

    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h1>Intercity Car Pooling Network</h1>

      <p>Share rides between cities and travel at low cost.</p>

      <br/>

      <Link to="/offer">
        <button style={{
          padding:"10px 20px",
          fontSize:"16px",
          background:"blue",
          color:"white",
          border:"none",
          borderRadius:"5px"
        }}>
          Offer a Ride
        </button>
      </Link>

    </div>

  );

}

export default Home;