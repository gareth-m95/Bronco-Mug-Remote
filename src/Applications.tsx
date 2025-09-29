import { useCallback, useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";
import { Application } from "../types";
const APPLICATIONS_API_URL = "http://localhost:3001/api/applications";
const LIMIT = 5;

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch(
        `${APPLICATIONS_API_URL}?_page=${page}&_limit=${LIMIT}`
      );
      const data = await res.json();
      const header = res.headers.get("Link");
      setApplications((prev) => [...prev, ...data]);
      setIsFinalPage(header && !header.includes('rel="next"'));
    } catch (e) {
      setIsError(true);
      console.error("Failed to fetch applications:", e);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const onClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.Applications}>
      {applications.map((app) => (
        <SingleApplication key={app.id} application={app} />
      ))}

      <Button
        disabled={isLoading || isFinalPage}
        onClick={onClick}
        className=""
      >
        {isLoading ? "Loading..." : "Load More"}
      </Button>
      {isError && <div>Failed to load applications, try again</div>}
    </div>
  );
};

export default Applications;
