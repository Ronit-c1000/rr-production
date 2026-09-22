"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar, Nav, Container } from "react-bootstrap";
import companylogo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import '../app/globals.css'
import { RxCross2, RxHamburgerMenu  } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { getDestinationSlug } from "@/lib/destinationSlug";

const tripCategories = [
  { slug: "nepal", title: "Nepal" },
  { slug: "bhutan", title: "Bhutan" },
  { slug: "tibet", title: "Tibet" },
];

export default function NavbarMenu() {
  const pathname = usePathname();

  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const dropdownMenuRef = useRef(null);
  const touchStartYRef = useRef(null);

  /* ================= SCROLL HANDLER ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHoveredMenu(null);
      setOpenMenu(null);
      setIsNavbarExpanded(false);

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  /* ================= DROPDOWN HANDLERS ================= */
  const handleMouseEnter = (menu) => {
    clearLeaveTimeout();
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    clearLeaveTimeout();
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  const handleMobileToggle = () => {
    setHoveredMenu(null);
    setOpenMenu((prev) => (prev === "tours" ? null : "tours"));
  };

  const handleDropdownWheel = (event) => {
    const menu = dropdownMenuRef.current;
    if (!menu) return;

    event.stopPropagation();

    const { scrollTop, scrollHeight, clientHeight } = menu;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const isScrollingUp = event.deltaY < 0;
    const isScrollingDown = event.deltaY > 0;

    if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
      event.preventDefault();
    }
  };

  const handleDropdownTouchMove = (event) => {
    const menu = dropdownMenuRef.current;
    const touchStartY = touchStartYRef.current;
    const currentTouchY = event.touches?.[0]?.clientY;

    event.stopPropagation();

    if (!menu || touchStartY === null || currentTouchY === undefined) return;

    const deltaY = touchStartY - currentTouchY;
    const { scrollTop, scrollHeight, clientHeight } = menu;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const isDraggingDown = deltaY < 0;
    const isDraggingUp = deltaY > 0;

    if ((isAtTop && isDraggingDown) || (isAtBottom && isDraggingUp)) {
      event.preventDefault();
    }
  };

  const handleDropdownTouchStart = (event) => {
    touchStartYRef.current = event.touches?.[0]?.clientY ?? null;
  };

  const isMenuOpen = (menu) => hoveredMenu === menu || openMenu === menu;

  const leaveTimeoutRef = useRef(null);

  const clearLeaveTimeout = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };


    useEffect(() => () => clearLeaveTimeout(), []);
  const closeNavbar = () => {
    setIsNavbarExpanded(false);
    setHoveredMenu(null);
    setOpenMenu(null);
  };

  /* Close navbar on route change */
  useEffect(() => {
    closeNavbar();
  }, [pathname]);

  /* ================= RENDER ================= */
  return (
    <Navbar
      expand="lg"
      expanded={isNavbarExpanded}
      onToggle={(expanded) => setIsNavbarExpanded(expanded)}
      className={`example ${
        !isVisible ? "navbar-hidden" : ""
      } ${isScrolled ? "navbar-scrolled" : ""} ${
        isNavbarExpanded ? "navbar-toggled" : ""
      }`}
    >
      <Container>
        <Navbar.Brand as={Link} href="/" onClick={closeNavbar}>
          <div className="nav_companyLogo">
            <Image src={companylogo} alt="Company Logo" height={65} />
          </div>
        </Navbar.Brand>
        
        {/* navbar open and close button */}
        {
          isNavbarExpanded ? (
            <button
              className="navbar-toggle"
              aria-label="Close navigation menu"
              onClick={closeNavbar}
            >
              <RxCross2 size={35} />
            </button>
          ) : (
            <button
              className="navbar-toggle"
              aria-label="Open navigation menu"
              onClick={() => setIsNavbarExpanded(true)}
            >
              <RxHamburgerMenu size={35} />
            </button>
          )
        }
        

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" onClick={closeNavbar}>
              Home
            </Nav.Link>

            <Nav.Item
              className={`dropdown nav-dropdown ${
                isMenuOpen("tours") ? "nav-dropdown-active show" : ""
              }`}
              onMouseEnter={() => handleMouseEnter("tours")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-tours-row">
                <Link
                  href="/tours"
                  className="nav-link nav-tours-link"
                  onClick={closeNavbar}
                >
                  Tours
                </Link>
                <button
                  type="button"
                  className="nav-tours-mobile-toggle d-lg-none"
                  aria-label="Show tour destinations"
                  aria-expanded={isMenuOpen("tours")}
                  onClick={handleMobileToggle}
                >
                  { isMenuOpen("tours") ? <IoIosArrowDown style={{ transform: "rotate(180deg)", transition: "transform 0.3s ease" }} /> :

                    !isMenuOpen("tours") && <IoIosArrowDown style={{ transition: "transform 0.3s ease" }} />
                  }
                   
                </button>
              </div>

              <div
                ref={dropdownMenuRef}
                className={`dropdown-menu ${isMenuOpen("tours") ? "show" : ""}`}
                onMouseEnter={() => handleMouseEnter("tours")}
                onMouseLeave={handleMouseLeave}
                onWheel={handleDropdownWheel}
                onTouchStart={handleDropdownTouchStart}
                onTouchMove={handleDropdownTouchMove}
              >
                {tripCategories.length > 0 ? (
                  tripCategories.map((destination) => (
                    <Link
                      key={destination.slug || destination.title}
                      href={`/tour/${getDestinationSlug(destination)}`}
                      className="dropdown-item"
                      onClick={closeNavbar}
                    >
                      {destination.shortTitle || destination.name || destination.title}
                    </Link>
                  ))
                ) : null}
              </div>
            </Nav.Item>
            <Nav.Link as={Link} href="/about-us" onClick={closeNavbar}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} href="/blogs" onClick={closeNavbar}>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} href="/membership" onClick={closeNavbar}>
              Membership
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
