import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.jpeg";
import { Mailbox } from "react-bootstrap-icons";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(100 - Math.random() * 50);
  const [index, setIndex] = useState(1);
  const toRotate = ["a Developer", "a Trader", "an Entrepreneur"];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(200);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <div>
              <span className="tagline">Welcome to ishanavasthi.in</span>
              <h1>
                {`Hi! I'm Ishan`}
                <br></br>
                <span
                  className="txt-rotate"
                  dataPeriod="1000"
                  data-rotate='[ "a Developer", "a Trader", "an Entrepreneur" ]'
                >
                  <span className="wrap">{text}</span>
                </span>
              </h1>
              <p>
                Hello! I'm Ishan Avasthi from Jaipur, India. I am a Computer
                Science Undergraduate at Scaler School of Technology, Bangalore.
                I am very passionate about technology and willing to pursue a
                career in it. I am also pursuing B.Sc. in CS by BITS Pilani and
                M.Sc. in CS by WOOLF University.
              </p>
              <button
                onClick={() =>
                  (window.location.href =
                    "mailto:hello@ishanavasthi.in?cc=heyavasthi@gmail.com&subject=From%20Portfolio%3A")
                }
              >
                Mail Me <Mailbox size={25} />
              </button>
            </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div>
              <img src={headerImg} alt="Header Img" style={{ width: "100%" }} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
