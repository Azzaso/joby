import React, {useState, useEffect} from "react";
import Avatar from "../../components/Avatar";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
  TypographyProps,
  CardFooter,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useGetPostsQuery } from "../../slices/postsApiSlice";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return date.toLocaleDateString('en-US', options);
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
  const [showPopupIndex, setShowPopupIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [applicantNames, setApplicantNames] = useState({});

  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    
  };

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

  return (
    <section className="m-10 h-full rounded-lg">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
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
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
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
                          <div className="mt-3 cursor-pointer flex items-center -space-x-4 overflow-hidden" onClick={() => setShowPopupIndex(index)}>
                          {post.applicants.map((applicantId) => (
                          <Avatar key={applicantId} fullname={`${applicantNames[applicantId]}`} />
                          ))}
                          </div>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color='black'
                          className="!font-semibold text-left text-gray-800 bg-pink-100 bg-opacity-50 rounded-md w-fit px-2 font-poppins"
                        >
                          Category
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