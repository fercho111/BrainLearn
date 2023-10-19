import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './Home.css'
import Rsf from "../images/Logo RsF (1).svg"
import StudyGirl from "../images/StudyGirl.svg"
import activeRecall from "../images/activeRecall.svg"
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavbarHome";


function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borra el token de autenticación almacenado en localStorage
    localStorage.removeItem('token');

    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  useEffect(() => {
    const waveElement = document.getElementById('wave-footer');
    waveElement.style.transform = 'rotate(180deg)';
    waveElement.style.transition = '0.3s';
    // Comprobar si el usuario ha iniciado sesión
    const authToken = localStorage.getItem('token');
    console.log("??????????", authToken);
    if (!authToken) {
      // Si no ha iniciado sesión, redirigir a la página de inicio de sesión
      navigate('/login');
    }
  }, []);


  return (
    <>
      <NavBar />
      <button onClick={handleLogout}>Cerrar Sesión</button>

      <section id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="promo-title">Aprende de Forma Inteligente con FlashCards</h3>
              <p id="banner-text" className="text">Crea tus propias flashcards personalizadas y comienza a memorizar de manera
                efectiva con
                la potencia de la
                <strong> inteligencia artificial</strong>.
              </p>
              <Link to="/signup" className="btn btn-primary">¡Empieza Ahora!</Link>
            </div>
            <div className="col-md-6 text-center">
              <img src={StudyGirl} alt="StudyGirl" className="img-fluid" />

            </div>
          </div>
        </div>
        <svg id="wave" style={{ transform: 'rotate(0deg)', transition: '0.3s' }} viewBox="0 0 1440 250" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(230, 230, 235, 1)" offset="0%"></stop>
              <stop stopColor="rgba(230, 230, 235, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)"
            d="M0,175L60,150C120,125,240,75,360,62.5C480,50,600,75,720,104.2C840,133,960,167,1080,150C1200,133,1320,67,1440,41.7C1560,17,1680,33,1800,41.7C1920,50,2040,50,2160,79.2C2280,108,2400,167,2520,195.8C2640,225,2760,225,2880,191.7C3000,158,3120,92,3240,91.7C3360,92,3480,158,3600,166.7C3720,175,3840,125,3960,108.3C4080,92,4200,108,4320,129.2C4440,150,4560,175,4680,170.8C4800,167,4920,133,5040,100C5160,67,5280,33,5400,41.7C5520,50,5640,100,5760,116.7C5880,133,6000,117,6120,120.8C6240,125,6360,150,6480,150C6600,150,6720,125,6840,95.8C6960,67,7080,33,7200,54.2C7320,75,7440,150,7560,179.2C7680,208,7800,192,7920,191.7C8040,192,8160,208,8280,216.7C8400,225,8520,225,8580,225L8640,225L8640,250L8580,250C8520,250,8400,250,8280,250C8160,250,8040,250,7920,250C7800,250,7680,250,7560,250C7440,250,7320,250,7200,250C7080,250,6960,250,6840,250C6720,250,6600,250,6480,250C6360,250,6240,250,6120,250C6000,250,5880,250,5760,250C5640,250,5520,250,5400,250C5280,250,5160,250,5040,250C4920,250,4800,250,4680,250C4560,250,4440,250,4320,250C4200,250,4080,250,3960,250C3840,250,3720,250,3600,250C3480,250,3360,250,3240,250C3120,250,3000,250,2880,250C2760,250,2640,250,2520,250C2400,250,2280,250,2160,250C2040,250,1920,250,1800,250C1680,250,1560,250,1440,250C1320,250,1200,250,1080,250C960,250,840,250,720,250C600,250,480,250,360,250C240,250,120,250,60,250L0,250Z"
            className="bottom-img"></path>
        </svg>
      </section>

      <section id="activeRecall">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6 text-center">
              <img src={activeRecall} alt="active-Recall" id="aRimg" />

            </div>
            <div className="col-md-6 text-center" id="activeRecall-text">
              <h2 className="aR-tittle"><strong>Recuerdo Activo </strong>con <b>IA</b></h2>
              <p className="text">Prepárate para descubrir un nuevo nivel de aprendizaje interactivo, donde la
                <strong> tecnología</strong> y
                la <strong>cognición</strong> se unen para impulsar tu éxito académico y más allá.</p>

            </div>

          </div>
        </div>
      </section>

      <section id="lista-n">
        <div className="container n-text">
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-3 n-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              className="bi bi-1-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z" />
              <linearGradient id="icon" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(69,106,135,1)" />
                <stop offset="100%" stopColor="rgba(68,185,196,1)" />
              </linearGradient>
            </svg></div>

            <div className="col-md-9">
              <p className="text">Crea tus mazos, puedes personalizarlos agregando una imagen como fondo.</p>
            </div>
          </div>
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-3 n-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              className="bi bi-2-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
              <linearGradient id="icon" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(69,106,135,1)" />
                <stop offset="100%" stopColor="rgba(68,185,196,1)" />
              </linearGradient>
            </svg></div>

            <div className="col-md-9">
              <p className="text">Crea y personaliza tus cartas, puedes escoger entre texto e
                imágenes.</p>
            </div>
          </div>
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-3 n-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              className="bi bi-3-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
              <linearGradient id="icon" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(69,106,135,1)" />
                <stop offset="100%" stopColor="rgba(68,185,196,1)" />
              </linearGradient>
            </svg></div>

            <div className="col-md-9">
              <p className="text">Mientras estudias, recuerda puntuar las cartas dependiendo de tu nivel de
                memorización.</p>
            </div>
          </div>
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-3 n-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              className="bi bi-4-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176c-.218.352-.438.703-.657 1.055ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z" />
              <linearGradient id="icon" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(69,106,135,1)" />
                <stop offset="100%" stopColor="rgba(68,185,196,1)" />
              </linearGradient>
            </svg></div>

            <div className="col-md-9">
              <p className="text">Repasa tus cartas, con la ayuda de nuestro algoritmo conseguiras memorizar de una manera mas
                eficiente.</p>
            </div>
          </div>

        </div>
      </section>

      <section id="footer">
        <svg id="wave-footer" viewBox="0 0 1440 200" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(230, 230, 235, 1)" offset="0%"></stop>
              <stop stopColor="rgba(230, 230, 235, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)"
            d="M0,100L21.8,113.3C43.6,127,87,153,131,150C174.5,147,218,113,262,103.3C305.5,93,349,107,393,110C436.4,113,480,107,524,93.3C567.3,80,611,60,655,50C698.2,40,742,40,785,46.7C829.1,53,873,67,916,83.3C960,100,1004,120,1047,113.3C1090.9,107,1135,73,1178,53.3C1221.8,33,1265,27,1309,40C1352.7,53,1396,87,1440,113.3C1483.6,140,1527,160,1571,143.3C1614.5,127,1658,73,1702,43.3C1745.5,13,1789,7,1833,20C1876.4,33,1920,67,1964,76.7C2007.3,87,2051,73,2095,83.3C2138.2,93,2182,127,2225,120C2269.1,113,2313,67,2356,56.7C2400,47,2444,73,2487,83.3C2530.9,93,2575,87,2618,76.7C2661.8,67,2705,53,2749,40C2792.7,27,2836,13,2880,10C2923.6,7,2967,13,3011,30C3054.5,47,3098,73,3120,86.7L3141.8,100L3141.8,200L3120,200C3098.2,200,3055,200,3011,200C2967.3,200,2924,200,2880,200C2836.4,200,2793,200,2749,200C2705.5,200,2662,200,2618,200C2574.5,200,2531,200,2487,200C2443.6,200,2400,200,2356,200C2312.7,200,2269,200,2225,200C2181.8,200,2138,200,2095,200C2050.9,200,2007,200,1964,200C1920,200,1876,200,1833,200C1789.1,200,1745,200,1702,200C1658.2,200,1615,200,1571,200C1527.3,200,1484,200,1440,200C1396.4,200,1353,200,1309,200C1265.5,200,1222,200,1178,200C1134.5,200,1091,200,1047,200C1003.6,200,960,200,916,200C872.7,200,829,200,785,200C741.8,200,698,200,655,200C610.9,200,567,200,524,200C480,200,436,200,393,200C349.1,200,305,200,262,200C218.2,200,175,200,131,200C87.3,200,44,200,22,200L0,200Z"
            className="footer-img"></path>
        </svg>
        <div className="row justify-content-md-center">
          <div className="col-md-6 footer-box text-center bL-footer">
            <div className="footer-logo" href="#"><img src={Rsf} alt="" />BrainLearn</div>
            <p>Nuestra misión es ayudarte a alcanzar
              tus metas educativas de manera eficiente y enriquecedora.</p>

          </div>
          <div className="col-md-6 footer-box text-center">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map"
              viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" />
            </svg>  Universidad EIA</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone"
              viewBox="0 0 16 16">
              <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
            </svg>  +57 311 8844688</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at"
              viewBox="0 0 16 16">
              <path
                d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
              <path
                d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg>  xyz@gmail.com</p>
          </div>

        </div>

      </section>






      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
        crossOrigin="anonymous"></script>


      <script src="smooth-scroll.js"></script>
      <script>
        var scroll = new SmoothScroll('a[href*="#"]');
      </script>
    </>
  );
}

export default Home;