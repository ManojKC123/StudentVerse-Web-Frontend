import { Box, Container, Typography } from "@material-ui/core";
import NotFoundImg from "../media/page_not_found.svg";

const NotFound = () => (
  <>
    <Container className="not-found-container" maxWidth="md">
      <Typography
        className="not-found-head"
        align="center"
        color="textPrimary"
        variant="h4"
      >
        Error 404: The page or content you are looking for isn’t here
      </Typography>
      <Typography align="center" color="textPrimary" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <Box className="not-found-box">
        <img
          alt="Page or Content Not found"
          src={NotFoundImg}
          style={{
            marginTop: 50,
            display: "inline-block",
            maxWidth: "100%",
            width: 560,
          }}
        />
      </Box>
    </Container>
  </>
);

export default NotFound;
