import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { get } from "../utils/pedidos";

export default function UserProfileMain() {
  const urlImg =
    "https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

  const { user } = useAuthContext();
  const { email, lastname } = user;
  const [startUser, setStartUser] = useState("2002");

  const [listMovies, setListMovies] = useState(undefined);

  const userFetch = async () => {
    try {
      const usuario = await axios.get(
        "http://localhost:5000/api/users/findOne",
        {
          params: { email, lastname },
        }
      );

      setStartUser(usuario.data.createdAt.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const trending = async () => {
    const trending = await get("/trending/all/day");

    setListMovies(trending.results);
  };
  useEffect(() => {
    userFetch();
    trending();
  }, []);

  return (
    <>
      <Container fluid style={{ height: "70vh" }}>
        <Row style={{ height: "80%" }}>
          <Col
            className="d-flex align-items-center justify-content-center h-10"
            id="carouselTryContainer"
            style={{ height: "100%" }}
          >
            <div className="bg-darkOpacity rounded-4 p-3 fs-sm-1 p-sm-5 mt-md-4 mh-100">
              <div className="d-flex flex-column align-items-center">
                <h1>{`Bienvenido ${user.name} ${user.lastname}`} </h1>
                {!startUser ? (
                  <div>Loading..</div>
                ) : (
                  <span>{`(Member since ${startUser} )`}</span>
                )}
                <div className="d-flex justify-content-center">
                  <Link to="usuarios">
                    <button className="profile-btn">Usuarios</button>
                  </Link>
                  <Link to="friends">
                    <button className="profile-btn">Amigos</button>
                  </Link>
                  <Link to="/favorites">
                    <button className="profile-btn">Favoritos</button>
                  </Link>
                  <Link to="/search">
                    <button className="profile-btn">Search</button>
                  </Link>
                </div>
              </div>
            </div>
            <Carousel fade controls={false} id="carouselTry" className="mh-100">
              {listMovies &&
                listMovies.map((movie) => {
                  return (
                    <Carousel.Item interval={"2000"} style={{ height: "100%" }}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        className="d-block w-100 mh-100"
                        style={{ height: "100%" }}
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
