import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import proPic from "../assets/profile.jpg"

//react icons
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from '../context/AuthProvider';
import { Avatar } from 'flowbite-react';
import AccountMenu from './AccontMenu';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { user } = useContext(AuthContext);


    //toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])

    //nav Items
    const navItems = [
        {link: "Home", path: "/"},
        {link: "About", path: "#"},
        {link: "Shop", path: "/shop"},
        {link: "Manage Books", path: "/admin/dashboard"},
        {link: "Blog", path: "#"}
    ]
  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-50'>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block'/>Book Heaven</Link>

                {/* nav item for large screens */}
                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link, path}) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link> )
                    }
                </ul>

                {/* Btn for large screens */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button className='flex justify-center items-center content-center'>
                        {/* <FaBarsStaggered className='w-5 hover:text-blue-700'/> */}
                        {/* <Avatar img={proPic} alt="avatar of Jese" rounded className='w-10' /> */}
                        {
                            user?  <AccountMenu/> : <FaBarsStaggered className='w-5 hover:text-blue-700'/>
                        }
                    </button>
                    
                </div>

                {/* menu for sm screens */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black' />
                        }
                    </button>
                </div>
            </div>

            {/* nav items for sm screens */}
            <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                {
                    navItems.map(({link, path}) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link> )
                }
            </div>
        </nav>
    </header>
  )
}

export default NavBar