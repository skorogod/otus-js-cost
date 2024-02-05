import { useLocation } from "react-router-dom";

export const NoMatch = () => {
  const location = useLocation();
  console.log("NO MAtch");
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoMatch;
