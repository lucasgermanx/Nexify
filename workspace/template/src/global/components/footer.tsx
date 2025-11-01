import useStore from "@/core/client/hooks/store.hook";

const Footer = () => {
  const {store} = useStore()

    return (
        <><footer className="mt-5" style={{ backgroundColor: "#0D0E10", padding: "1%", color:"white"}}>
            <div className="container">
                <div className="col-md-12">
                    <div className="row">
                        <div className="mt-3 col-md-9">
                            <div className="card" style={{ width: "18rem", border: "0px", backgroundColor: "transparent" }}>
                                <h4>{store?.store_name}</h4>
                                <p>{`${store?.store_name} não possuí filiação alguma com Rockstar Games.`}</p>
                            </div>
                        </div>
                        <div className="col-md-3 mt-4" style={{ paddingBottom: "5%" }}>
                            {/* <div style={{ display: "block" }}>
                                <a href={facebook}><button className="btn btn-black" style={{fontSize:"17px", color:"white"}}><i className='bx bxl-facebook'></i></button></a>
                                <a href={discord}><button className="btn btn-black" style={{fontSize:"17px", color:"white"}}><i className='bx bxl-discord'></i></button></a>
                                <a href={twitter}><button className="btn btn-black" style={{fontSize:"17px", color:"white"}}><i className='bx bxl-twitter'></i></button></a>
                                <a href={instagram}><button className="btn btn-black" style={{fontSize:"17px", color:"white"}}><i className='bx bxl-instagram'></i></button></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer><div style={{ backgroundColor: "#0C0D11" }}>
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <div style={{ paddingTop: "2%", paddingBottom: "1%" }}>
                                    <p style={{ color: "#4D6288", fontWeight: 600, fontSize: "13px" }} className="mt-3">{store?.store_name} © 2024 - Todos direitos reservados.</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div style={{ paddingTop: "2.3%", paddingBottom: "1%" }}>
                                    <a href="https://legal.fivemarket.com.br/politicas-de-privacidade"><p style={{ color: "#4D6288", fontWeight: 600, fontSize: "13px" }} className="mt-3">Política de Privacidade</p></a>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div style={{ paddingTop: "2.3%", paddingBottom: "1%" }}>
                                    <a href="https://legal.fivemarket.com.br/termos-de-utilizacao"><p style={{ color: "#4D6288", fontWeight: 600, fontSize: "13px" }} className="mt-3">Termos</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default Footer;
