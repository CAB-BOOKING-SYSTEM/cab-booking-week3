
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { nav } from '../constants'; 
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Button from 'react-bootstrap/Button';
// import { FaBars } from 'react-icons/fa'; 

// const Navigation = () => {
//   const [showOffcanvas, setShowOffcanvas] = useState(false);

//   const handleClose = () => setShowOffcanvas(false);
//   const handleShow = () => setShowOffcanvas(true);

//   return (
//     <Navbar bg="light" variant="light" expand="lg" sticky="top"> 
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold"> 
//           Your Logo 
//         </Navbar.Brand>

//         <Nav className="ms-auto d-none d-lg-flex"> 
//           {nav.map((item) => (
//             <Nav.Link key={item.id} as={Link} to={item.href} className="fs-4 fw-bold"> 
//               {item.title}
//             </Nav.Link>
//           ))}
//         </Nav>

//         <Button variant="outline-primary" onClick={handleShow} className="d-lg-none"> 
//           <FaBars size={24} />
//         </Button>

//         <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title className="fs-3 fw-bold">Menu</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <Nav className="flex-column"> 
//               {nav.map((item) => (
//                 <Nav.Link key={item.id} as={Link} to={item.href} className="fs-4 fw-bold" onClick={handleClose}> 
//                   {item.title}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </Offcanvas.Body>
//         </Offcanvas>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;