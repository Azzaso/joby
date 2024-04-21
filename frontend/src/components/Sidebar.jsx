import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from '../slices/authSlice'

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  StarIcon,
  DocumentTextIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  SparklesIcon,
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  UsersIcon,
  DocumentPlusIcon,
  DocumentArrowDownIcon,
  BookmarkIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
 
export function Sidebar() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const {userInfo} = useSelector((state)=>state.auth);

  const logoutHandler = async (e) => {
    try {
     await logout().unwrap();
     dispatch(clearCredentials());
     navigate('/');
     
    } catch (error) {
     console.log(error)
    
    }}
 
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <div className="mb-2 p-4 text-2xl font-semibold">
          Dashboard
      </div>
      <List>
        {userInfo.role === "Candidate" ? (<>
        {/* Candidate Sidebar */}
          <ListItem className="p-3">
              <ListItemPrefix>
                <UserIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-poppins font-medium">
                Profile
              </Typography>          
          </ListItem>
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <DocumentTextIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                My Resume
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <AdjustmentsVerticalIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Edit Profile
              </ListItem>
            </List>
        
          <ListItem className="p-3">
              <ListItemPrefix>
                <StarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-poppins font-medium">
                Opportunities
              </Typography>
          </ListItem>
         
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <MagnifyingGlassIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Search Opportunities
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <DocumentArrowUpIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Applied jobs
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <SparklesIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Explore
              </ListItem>
            </List>
        </>) : (<>
        {/*Employer Sidebar */}
        <ListItem className="p-3">
              <ListItemPrefix>
                <UserIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-poppins font-medium">
                Profile
              </Typography>          
          </ListItem>
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <AdjustmentsVerticalIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Edit Profile
              </ListItem>
            </List>

            <ListItem className="p-3">
              <ListItemPrefix>
                <MegaphoneIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-poppins font-medium">
                Jobs Listings
              </Typography>          
          </ListItem>
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <DocumentPlusIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                <Link to='/dashboard/post'>Create New Job</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <PencilSquareIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                <Link to='/dashboard/joblistings'>Manage Job Listings</Link>
              </ListItem>
            </List>

            <ListItem className="p-3">
              <ListItemPrefix>
                <UsersIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-poppins font-medium">
                Candidates
              </Typography>          
          </ListItem>
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <MagnifyingGlassIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                <Link to="/dashboard/candidates">Scout Candidates</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <BookmarkIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Saved Candidates
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <DocumentArrowDownIcon strokeWidth={3} className="h-5 w-5 ml-3" />
                </ListItemPrefix>
                Received Applications
              </ListItem>
            </List>
        </>
        )}
          
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/dashboard/account">Account</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={logoutHandler}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}