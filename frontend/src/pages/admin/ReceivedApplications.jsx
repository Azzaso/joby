import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar";
import {
  Button,
  Typography,
  Card,
  CardBody,
  Input,
  CardFooter,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useGetPostsQuery } from "../../slices/postsApiSlice";
import Popup from "../../components/Popup";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" };
  return date.toLocaleDateString("en-US", options);
}

const TABLE_HEAD = [
  {
    head: "Job Offer",
    customeStyle: "!text-left",
  },
  {
    head: "Applicants",
    customeStyle: "text-left",
  },
  {
    head: "Category",
    customeStyle: "text-left",
  },
  {
    head: "Date",
    customeStyle: "text-left",
  },
];

function ReceivedApplications() {
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [search, setSearch] = useState("");
  const [applicantNames, setApplicantNames] = useState({});
  const [openPopups, setOpenPopups] = useState([]);

  useEffect(() => {
    const fetchApplicantNames = async () => {
      const names = {};
      try {
        for (const post of data) {
          for (const applicantId of post.applicants) {
            if (!names[applicantId]) {
              const name = await fetchUserName(applicantId);
              names[applicantId] = name;
            }
          }
        }
        setApplicantNames(names);
      } catch (error) {
        console.error("Error fetching applicant names:", error);
      }
    };

    if (data) {
      fetchApplicantNames();
    }
  }, [data]);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      return userData.name;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return "Unknown";
    }
  };

  const handleOpenPopup = (index) => {
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = true;
      return newOpenPopups;
    });
  };

  const handleClosePopup = (index) => {
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = false;
      return newOpenPopups;
    });
  };

  return (
    <section className="m-10 h-[85vh] rounded-lg">
      <Card className="h-full w-full">
        <div
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-4"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Received Applications
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1 font-poppins"
            >
              See who has applied lately.
            </Typography>
          </div>
          <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                size="lg"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              variant="outlined"
              className="flex items-center gap-2"
            >
              Latest
              <ChevronDownIcon strokeWidth={3} className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <CardBody className="overflow-scroll !px-2 py-0">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle })=> (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 font-poppins ${customeStyle}`}
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold font-poppins"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data.map((post, index)=> 
                {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-2 text-left w-46">
                        <BriefcaseIcon className="border rounded-md p-1 h-10 w-10"/>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold font-poppins"
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              variant="small"
                              className="!font-normal text-gray-600 truncate font-poppins"
                            >
                              {post.category}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-left"
                        >
                          <div className="mt-3 cursor-pointer flex items-center -space-x-4 overflow-hidden" onClick={() => handleOpenPopup(index)}>
                          {post.applicants.map((applicantId) => (
                          <Avatar key={applicantId} fullname={`${applicantNames[applicantId]}`} />
                          ))}
                          </div>
                          <Popup title="Applicants" open={openPopups[index]} handleOpen={() => handleClosePopup(index)}>
                      <List>
                      {post.applicants.map((applicantId) => (
                        <ListItem key={applicantId} className="flex justify-between" > 
                          <ListItemPrefix className="flex gap-2">
                          <Avatar key={applicantId} fullname={`${applicantNames[applicantId]}`} />
                          <div className='text-gray-900 font-normal'>{`${applicantNames[applicantId]}`}</div>
                          </ListItemPrefix>
                          <div className="flex gap-2 ">
                          <Button variant="outlined" color='black' className="font-poppins">View Profile</Button>
                          <Button variant="gradient" color='pink' className="font-poppins">Contact</Button>
                          </div>
                        </ListItem>
                      ))}
                    </List>
                    </Popup>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color='black'
                          className="!font-semibold text-left text-gray-800 bg-gray-300  rounded-md w-fit px-2 font-poppins"
                        >
                          {post.category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color='black'
                          className="!font-normal text-gray-600 text-left font-poppins"
                        >
                          {formatDate(post.date)}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}

export default ReceivedApplications;
