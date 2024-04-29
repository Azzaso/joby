import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from '../slices/authSlice';
import Avatar from "./Avatar";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  PowerIcon,
  UserCircleIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
        <MenuItem className="flex items-center gap-3 rounded-lg" key={key}>
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
    ),
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-white"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 ml-20">
      <Typography
        as="span"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Link to="/">Home</Link>
          </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}
 
export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const logoutHandler = async (e) => {
    try {
     await logout().unwrap();
     dispatch(clearCredentials());
     navigate('/');
     
    } catch (error) {
     console.log(error)
    
    }}
 
  return (
    <Navbar shadow={true} fullWidth className="bg-transparent border-0 m-auto px-16 py-2" variant="gradient">
      <div className="flex items-center justify-between text-white">
      
        <Typography
          variant="h6"
          className="mr-4 flex gap-2 cursor-pointer py-1.5 lg:ml-2 font-poppins"
        >
          <BriefcaseIcon className="h-5 w-5"/>
          Talent Compass
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {userInfo ? (
            <>
            
            <Popover className="bg-white text-blue-gray-500 text-sm font-poppins p-3" >
              <Avatar fullname={`${userInfo.name}`}/>
            <PopoverHandler>
              <div className="text-white cursor-pointer flex items-center gap-2 py-2 pr-4">{userInfo.name}
              <ChevronDownIcon
                strokeWidth={2.5}
                className="hidden h-3 w-3 transition-transform lg:block"
              />
              </div>
              </PopoverHandler>
               <PopoverContent>
               <ListItem color="lightBlue" ripple={true} className="w-full flex gap-2 mb-2">
               <UserCircleIcon className="h-5 w-5" />
               <Link to='/dashboard'>Dashboard</Link>
                </ListItem>
               <hr className="my-2 border-blue-gray-50" />
               <ListItem color="lightBlue" ripple={true} className="w-full flex gap-2" onClick={logoutHandler}>
               <PowerIcon className="h-5 w-5" />
                Log Out</ListItem>
              </PopoverContent>
            </Popover>

            </>
          ) : (
            <>
            <Button variant="text" size="sm" color="white" className="font-poppins">
            <Link to='/login'>Log In</Link>
            </Button>
            <Button  variant="gradient" color="pink" size="sm" className="font-poppins">
            <Link to='signup'>Sign Up</Link>
            </Button>
            </>
          ) }
          
        </div>
        
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {userInfo ? (
            <>
            <Popover className="bg-white text-blue-gray-500 text-sm font-poppins p-3" >
            <PopoverHandler>
              <div className="text-white cursor-pointer flex items-center gap-2 py-2 pr-4">{userInfo.name}
              <ChevronDownIcon
                strokeWidth={2.5}
                className="h-3 w-3 transition-transform lg:block rotate-180"
              /></div>
              </PopoverHandler>
               <PopoverContent>
               <ListItem color="lightBlue" ripple={true} className="w-full flex gap-2 mb-2">
               <UserCircleIcon className="h-5 w-5" />
                Dashboard</ListItem>
               <hr className="my-2 border-blue-gray-50" />
               <ListItem color="lightBlue" ripple={true} className="w-full flex gap-2">
               <PowerIcon className="h-5 w-5" />
                Sign Out</ListItem>
              </PopoverContent>
            </Popover>
            </>
          ) : (
            <>
            <Button variant="outlined" size="sm" color="pink" fullWidth className="font-poppins">
            Log In
          </Button>
          <Button size="sm" fullWidth variant="gradient" color="pink" className="font-poppins">
            Sign Up
          </Button>
            </>
          )}
                   
        </div>
      </Collapse>
    </Navbar>
  )
  }