import { Button } from "./ui/button";
import Spinner from "./ui/spinner";
import { useTranslation } from "react-i18next";
import Title from "./ui/title";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

interface UniversityData {

  id: number;
  university: string;
  website: string;
  logo: string;
  point_of_contact: string;
  email: string;
}

// call the api (https://dryades.units.it/plantdata/university) usin axios and react-query v5 to get the list of universities
function useUniversity() {
  return useQuery<UniversityData[]>({
    queryKey: ["university"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://dryades.units.it/api_test/plantdata/university",
      );
      return data;
    },
  });
}

export default function UniversityList() {
  return (
    <>
      <Title text={"about-us.title"}></Title>
      <ul className="flex w-full flex-col items-center mb-8">
        <QueryClientProvider client={queryClient}>
          <UniversityListGet />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ul>
    </>
  );
}


function UniversityListGet() {
  const { status, data, error } = useUniversity();
  return (
    <>
      {status === "pending" ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.map((university) => (
            <University
              title={university.university}
              link={university.website}
              logo={university.logo}
              pointOfContact={university.point_of_contact}
              email={university.email}
              key={university.id}
            />
          ))}
        </>
      )}
    </>
  );
}

function University({ title, link, logo, pointOfContact, email }: UniversityData) {
  const { t } = useTranslation();
  return (
    <li className="mb-20 flex w-full max-w-[400px] flex-col items-center justify-evenly gap-1 rounded-xl border border-input bg-pure p-6 first:mt-0 md:my-8 md:max-w-[900px] md:flex-row md:gap-4 md:last:mb-16">
      <div className="relative flex items-center justify-evenly p-0 py-4 md:px-12">
        <img
          src={`images/loghi/${logo}`}
          alt={title}
          className="h-[150px] w-[200px] object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-4 md:w-[60%] md:items-start md:gap-0 md:px-4">
        <h3 className="max-w-[250px] text-center text-xl md:mb-4 md:max-w-full md:text-left">
          {title}
        </h3>
        <div className="w-[146px]">
          <p className="text-center md:text-left text-sm font-medium">{t("about-us.uni-contacts")}</p>
          <p className="text-center md:text-left md:pl-1 text-[14px] md:mb-4 ">
            {pointOfContact}
            <br />
            {email}
          </p>
        </div>

        <div className="flex justify-center py-2 md:justify-start">
          <Button asChild>
            <Link to={link}>{t("about-us.uni-button")}</Link>
          </Button>
        </div>
      </div>
    </li>
  );
}
