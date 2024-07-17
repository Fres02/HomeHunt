import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/1.png';
const Footer = () => {
    const sections = [
        {
            title: 'About',
            items: ['About us', 'Careers', 'Contact us','Privacy policy']
        },
        {
            title: 'Services',
            items: ['Value added service', 'News', 'Online publications', 'Data', 'Cloud']
        },
        {
            title: 'Contacts',
            items: ['HomeHunt (Pvt) Ltd,', 'D.S. Senanayake Mawatha, Borella, Colombo-08,', 'Sri Lanka.', '0112 699 822', 'info@homehunt.lk']
        },

    ];

    const items = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            link: 'https://facebook.com/'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            link: 'https://twitter.com/'
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            link: 'https://instagram.com/'
        }
    ];

    return (
        <footer className="bg-gray-900 text-gray-200 w-full mt-10 py-8 px-4">

<div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
    {/* Logo and Description */}
    <div className="col-span-1 md:col-span-2 mb-4 md:mb-0 md:mr-4 pl-10">
        <div className="flex items-center mb-4">
            <Link to='/'>
                <img src={logo} alt="HomeHunt Logo" className="h-14 mr-4" />
            </Link>
        </div>
        <p className='text-sm text-gray-400' style={{ whiteSpace: 'pre-wrap' }}>
    Owning a beautiful shelter is everyone's dream.{'\n'}
    At HomeHunt, we have made it our mission to {'\n'}make this dream a reality.
</p>

    </div>

    {/* Sections */}
    {sections.map((section, index) => (
        <div key={index} className="mb-4 md:mb-0 md:mr-4">
            <h6 className='font-bold uppercase text-gray-300 mb-2'>{section.title}</h6>
            <ul>
                {section.items.map((item, i) => (
                    <li key={i} className='py-1 text-gray-400 hover:text-gray-200 cursor-pointer'>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    ))}
</div>







            <div className='col-span-2 md:col-span-2 md:mb-6 items-center pl-5'>
                <div className='max-w-md bg-gray-800 mt-5 p-4 md:p-6 rounded-lg'> {/* Adjusted padding */}
                    <h6 className='font-bold uppercase text-gray-300 mb-3 md:mb-4'>Subscribe to our newsletter</h6> {/* Adjusted margin bottom */}
                    <p className='text-sm text-gray-400 mb-3 md:mb-6'> {/* Adjusted margin bottom */}
                         Get weekly updates on latest articles and resources sent to your inbox.
                    </p>
        
                    <form className='flex flex-col sm:flex-row'>
                        <input
                            type="email"
                            placeholder='Enter your email address'
                            className='w-full sm:w-auto p-2 rounded-md mb-3 sm:mb-0 sm:mr-2 bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-gray-500'
                        />
                        <Link to='/'>
                        <button className='w-full sm:w-auto p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white'>
                            Subscribe
                        </button>
                        </Link>
                    </form>
                </div>
            </div>

           
            <div className="flex flex-col md:flex-row justify-between items-center mt-8">
                <div className="text-center md:text-left">
                    <h6 className="text-lg font-bold">FresTech</h6>
                    <p className="text-sm text-gray-400">© 2024 FresTech. All rights reserved.</p>
                </div>
                <div className="flex mt-4 md:mt-0">
                    {items.map((social, index) => (
                        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 mx-3">
                            <social.icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>
            </div>

        </footer>
    );
};

export default Footer;